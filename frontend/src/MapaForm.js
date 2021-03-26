import React, {Component} from 'react';
import MapaService from './MapaService';
import MapaRender from './MapaRender';

const mapaService = new MapaService();

export default class MapaForm extends Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = e.value;
        const name = target.name;
        this.setState({[name]: value})
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label>Nome</label>
                    <input className='form-control' name='name' type='text' ref={(el) => this.input = el} value={this.props.mapa.properties.name} onChange={this.props.onChange} />

                    <label>Latitude</label>
                    <input className='form-control' name='lat' type='number' ref={(el) => this.input = el} value={this.props.mapa.properties.lat} onChange={this.props.onChange}  />

                    <label>Longitude</label>
                    <input className='form-control' name='lon' type='number' ref={(el) => this.input = el} value={this.props.mapa.properties.lon} onChange={this.props.onChange}  />

                    <div className='mapa'>
                        <MapaRender {...this.props} />
                    </div>

                    <input type="submit" className="btn btn-primary" value="Enviar" />
                </div>
            </form>
        )
    }

    handleSubmit(event) {
        if (this.props.mapa.properties && (this.props.mapa.properties.pk)) {
            this.handleUpdate(this.props.mapa.properties.pk);
        }
        else {
            this.handleCreate();
        }
        event.preventDefault();
        window.location.href = '/';
    }

    handleCreate() {
        console.log('Tentativa de criar');
        mapaService.addMapa(
            this.props.mapa).then((result) => {
                alert('Mapa Criado!')
            }).catch(() => {
                alert('Ocorreu um erro! Confira as informações');
            });
    }

    handleUpdate(pk) {
        mapaService.updateMapa(this.props.mapa);
    }

}