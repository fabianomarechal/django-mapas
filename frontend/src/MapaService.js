import axios from 'axios';
const API_URL = 'http://localhost:8000';
axios.defaults.headers['Content-Type'] = 'application/json';

export default class MapaService {

    //Adicionar Mapa
    addMapa(mapa){
        const url = `${API_URL}/api/mapas/`;
        return axios.post(url, JSON.stringify(mapa)).then(res => res.data);
    }

    // Recuperar Lista de Mapas
    getMapas(){
        const url = `${API_URL}/api/mapas`;
        return axios.get(url).then(response => response.data);

    }

    // Recuperar mapa por ID
    getMapa(pk){
        const url = `${API_URL}/api/mapas/${pk}`;
        return axios.get(url).then(res=>res.data);
    }

    // Atualizar Mapa
    updateMapa(mapa){
        const url = `${API_URL}/api/mapas/${mapa.properties.pk}`;
        return axios.put(url, JSON.stringify(mapa)).then(res=>res.data);
    }

    //Excluir Mapa
    removeMapa(pk){
        const url = `${API_URL}/api/mapas/${pk.pk}`;
        return axios.delete(url).then(res=>res)
    }

}