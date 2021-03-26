import React, { Component } from 'react';
import {MapContainer, TileLayer, LayersControl, GeoJSON, FeatureGroup} from 'react-leaflet';
import EditControl from  './EditControl';
import MapaService from './MapaService';
import {CRS} from 'leaflet';

const mapaService = new MapaService();

class MapaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapas: [],
            nextPageUrl: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        var self = this;
        mapaService.getMapas().then(function(result){
            console.log(result.data);
           
            self.setState({ mapas: result.data.features, nextPageUrl: result.nextlink})
        });
        console.log(this.state.mapas);
    }

    handleDelete(e, pk) {
        var self = this;
        mapaService.removeMapa({pk: pk}).then(()=>{
            console.log(self.state.mapas);
            // var newArr = self.state.mapas.filter(function(obj){
            //     console.log('aas ', obj.properties.pk, ' === ', pk);
            //     return obj.properties.pk !== pk;
            // });
            // self.setState({mapas: newArr});
            self.componentDidMount();
        });
    }

    nextPage(){
        var self = this;
        mapaService.getMapas(this.state.nextPageUrl).then(result=>{
            self.setState({mapas: result.data, nextPageUrl: result.nextlink})
        });
    }

    render() {
        let hasMap;
        if (this.state.mapas.length) {
        hasMap = this.state.mapas.map(c =>
                <tr key={c.properties.pk}>
                    <td>{c.properties.pk}</td>
                    <td>{c.properties.name}</td>
                    <td>{c.properties.lat}</td>
                    <td>{c.properties.lon}</td>
                    
                    <td>
                        <button onClick={(e) => this.handleDelete(e, c.properties.pk)}>Remover</button>
                        <a href={'/mapas/' + c.properties.pk}>Atualizar</a>
                    </td>
                </tr>);
        } else {
            hasMap = <tr></tr>;
        }
        
        return (
            <div className='mapa--list'>
                <table className='table'>
                    <thead className='thead'>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Geom</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasMap}
                    </tbody>
                </table>
                <button className='btn btn-primary' onClick={this.nextPage}>Próxima</button>
            </div>
        )
    }
}

export default MapaList;