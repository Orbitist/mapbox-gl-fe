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
    style: 'mapbox://styles/orbitist/ciqpdy5nc002cbhnfg4otij3w',
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
      "icon-image": "marker-15",
      "icon-size": 2.5,
      "icon-allow-overlap": true,
      "icon-offset": [0, -5],
      "text-field": "{point_title}",
      "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      "text-size": 12,
      "text-offset": [0, 0.5],
      "text-anchor": "top",
      "text-allow-overlap": true
    },
    "paint": {
      "icon-opacity": 0,
      "text-halo-width": 2,
      "text-halo-color": "white"
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
  var popup = new mapboxgl.Popup({anchor: 'none'})
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<a href="' + feature.properties.point_image + '" data-lightbox="' + feature.properties.point_id + '" data-title="' + feature.properties.point_image_caption + '"><img src="' + feature.properties.point_thumbnail + '" class="popup-top-image"></a>' + feature.properties.point_lightbox_images + '<div class="popup-body"><div class="popuptitle"><h3>' + feature.properties.point_title + '</h3></div>' + feature.properties.point_embeds + feature.properties.point_body + feature.properties.point_links + '<div class="action-items"><div class="action-item"><a href="https://www.google.com/maps/dir/Current+Location/' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '" target="_blank"><span class="fa fa-car center-block"></span></a></div><div class="action-item"><a href="https://app.orbitist.com/print/' + feature.properties.point_id + '" target="_blank"><span class="fa fa-print center-block"></span></a></div></div></div>')
      .addTo(map);

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

// Map Controls
map.addControl(new mapboxgl.Navigation({position: 'top-right'}));
map.addControl(new mapboxgl.Geolocate({position: 'top-right'}));
