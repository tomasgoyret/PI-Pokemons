import React from "react";
import { Link } from "react-router-dom";
import './styles.css/Landing.css';
import PokeLogo from './styles.css/media/logoPoke.png'

export default function RutaInicial(){
    return <div className='LandingDiv'>
        <img className='LogoLanding' src={PokeLogo} alt="Noanda" />
        <button className="LandingButton">
        <Link to="/pokemons"> Empezar la PokeAventura </Link>
        </button>
        </div>
}