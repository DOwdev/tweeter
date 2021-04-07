/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

'use strict';

$(document).ready(() => {

    // Test / driver code (temporary). Eventually will get this from the server.
const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
    

 const createTweetElement = function(tweetObject){
    const $tweet = $(`<article>
    <div class="header">
      <div class="user-tweet">
        <img src="${tweetObject.user.avatars}"/>
        <span>${tweetObject.user.name}</span>
      </div>
      <span class="username-tweet">${tweetObject.user.handle}</span>
    </div>
    <p>${tweetObject.content.text}</p>
    <footer>
      <span>${new Date(tweetObject.created_at)}</span>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);

  return $tweet;
}

const renderTweets = function(tweets){
    for(let tweet of tweets){
        let $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet);
    }
}
//not finished
// $(".form-button").on('click', function () {
//     console.log('Button clicked, performing ajax call...');
//     $.ajax('more-posts.html', { method: 'GET' })
//     .then(function (morePostsHtml) {
//       console.log('Success: ', morePostsHtml);
//       $button.replaceWith(morePostsHtml);
//     });
//   });

renderTweets(data);

})
