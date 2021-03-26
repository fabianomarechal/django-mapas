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
        if(target.name === 'name'){
            let mapa = this.state.mapa;
            mapa.properties.name = target.value;
            this.setState({mapa: mapa})
        } else if (target.name === 'lat') {
            let mapa = this.state.mapa;
            mapa.properties.lat = target.value;
            this.setState({ mapa: mapa })
        } else if (target.name === 'lon') {
            let mapa = this.state.mapa;
            mapa.properties.lon = target.value;
            this.setState({ mapa: mapa });
        }
        e.preventDefault();
    }

    _onMapaChange(e){
        let mapa = { geom: e,
            properties: this.state.mapa.properties};
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