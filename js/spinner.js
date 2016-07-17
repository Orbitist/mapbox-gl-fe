$(document).ready(function() {
  $(this).find(".spinner").delay(2000).fadeOut(500, function () {
    $(this).remove();
  });
});
