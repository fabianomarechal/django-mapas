import React, {Component} from 'react';
import L from 'leaflet';
import {getPopupContent, addPoligono} from './MapUtils';

export default class MapaRender extends Component {

    constructor(props) {
        super(props);
        this.state = { drawnItems: new L.FeatureGroup(),}
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

    componentDidUpdate() {
        addPoligono(this.props.mapa, this.state.drawnItems);
    }

    componentDidMount(){
        var map = L.map('mapa', {zoomControl: false, crs: L.CRS.EPSG4326}).setView([0, 0], 0);

        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribuition: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
        }).addTo(map);

        var hum = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
            attribuition: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors',
        }).addTo(map);

        // Zoom Control
        var zoomControl = L.control.zoom({
            position: "topleft"
        });
        zoomControl.addTo(map);

        // Leaflet Draw
        var drawnItems = this.state.drawnItems;
        L.control.layers({ 'P&B': hum, 'OpenstreetMap': osm}, {'Poligonos': drawnItems}).addTo(map);
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
                marker: false,
                polyline: false,
                polygon: {
                    allowIntersection: false,
                    showArea: true
                },
            }
        });
        map.addControl(drawControl);

        // Adiciona os poligonos na camada
        addPoligono(this.props.mapa, drawnItems);
        
        map.on(L.Draw.Event.CREATED, (e)=>this._onCreate(e));
        map.on(L.Draw.Event.EDITED, (e) => this._onEdit(e));
        map.on(L.Draw.Event.DELETED, (e) => this._onDelete(e));
        this.props.onMapaChange(this.state.drawnItems.toGeoJSON());
    }
}