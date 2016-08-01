// Set Url for map info API
var mapInfoApi = 'https://app.orbitist.com/api/v1/map.json?mapid=' + mapid;

// Do things if in edit mode
if (mode == 'edit'){
  var mapInfoApi = 'https://app.orbitist.com/api/v1/map_edit.json?mapid=' + mapid;
  $('div.map-info').append('<a target="_parent" href="https://app.orbitist.com/node/' + mapid + '/edit?destination=edit-map/' + mapid +'"><div class="edit-button"><i class="fa fa-pencil"></i> Edit</div></a>');
}

$(document).ready(
    function(){
        $.getJSON(
          mapInfoApi,
            function(data){
                // ciclo l'array
                for(i=0; i<data.length; i++){
                    var  content  = '<img src="';
                         content +=  data[i].map_image;
                         content  += '">';
                    	 	 content  += '<div class="map-info-body"><h3>';
                         content +=  data[i].map_title;
                         content  += '</h3><p>By <a href="https://app.orbitist.com/u/' + data[i].map_author_name + '" >';
                         content +=  data[i].map_author_full_name;
                         content +=  '</a></p>';
                         content +=  data[i].map_body;
                         content += '<a href="https://app.orbitist.com/u/' + data[i].map_author_name + '" ><div class="author-profile-link"><img src="' + data[i].map_author_profile_image + '" class="author-profile-image" />';
                         content += '<p><small>More maps by:</small><br />' + data[i].map_author_full_name + '</p></div>';
                         content +=  '<p><small><em>Make maps like this one at <a href="http://orbitist.com">ORBITIST.COM</a></em></small></p></div></a>';
                    $('div.map-info').append(content); // Add content to map-info pane
                    $('head').append('<style>' + data[i].map_css + '</style>'); // Add custom styles to map
                    if ( data[i].map_custom_mapbox_access_token.length > 5 ) {
                      mapboxgl.accessToken = data[i].map_custom_mapbox_access_token;
                      map.setStyle(data[i].map_custom_mapbox_style);
                    }
                    else {
                      mapboxgl.accessToken = data[i].map_mapbox_access_token;
                      map.setStyle(data[i].map_mapbox_style);
                    }
                    //Google Analytics
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                    //If user submitted google analytics cods
                  	if ( data[i].map_google_analytics.length > 5 ) {
                  		ga('create', data[i].map_google_analytics, 'auto', {'name':'b'});
                  		ga('create', 'UA-50308061-3', 'auto');
                  		ga('send', 'pageview');
                  		ga('b.send', 'pageview');
                  	}
                  	//Otherwise just load the Orbitist Tracking code
                  	else {
                  		ga('create', 'UA-50308061-3', 'auto');
                  		ga('send', 'pageview');
                  	}
                }
            }
        );
    }
);
