import React, {Component} from 'react';
import markerIcon from 'leaflet-draw/dist/images/marker-icon.png';
import L from 'leaflet';
import {getPopupContent, addPoligono} from './MapUtils';

export default class MapaRender extends Component {

    constructor(props) {
        super(props);
        this.state = { drawnItems: new L.FeatureGroup()}
    }

    render() {
        return (
            <div id='mapa' className='mapa' />
        )
    }
    _onCreate = (e) => {
        const {layer, } = e;
        var content = getPopupContent(layer);

        if (content !== null) {
            layer.bindPopup(content);
        }

        // Add info to feature properties
        var feature = layer.feature = layer.feature || {};
        feature.type = feature.type || "Feature";
        var props = feature.properties = feature.properties || {}; // Intialize feature.properties
        props.info = content;
        var drawnItems = this.state.drawnItems;
        drawnItems.addLayer(layer);
        this.props.onMapaChange(drawnItems.toGeoJSON());
        console.log(drawnItems.toGeoJSON());
    }

    _onEdit = (e) => {
        const {layers,} = e;
        var content = null;
        layers.eachLayer(function (layer) {
            content = getPopupContent(layer);
            if (content !== null) {
                layer.setPopupContent(content);
            }
        });
        this.props.onMapaChange(this.state.drawnItems.toGeoJSON());
    }

    _onDelete = (e) => {
        this.props.onMapaChange(this.state.drawnItems.toGeoJSON());
    }

    MyCustomMarker = L.Icon.extend({
        options: {
            shadowUrl: null,
            iconAnchor: new L.Point(12, 12),
            iconSize: new L.Point(24, 24),
            iconUrl: markerIcon
        }
    });

    componentDidUpdate() {
        addPoligono(this.props.mapa, this.state.drawnItems);
    }

    componentDidMount(){
        var map = L.map('mapa', {zoomControl: false, crs: L.CRS.EPSG4326}).setView([0, 0], 1);

        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribuition: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
        }).addTo(map);

        // Zoom Control
        var zoomControl = L.control.zoom({
            position: "topleft"
        });
        zoomControl.addTo(map);

        // Leaflet Draw
        var drawnItems = this.state.drawnItems;
        L.control.layers({ 'OpenstreetMap': osm}, {'Poligonos': drawnItems}).addTo(map);
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                poly: {
                    allowIntersection: false
                }
            },
            draw: {
                circle: false,
                circlemarker: false,
                polygon: {
                    allowIntersection: false,
                    showArea: true
                },
                marker: {
                    icon: new this.MyCustomMarker()
                }
            }
        });
        map.addControl(drawControl);

        // Adiciona os poligonos na camada
        console.log(3);
        addPoligono(this.props.mapa, drawnItems);
        

        map.on(L.Draw.Event.CREATED, (e)=>this._onCreate(e));

        map.on(L.Draw.Event.EDITED, (e) => this._onEdit(e));
        map.on(L.Draw.Event.DELETED, (e) => this._onDelete(e));

        // Botão para exportar a camada desenhada para o banco de dados
        var exportJson = function(){
            console.log('exportar 1');
            let nodata = '{"type":"FeatureCollection","features":[]}';
            let jsonData = (JSON.stringify(drawnItems.toGeoJSON()));
            let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData);
            let datenow = new Date();
            let datenowstr = datenow.toLocaleDateString('en-GB');
            let exportFileDefaultName = 'export_draw_' + datenowstr + '.geojson';
            let linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            if (jsonData === nodata) {
                alert('No features are drawn');
            } else {
                linkElement.click();
            }
        }
        var showExportButton = new L.Control({ position: "topright" });
        showExportButton.onAdd = function (map) {
            this._div = L.DomUtil.create('div');
            L.DomEvent.on(this._div, 'click', exportJson);
            this._div.innerHTML = '<button title="Export to GeoJSON File" type="button" class="btn btn-danger btn-sm text-light"><i class="fa fa-file-code-o" aria-hidden="true"></i> Export</button>';
            return this._div;
        };
        showExportButton.addTo(map);
    }
}