(function() {

  contentLoaded(window, function() {
    var blockQuoteClass = '.quote-me'
    var quotes = document.querySelectorAll(blockQuoteClass)

    function createQuote(quoteDOMElement) {
      var parent = quoteDOMElement.parentNode
      var clonedQuote = quoteDOMElement.cloneNode(true)

      clonedQuote.classList.add('pull-quote')

      parent.style.position = 'relative'
      parent.appendChild(clonedQuote)
      var quoteText = quoteDOMElement.innerHTML

      clonedQuote.appendChild(
        createTweetLinkFromQuote(quoteText)
      )

      parent.removeChild(quoteDOMElement);
    }

    function createTweetLinkFromQuote(quote) {

      var short_tail = ' @metabase';
      var short_tail_length = short_tail.length;
      
      var medium_tail = ' ' + window.location;
      var medium_tail_length = 24; // due to how twitter shortens lengths
      
      var full_tail = short_tail + ' ' + medium_tail;
      var full_tail_length = short_tail_length  + 1 + medium_tail_length;

      var link = document.createElement('a')
      link.innerHTML = 'Tweet'
      link.target = '_blank'
      link.href = 'http://twitter.com/home/?status=' + quote
      
      // Add link to the current blog post or at least our twitter handle
      if (140 - quote.length >= full_tail_length ){
        link.href = link.href + full_tail;
      } else if(140 - quote.length >= medium_tail_length){
        link.href = link.href + medium_tail;
      } else if(140 - quote.length >= short_tail_length){
        link.href = link.href + short_tail;
      }
      link.classList.add('tweet-link')

      return link
    }

    Array.prototype.slice.call(quotes).forEach(function(q) {
      createQuote(q)
    })

  })

})()
