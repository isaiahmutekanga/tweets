$(document).ready(function () {
  // --- our code goes here ---
  var counter = 140;

  $("#tweet-text").keyup(function () {
    counter--;
    var text = $(this);
    var counterarea = text.parent().find("output");
    counterarea.text(140 - text.val().length);
    if (text.val().length > 140) {
      counterarea.css("color", "red");
    } else {
      counterarea.css("color", "");
    }
  });
});
