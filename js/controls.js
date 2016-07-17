jQuery(document).ready(function () {
  jQuery('.map-info-toggle').click(function () {
    jQuery('.map').css({"left": "-100%"}),
    jQuery('.map-info').css({"left": "0"})
  });
  jQuery('.map-list-toggle').click(function () {
    jQuery('.map').css({"left": "100%"}),
    jQuery('.map-list').css({"left": "0"})
	});
  jQuery('.map-toggle-info').click(function () {
    jQuery('.map').css({"left": "0"}),
    jQuery('.map-info').css({"left": "100%"})
	});
  jQuery('.map-toggle-list').click(function () {
    jQuery('.map').css({"left": "0"}),
    jQuery('.map-list').css({"left": "-100%"})
	});
});
