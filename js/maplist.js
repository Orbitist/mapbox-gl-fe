$(document).ready(
    function(){
        $.getJSON(
            'https://app.orbitist.com/api/v1/list.json?mapid=' + mapid,
            function(data){
                // ciclo l'array
                for(i=0; i<data.length; i++){
                    var  listcontent  = '<p id="' + data[i].list_point_id + '">' + data[i].list_title + '</p><script>document.getElementById("' + data[i].list_point_id + '").addEventListener("click", function () {map.flyTo({center: [' + data[i].list_longitude + ',' + data[i].list_latitude + '],zoom: 15,bearing: 360 * Math.random(),pitch: 60});});</script>';
                    $('div.map-list').append(listcontent);
                }
            }
        );
    }
);
