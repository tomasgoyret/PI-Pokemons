import React from "react";
import { Link } from "react-router-dom";
import './styles.css/PokeCard.css'

export function PokeCard({ loading, pokemons }) {
    if (loading) {
        return <h2>Loading... </h2>
    }
    if(pokemons[0].message){
        return <h2>{pokemons[0].message}</h2>
    }
    return <div className="PokeCard">
        {pokemons && pokemons.map((pokemon) => {
            return <div className='PokeCard_Item' key={pokemon.id}>
                <p className="titulo_pokeCard">
                    <Link to={`/pokemons/${pokemon.id}`}>
                        {pokemon.name}
                    </Link>
                </p>
                <img className='imgPokeCard' src={pokemon.image} alt="imagen" />
                <p>Tipos: {pokemon.tipo.map((p) => <p key={p}> {p} </p>)}</p>
                <p className='attack'>Attack : {pokemon.attack}</p>
            </div>
        } 
        )}
    </div>
}