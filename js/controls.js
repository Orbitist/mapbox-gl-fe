jQuery(document).ready(function () {
  jQuery('.map-info-toggle').click(function () {
    jQuery('.map').css({"left": "-100%"}),
    jQuery('.map-info').css({"left": "0"}),
    jQuery('.map-toggle-info').css({"left": "10px"})
  });
  jQuery('.map-list-toggle').click(function () {
    jQuery('.map').css({"left": "100%"}),
    jQuery('.map-list').css({"left": "0"}),
    jQuery('.map-toggle-list').css({"right": "10px"})
	});
  jQuery('.map-toggle-info').click(function () {
    jQuery('.map').css({"left": "0"}),
    jQuery('.map-info').css({"left": "100%"}),
    jQuery('.map-toggle-info').css({"left": "calc(100% + 10px)"})
	});
  jQuery('.map-toggle-list').click(function () {
    jQuery('.map').css({"left": "0"}),
    jQuery('.map-list').css({"left": "-100%"}),
    jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"})
	});
});
