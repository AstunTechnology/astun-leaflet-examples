var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625]
    }),
    map = new L.Map('map', {
        crs: crs,
        continuousWorld: true,
        worldCopyJump: false
    });

L.tileLayer.wms('http://t0.ads.astuntechnology.com/astuntechnology/osopen/service', {
    layers: 'osopen',
    format: 'image/png',
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Astun Data Service &copy; Ordnance Survey.'
}).addTo(map);

map.setView([52.5, -1.8], 0);
