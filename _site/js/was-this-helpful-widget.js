/**
 * This script handles the feedback widget for /learn.
 */
(function() {
  if (!document.getElementById("was-this-helpful-widget")) {
    return;
  }

  // Tracks what we'll post to the endpoint
  // The widget will additionally the ID from the server, and comments (if any).
  const feedbackState = {
    article_url: window.location.href,
    article_title: document.title,
    article_section: "",
  };

  const ENDPOINT = `https://store-api.metabase.com/api/v1/crm/learn-feedback`;

  const upVoteMessage = "What did you find especially helpful?";
  const downVoteMessage = "How can we improve this article?";

  /**
   * Not all paths are equal
   * @param {string} pathName
   * @returns {string} pathName with the correct file extension
   * @example /docs/latest/ -> /docs/latest/index.md
   */
  function updatePath(pathName) {
    if (pathName.endsWith("/")) {
      return pathName + "index.md";
    } else if (pathName === "") {
      return pathName + "README.md";
    } else {
      return pathName + ".md";
    }
  }

  /**
   * We need to link to the GitHub page for the article so that people can propose changes.
   * @param {string} pathName
   * @returns {string} URL to the GitHub page for the article
   */
  function getGitHubURL(pathName) {
    const regex = /^\/docs\/(?:latest|v\d+\.\d+)\/(.*)/;
    const newPath = pathName.replace(regex, "$1");
    const host = "https://github.com/metabase/metabase/blob/master/docs/";
    return host + updatePath(newPath);
  }

  /**
   * @param {string} gitHubURL
   * @returns HTML with a link to the GitHub page for the article
   */
  function upVoteFooter(gitHubURL) {
    return `<span class="paragraph-6 fs-13 neutral-60">Want to improve these docs? <a href='${gitHubURL}' target="_blank">Propose a change.</a></span>`;
  }

  /**
   *
   * @param {string} gitHubURL
   * @returns HTML with a link to the GitHub page for the article
   */
  function downVoteFooter(gitHubURL) {
    return `<span class="paragraph-6 fs-13 neutral-60">Need some help? <a href="/help/">We're right here.</a> Want to improve these docs? <a href='${gitHubURL}' target="_blank">Propose a change.</a></span>`;
  }
  /**
   * Endpoint expects a string for the section.
   * @param {String} info
   * @param {String} alternative
   * @returns
   */
  function cleanInfo(info, alternative) {
    if (info) {
      return info;
    } else {
      return alternative || "Unknown";
    }
  }

  function getSectionLearn(url) {
    const section = url
      .split("/learn/")
      .pop()
      .split("/")
      .shift();

    return cleanInfo(section, "Learn");
  }
  /**
   * Parse string to return version and section info for a docs page.
   * @param {String} url - the page URL to parse
   * @returns {Object} array of strings with version and section info
   */
  function getDocInfo(url) {
    const info = url
      .split("/docs/")
      .pop()
      .split("/");

    return cleanInfo(info, "Docs");
  }

  function getSectionStartupGuide(url) {
    const info = url
      .split("/startup-guide/")
      .pop()
      .split("/")
      .shift();

    return cleanInfo(info, "Startup Guide");
  }

  /**
   * Gets page section. If the page is in /docs/, grab the version as well.
   */
  function getPageSection() {
    const url = window.location.href;

    if (url.includes("/docs/")) {
      const docInfo = getDocInfo(url);
      feedbackState.article_section = docInfo[1];
    } else if (url.includes("/learn/")) {
      feedbackState.article_section = getSectionLearn(url);
    } else if (url.includes("/glossary/")) {
      feedbackState.article_section = "glossary";
    } else if (url.includes("/startup-guide/")) {
      feedbackState.article_section = getSectionStartupGuide(url);
    }
  }

  /**
   * Sends feedback, both for votes and comments, and returns a promise.
   * @param {Object} feedback - the feedback to send
   * @returns {Object} the endpoint's response
   */
  async function postFeedback(feedback) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });
    return response.json();
  }

  /**
   * Unhides the comment form, and displays the appropriate message.
   * @param {String} elementId - comment form's ID
   * @param {String} message - The message to display to prompt for comments
   */
  function showCommentForm(elementId, message, footerInnerHTML) {
    getPageSection();
    const commentForm = document.getElementById(elementId);
    document.getElementById("page-feedback-question").innerText = message;
    commentForm.classList.remove("hide");
    document.getElementById("feedback-comment-text").focus();
    if (window.location.pathname.includes("/docs/")) {
      const $footer = document.getElementById("page-feedback-footer");

      if ($footer) {
        $footer.innerHTML = footerInnerHTML;
      }
    }
  }

  /**
   * Returns a function that processes the vote, hiding the vote UI and displaying the comment form.
   * handleVote additionally stores the ID from the server to associate the vote with the comment,
   * in case the person submits the comment.
   * @param {Boolean} isHelpful - the vote
   * @returns {Function} a handler for up or down vote
   */
  function handleVote(isHelpful) {
    const gitHubURL = getGitHubURL(window.location.pathname);
    return function(ev) {
      ev.preventDefault();

      if (isHelpful) {
        voteUp.classList.add("active");
        voteDown.classList.remove("active");
      } else {
        voteUp.classList.remove("active");
        voteDown.classList.add("active");
      }

      // Show comment form.
      const message = isHelpful ? upVoteMessage : downVoteMessage;
      const footer = isHelpful
        ? upVoteFooter(gitHubURL)
        : downVoteFooter(gitHubURL);
      showCommentForm("page-comment", message, footer);

      if (window.resizeLearnRightSidebar) {
        window.resizeLearnRightSidebar();
      }

      // Set and post the vote and other metadata in feedbackState
      feedbackState.helpful = isHelpful;
      postFeedback(feedbackState)
        // Capture the id from the server.
        .then(({ feedback_id }) => {
          feedbackState.id = feedback_id;
        })
        .catch((err) => {
          console.error(`handleVote failed`, err);
        });
    };
  }

  /**
   * Checks comment input for text. If valid, it submits the comment.
   * Otherwise it alerts the person.
   * @param {String} comment - text in comment (maxlength: 500)
   */
  function validateComment(comment) {
    if (comment.length > 0 && comment.length <= 500) {
      submitComment(comment);
    } else if (comment.length > 500) {
      alert("Comments cannot exceed 500 characters.");
    } else {
      alert("Please add a comment before hitting the Send button.");
    }
  }

  /**
   * Posts the comment to the API, and catches any errors, hides the comment UI,
   * and displays gratitude.
   * @param {String} comment - the person's feedback
   */
  function submitComment(comment) {
    // Hide the comment section
    document.getElementById("page-comment").classList.add("hide");
    // Show gratitude
    document.getElementById("page-feedback-message").classList.remove("hide");

    feedbackState.comments = comment;
    postFeedback(feedbackState).catch((err) => {
      console.error("submitComment failed.", err);
    });

    if (window.resizeLearnRightSidebar) {
      window.resizeLearnRightSidebar();
    }
  }

  /**
   * Handles comment submission when person hits the Send button.
   * @param {Oject} ev - Send button click event.
   */
  function handleComment(ev) {
    ev.preventDefault();
    const commentForm = document.getElementById("feedback-comment-text");
    const comment = commentForm.value.trim();
    validateComment(comment);
  }

  /**
   * Attach click event listeners.
   */
  const handleVoteUp = handleVote(true);
  const voteUp = document.getElementById("page-feedback-vote-up");
  const handleVoteDown = handleVote(false);
  const voteDown = document.getElementById("page-feedback-vote-down");

  voteDown.onclick = handleVoteDown;
  voteUp.onclick = handleVoteUp;

  const commentSubmit = document.getElementById("page-comment-submit");
  commentSubmit.onclick = handleComment;
})();
