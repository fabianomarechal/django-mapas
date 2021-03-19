
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
}), hum = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
});

var mymap = L.map('mapid', {
    center: [-22.91, -43.20],
    zoom: 13,
    layers: [osm, hum]
}).setView([-22.91, -43.20], 13);

var baseMaps = {
    "Tile": osm,
    'Humanitarian': hum
}

var camadas = L.layerGroup([]);

var overlayMaps = {
    'Camadas': camadas
}

L.control.layers(baseMaps, overlayMaps).addTo(mymap);