import React from "react";
import { Link } from "react-router-dom";

export default function RutaInicial(){
    return <div>
        <button className="Landing">
        <Link to="/pokemons"> Empezar la PokeAventura </Link>
        </button>
        </div>
}