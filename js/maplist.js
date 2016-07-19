$(document).ready(
    function(){
        $.getJSON(
            'https://app.orbitist.com/api/v1/list.json?mapid=' + mapid,
            function(data){
                // ciclo l'array
                for(i=0; i<data.length; i++){
                    var  listcontent  = '<p>' + data[i].list_title + '</p>';
                    $('div.map-list').append(listcontent);
                }
            }
        );
    }
);
