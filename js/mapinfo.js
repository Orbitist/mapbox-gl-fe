$(document).ready(
    function(){
        $.getJSON(
            'https://app.orbitist.com/api/v1/map.json?mapid=' + mapid,
            function(data){
                // ciclo l'array
                for(i=0; i<data.length; i++){
                    var  content  = '<img src="';
                         content +=  data[i].map_image;
                         content  += '" class="img-responsive">';
                    	 	 content  += '<div class="map-info-body"><h3>';
                         content +=  data[i].map_title;
                         content  += '</h3>';
                         content +=  data[i].map_body;
                         content +=  '</div>';
                         cartodbkey =  data[i].map_cartodb;
                         basemapurl =  data[i].map_tiles;
                         mapMapboxAccessToken = data[i].map_mapbox_access_token;
                         custombasemapurl = data[i].map_custom_tiles;
                         customcss = data[i].map_css;
                         googleanalytics = data[i].map_google_analytics;
                    $('div.map-info').append(content);
                    $('head').append('<style>' + customcss + '</style>');
                    mapboxgl.accessToken = data[i].map_mapbox_access_token;
                    map.setStyle(data[i].map_mapbox_style);
                    //Google Analytics
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                    //If user submitted google analytics cods
                  	if ( googleanalytics.length > 5 ) {
                  		ga('create', googleanalytics, 'auto', {'name':'b'});
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
