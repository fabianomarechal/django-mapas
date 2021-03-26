import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';
import MapaList from './MapaList';
import MapaCreateUpdate from './MapaCreateUpdate';
import './App.css';

const BaseLayout = () => (
  <div className='container-fluid'>
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a href="#" className='navbar-brand'>Django React Mapas</a>
      <button type="button" className='navbar-toggler' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle Navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
        <a href="/" className='nav-item nav-link'>Listar Mapas</a>
        <a href="/mapas" className='nav-item nav-link'>Adicionar Mapa</a>
        </div>
      </div>
      </nav>  

      <div className='content'>
        <Route path='/' exact component={MapaList} />
      <Route path='/mapas/:pk' component={MapaCreateUpdate} />
      <Route path='/mapas/' exact component={MapaCreateUpdate} />
      </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;