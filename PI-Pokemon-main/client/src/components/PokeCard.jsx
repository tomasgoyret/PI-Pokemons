import React from "react";
import { Link } from "react-router-dom";
import './styles.css/PokeCard.css'

export function PokeCard({loading,pokemons}){
    if(loading) {
        return <h2>Loading... </h2>
    }
   
    return <div className="PokeCard">
 {pokemons && pokemons.map((pokemon) => {
        return <div key={pokemon.id}>
            <p>
                <Link to={`/pokemons/${pokemon.id}`}>
                {pokemon.name} el id : {pokemon.id}
                </Link>
                </p>
            <img src={pokemon.image} alt="imagen"/>
            <p>{pokemon.tipo.map((p)=> <li> {p} </li>)}</p>
            </div> }
            
    )}
    </div>
}