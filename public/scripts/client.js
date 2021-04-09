/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

'use strict';

$(document).ready(() => {

  const createTweetElement = function(tweetObject) {
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
  };

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  function loadTweets() {
    $.ajax('/tweets', {method: 'GET', dataType: "json"})
      .then(result =>{
        renderTweets(result);
      });
  }

  loadTweets();

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    let text = $("#tweet-text").val();
    if (text === "" || text === null) {
      let error = "Tweet Cannot be Empty";
      $(".error-container").empty().prepend(errorMessage(error)).hide();
      if ($(".error-container").is(":hidden")) {
        $(".error-container").slideDown("slow");
      }
    } else if (text.length > 140) {
      let error = "Tweet Exceeded Max Number of Characters";
      $(".error-container").empty().prepend(errorMessage(error)).hide();
      if ($(".error-container").is(":hidden")) {
        $(".error-container").slideDown("slow");
      }
    } else {
      $(".error-container").hide();
      $.ajax('/tweets', { method: 'POST', dataType: "json", data: {"text": text} });
      location.reload();
    }
  });

  $('.btn-compose-tweet').click(function() {
    let $section = $('section.new-tweet');

    if ($section.is(':visible')) {
      $section.slideUp('fast');
    } else {
      $section.slideDown('fast');
      $section.find('textarea').focus();
    }
  });

  $(window).scroll(function() {
    $('.nav-right').hide();
    $('.fixed-button').show();
    if ($(window).scrollTop() < 120) {
      $('.nav-right').show();
      $('.fixed-button').hide();
    }
  });

  $('.fixed-button').click(function() {
    $(window).scrollTop(0);
  });

});

const errorMessage = function(error) {
  const $error = $(`
    <div class="error">
      <div class="error-logo">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Error:</h3>
    </div>
    <p>${error}</p>
    </div>
  `);
  return $error;
};
