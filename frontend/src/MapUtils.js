import L from 'leaflet';

// Truncate value based on number of decimals
var _round = function (num, len) {
    return Math.round(num * (Math.pow(10, len))) / (Math.pow(10, len));
};
// Helper method to format LatLng object (x.xxxxxx, y.yyyyyy)
var strLatLng = function (latlng) {
    return "(" + _round(latlng.lat, 6) + ", " + _round(latlng.lng, 6) + ")";
};

// Generate popup content based on layer type
// - Returns HTML string, or null if unknown object
export const getPopupContent = function (layer) {
    // Marker - add lat/long
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        return strLatLng(layer.getLatLng());
        // Circle - lat/long, radius
    } else if (layer instanceof L.Circle) {
        var center = layer.getLatLng(),
            radius = layer.getRadius();
        return "Center: " + strLatLng(center) + "<br />"
            + "Radius: " + _round(radius, 2) + " m";
        // Rectangle/Polygon - area
    } else if (layer instanceof L.Polygon) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            area = L.GeometryUtil.geodesicArea(latlngs);
        return "Area: " + L.GeometryUtil.readableArea(area, true);
        // Polyline - distance
    } else if (layer instanceof L.Polyline) {
        var latlngs = layer._defaultShape ? layer._defaultShape() : layer.getLatLngs(),
            distance = 0;
        if (latlngs.length < 2) {
            return "Distance: N/A";
        } else {
            for (var i = 0; i < latlngs.length - 1; i++) {
                distance += latlngs[i].distanceTo(latlngs[i + 1]);
            }
            if (_round(distance, 2) > 1000) {
                return "Distance: " + _round(distance, 2) / 1000 + " km"; // kilometers
            } else {
                return "Distance: " + _round(distance, 2) + " m"; // meters
            }
        }
    }
    return null;
};


// Funcão que recebe FeatureCollection  e layer para montar os poligonos na camada
export const addPoligono = (mapa, layer) => {
    // Would benefit from https://github.com/Leaflet/Leaflet/issues/4461
    // Função que separa as camadas do Grupo geoJSON para tornar editaveis
    function addNonGroupLayers(sourceLayer, targetGroup) {
        if (sourceLayer instanceof L.LayerGroup) {
            sourceLayer.eachLayer(function (layer) {
                addNonGroupLayers(layer, targetGroup);
            });
        } else {
            sourceLayer.bindPopup(getPopupContent(sourceLayer));
            targetGroup.addLayer(sourceLayer);
        }
    }

    if (mapa.geometry && mapa.geometry.geometries) {
        addNonGroupLayers(L.geoJSON(mapa), layer); // adicionando Layers não agrupadas na camada
    }
}