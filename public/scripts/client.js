/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

'use strict';

$(document).ready(() => {

 const createTweetElement = function(tweetObject){
    const $tweet = $(`<article>
    <div class="header">
      <div class="user-tweet">
        <img src="${tweetObject.user.avatars}"/>
        <span>${tweetObject.user.name}</span>
      </div>
      <span class="username-tweet">${tweetObject.user.handle}</span>
    </div>
    <p>${escape(tweetObject.content.text)}</p>
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

const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

const renderTweets = function(tweets){
    for(let tweet of tweets){
        let $tweet = createTweetElement(tweet);
        $('#tweets-container').prepend($tweet);
    }
}

function loadTweets(){
    $.ajax('/tweets', {method: 'GET', dataType: "json"})
    .then(result =>{
        renderTweets(result);
    })
}

loadTweets();

$("#tweet-form").submit( function (event) {
    event.preventDefault();
    let text = $("#tweet-text").val();
    if(text === "" || text === null){
        alert("Message is empty");
    } else if(text.length > 140){
        alert("Maximum of 140 chars");
    }else{
        $.ajax('/tweets', { method: 'POST', dataType: "json", data: {"text": text} })
        location.reload();
    }
  });


})
