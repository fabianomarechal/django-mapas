import axios from 'axios';
const API_URL = 'http://localhost:8000';
axios.defaults.headers['Content-Type'] = 'application/json';

export default class MapaService {

    //Adicionar Mapa
    addMapa(mapa){
        const url = `${API_URL}/api/mapas/`;
        return axios.post(url, JSON.stringify(mapa)).then(res => console.log('Resultado:', res.data));
    }

    // Recuperar Mapas do Usuario
    getMapas(){
        const url = `${API_URL}/api/mapas`;
        return axios.get(url).then(response => response.data);

    }

    getMapa(pk){
        const url = `${API_URL}/api/mapas/${pk}`;
        return axios.get(url).then(res=>res.data);
    }

    // Atualizar Mapa
    updateMapa(mapa){
        console.log('Update Mapa');
        // console.log(mapa);
        const url = `${API_URL}/api/mapas/${mapa.properties.pk}`;
        return axios.put(url, JSON.stringify(mapa)).then(res=>res.data);
    }

    //Excluir Mapa
    removeMapa(pk){
        const url = `${API_URL}/api/mapas/${pk.pk}`;
        return axios.delete(url).then(res=>res)
    }

}