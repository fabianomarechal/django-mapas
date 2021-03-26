import React, {Component} from 'react';

import MapaForm from './MapaForm';
import MapaService from './MapaService';

const mapaService = new MapaService();

class MapaCreateUpdate extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            mapa: { 
                properties : {
                    pk: null,
                    name: '',
                    lat: 0,
                    lon: 0
                },
                geometry: null
            }
        }
        this._onInputChange = this._onInputChange.bind(this);
        this._onMapaChange = this._onMapaChange.bind(this);
    }

    render()
    {
        return (
            <MapaForm mapa={this.state.mapa} onChange={this._onInputChange} onMapaChange={this._onMapaChange}/>
        );
    }

    _onInputChange(e) {
        const target = e.target;
        let mapa = this.state.mapa;
        if(target.name === 'name'){
            mapa.properties.name = target.value;
        } else if (target.name === 'lat') {
            mapa.properties.lat = target.value;
        } else if (target.name === 'lon') {
            mapa.properties.lon = target.value;
        }
        this.setState({mapa: mapa})
        e.preventDefault();
    }

    _onMapaChange(e){
        let properties = this.state.mapa.properties;
        let mapa = e;
        mapa.properties = properties;
        this.setState({ mapa: mapa });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            mapaService.getMapa(params.pk).then((c) => {
                this.setState({
                    mapa: c
                });
            });
        }
    }

}

export default MapaCreateUpdate;