// The map is created and preconfigured with a base map in ../ads/ads_wms.js which
// is included before this script

// Display GeoJSON loaded via a JSONP call to iShare

// Define the URL used to fetch features for a given area of interest
var url = 'http://national.astuntechnology.com/ishare/web//MapGetImage.aspx?callback=?&Type=jsonp&MapSource=National/AllMaps&RequestType=GeoJSON&ActiveTool=MultiInfo&ActiveLayer=&Layers=nhshospitals&mapid=-1&axuid=1387296513806&ServiceAction=GetMultiInfoFromShape&Shape=POLYGON%28%28150000%2010000%2C%20350000%2010000%2C%20350000%20150000%2C%20150000%20150000%2C%20150000%2010000%29%29';

jQuery.getJSON(url, {},
    function (data) {
        // Make a valid GeoJSON object with a crs
        var feats = prepGeoJson(data[0]);
        // Create a geoJson layer, associate a popup with each feature and add
        // the layer to the map
        var geojson = L.Proj.geoJson(feats, {
            onEachFeature: function (feature, layer) {
                // Use the html property added by iShare as the popup content
                layer.bindPopup(feature.properties.html);
            }
        }).addTo(map);
        // Zoom to the extent of all features
        map.fitBounds(geojson.getBounds());
    }
);

function prepGeoJson(feats) {
    // Add a crs so that Proj4Leaflet can identify the coordinate system of the
    // features
    feats.crs = {
        "properties": {
            "name": "urn:ogc:def:crs:EPSG::27700"
        }, 
        "type": "name"
    };
    // Correct the geometry which is assumed to be a point.
    for (var i = 0, feat; i < feats.features.length; i++) {
        feat = feats.features[i];
        feat.geometry.coordinates = feat.geometry.coordinates[0];
        feat.geometry.type = "Point";
    }
    return feats;
}
