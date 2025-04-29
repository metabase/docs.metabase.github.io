(function() {
  function treatLearnStore(articles, store) {
    const treatedArticles = [];

    // Extracts and flattens individual pages from the articles object
    articles.categories.forEach((category) => {
      category.pages.forEach((categoryPage) => {
        categoryPage.pages.forEach((track) => {
          if (track.pages) {
            track.pages.forEach((trackPage) => {
              treatedArticles.push(trackPage);
            });
          } else {
            treatedArticles.push(track);
          }
        });
      });
    });

    for (const [key, value] of Object.entries(store)) {
      const treatedArticle = treatedArticles.find(
        (article) => article.url === value.url,
      );

      if (treatedArticle) {
        store[key] = {
          ...value,
          name: treatedArticle.name,
          summary: treatedArticle.summary,
          image: treatedArticle.image,
        };
      }
    }
    return store;
  }

  function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=");

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
      }
    }
  }

  const searchTerm = getQueryVariable("query");

  function highlight(text, searchTerm) {
    return text.replaceAll(
      new RegExp(searchTerm, "ig"),
      `<span class="highlight">${searchTerm}</span>`,
    );
  }

  function displaySearchResults(results, store, searchTerm) {
    const searchResults = document.getElementById("search-results");

    if (results.length) {
      let appendString = "";

      for (let i = 0; i < results.length; i++) {
        const item = store[results[i].ref];

        if (item.url.includes("docs/latest/api")) {
          item.source = "API";
        }

        // omit track landing pages from results
        if (item.name != "Index" && item.name != null) {
          const excerptEllipsis = item.source === "docs" ? "..." : "";

          appendString +=
            '<a href="' + item.url + '" class="learn__category__link">';
          appendString +=
            '<div class="search-result-source label-' +
            item.source +
            '">' +
            item.source +
            "</div>";
          appendString += "<h4>" + highlight(item.name, searchTerm) + "</h4>";
          appendString += `<p>${highlight(
            item.summary,
            searchTerm,
          )}${excerptEllipsis}</p>`;
          // appendString += addExcerpt(searchTerm, item.content, item.url);
          appendString += "</a>";
        }
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = "<li>No results found.</li>";
    }
  }

  function displayResultCount(results, searchTerm) {
    const searchCountContainer = document.getElementById("search-result-count");
    searchCountContainer.innerHTML =
      results.length + " results for <b>“" + searchTerm + "”</b>";
  }

  const treatedStore = treatLearnStore(window.learnArticles, window.learnStore);

  if (searchTerm) {
    document
      .getElementById("learn-search-box")
      .setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    const idx = lunr(function() {
      this.field("id", {
        boost: 10,
      });
      this.field("url", {
        boost: 7,
      });
      this.field("name", {
        boost: 5,
      });
      this.field("summary", {
        boost: 3,
      });
      this.field("content");

      for (const key in treatedStore) {
        this.add({
          id: key,
          url: treatedStore[key].url,
          name: treatedStore[key].name,
          summary: treatedStore[key].summary,
          content: treatedStore[key].content,
        });
      }

      for (const key in window.docsStore) {
        this.add({
          id: key,
          url: window.docsStore[key].url,
          name: window.docsStore[key].name,
          summary: window.docsStore[key].excerpt,
          content: window.docsStore[key].content,
        });
      }
    });

    const results = idx.search(searchTerm); // Get lunr to perform a search

    displaySearchResults(
      results,
      { ...treatedStore, ...window.docsStore },
      searchTerm,
    );
    displayResultCount(results, searchTerm);
  }
})();
