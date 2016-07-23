$(document).ready(
  function(){
    $.getJSON(
      'https://app.orbitist.com/api/v1/list.json?mapid=' + mapid,
      function(data){
        var mapReset = '<hr><div class="map-list-item" id="map-reset"><p><i class="fa fa-refresh" aria-hidden="true"></i> Reset Map</p></div><script>document.getElementById("map-reset").addEventListener("click", function () {map.fitBounds(bounds);});</script>';
        $('div.map-list').append(mapReset);
        // ciclo l'array
        for(i=0; i<data.length; i++){
          var  listItem  = '<hr><div class="map-list-item" id="' + data[i].list_point_id + '"><img src="' + data[i].list_image + '" /><p>' + data[i].list_title + '</p></div><script>document.getElementById("' + data[i].list_point_id + '").addEventListener("click", function () {map.flyTo({center: [' + data[i].list_longitude + ',' + data[i].list_latitude + '],zoom: 15,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
          $('div.map-list').append(listItem);
        }
      }
    );
  }
);
