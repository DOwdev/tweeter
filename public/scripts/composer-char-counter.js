$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    let $counter = $(this).parent().find(".counter");
    let count = 140 - this.value.length;
    $counter.html(count);
    if (count > 0) {
      $counter.removeClass("red");
    } else {
      $counter.addClass("red");
    }
  });
});