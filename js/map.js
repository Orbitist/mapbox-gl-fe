// Get points geojson data //
var orbitistPointsGeojson = (function () {
    var orbitistPointsGeojson = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'https://app.orbitist.com/api/v1/points/' + mapid + '.json',
        'dataType': "json",
        'success': function (data) {
            orbitistPointsGeojson = data;
        }
    });
    return orbitistPointsGeojson;
})();

// Get bounds from orbitistPointsGeojson //
var bounds = new mapboxgl.LngLatBounds();
orbitistPointsGeojson.features.forEach(function(feature) {
    bounds.extend(feature.geometry.coordinates);
});

// Authorize with Mapbox //
mapboxgl.accessToken = 'pk.eyJ1Ijoib3JiaXRpc3QiLCJhIjoiYnpUTnJBdyJ9.uxgaJ0R9ZNsCcEnPNfo2ag';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/orbitist/ciqtr8nwi0007cum5jw7y42my',
    pitch: 60
});

map.on('load', function() {
  map.addSource("orbitistPoints", {
    type: "geojson",
    data: orbitistPointsGeojson
  });
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": "orbitistPoints",
    "layout": {
      "icon-allow-overlap": true,
      "icon-offset": [0, -5],
      "text-field": "{point_title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-offset": [0, 0.5],
      "text-anchor": "top"
    }
  });
  map.fitBounds(bounds);
  // Add custom markers to map
  for (var i = 0; i < orbitistPointsGeojson.features.length; i++) {
      var feature = orbitistPointsGeojson.features[i];

      // create an img element for the marker
      var marker = document.createElement('img');
      marker.src = feature.properties.point_marker_url;
      marker.style.width = "30px";
      marker.style.height = "30px";

      // add marker to map
      new mapboxgl.Marker(marker)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
  }
});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });

  if (!features.length) {
      return;
  }

  var feature = features[0];

  // Populate the popup and set its coordinates
  // based on the feature found.
  var popup = new mapboxgl.Popup()
      .setLngLat(feature.geometry.coordinates)
      .setHTML(feature.properties.point_title)
      .addTo(map);

  // Use queryRenderedFeatures to get features at a click event's point
  // Use layer option to avoid getting results from other layers

  // if there are features within the given radius of the click event,
  // fly to the location of the click event
  if (features.length) {
      // Get coordinates from the symbol and center the map on those coordinates
      map.flyTo({center: features[0].geometry.coordinates});
  }
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});
