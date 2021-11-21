/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//function to render tweets
const renderTweets = (tweets) => {
  $(".tweet-container").empty();
  tweets.forEach((element) => {
    let $newtweets = createTweetElement(element);
    return $(".tweet-container").prepend($newtweets);
  });
};

//function for generationg html
const createTweetElement = function (tweet) {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  return $(`<article class="tweet">
  
  <header>
            <div>
              <img
                src="${tweet.user.avatars}"
                style="
                  width: 50px;
                  height: 50px;
                  transform: translate(-5px, 20px);
                "
              />

              <h3>${tweet.user.name}</h3>
            </div>

            <h4>${tweet.user.handle}</h4>
          </header>
          <p>
            ${escape(tweet.content.text)}
          </p>
          <hr />
          <footer>
            <p>${timeago.format(tweet.created_at)}</p>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="fas fa-heart"></i>
            </div>
          </footer>
  </article>`);
};

//document ready
$(document).ready(function () {
  const loadtweets = function () {
    $.get(
      "/tweets",
      function (tweetsarr) {
        renderTweets(tweetsarr);
      },
      "json"
    );
  };
  loadtweets(); //loading the tweets on document load

  //on form submitt
  $("#posttweets").submit(function (event) {
    
   
    event.preventDefault();
    const $tweetinput = $("#tweet-text");
    if ($tweetinput.val() === "" || $tweetinput.val().length > 140) {
      //alert("Your tweet does not meet character length requirments");
      $(".error-message").attr("hidden", false);
    } else {
      $(".error-message").attr("hidden", true);
      $.post("/tweets", $("#posttweets").serialize(), function () {
        loadtweets();
      });
      $('#tweet-text').val("")
    }
  });
});
