import React from "react";
import './styles.css/PokeCard.css'

export function PokeCard({pokemons, loading}){
    if(loading) {
        return <h2>Loading...</h2>
    }
    return <div className="PokeCard"> {pokemons.map((pokemon) => {
        return <div key={pokemon.id}>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt="imagen"/>
            <p>{pokemon.tipo.map((p)=> <li> {p} </li>)}</p>
            </div>
            
    })}
    </div>
}