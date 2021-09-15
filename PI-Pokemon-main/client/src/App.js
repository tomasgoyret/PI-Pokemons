import './App.css';
//import React, {useEffect} from 'react';
import RutaInicial from './components/LandingPage.jsx';
import {Pokemons} from './components/Home.jsx';
import {BrowserRouter , Route} from 'react-router-dom';
//import {useDispatch } from 'react-redux';
//import {getPokemons, getTypes} from './store/actions/actions';
import {PokeDetails} from './components/PokeDetails.jsx';
import { NewPoke } from './components/NewPoke';

// const dispatch = useDispatch();
// useEffect(()=>{
//   dispatch(getPokemons())
//   dispatch(getTypes())
// },[dispatch])
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={RutaInicial}></Route>
        <Route exact path="/pokemons" component={Pokemons}></Route>
        <Route exact path="/pokemons/new/Poke"  component={NewPoke} /> 
        <Route exact path="/pokemons/:id"  render={({match}) => <PokeDetails id={match.params.id} /> } ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
