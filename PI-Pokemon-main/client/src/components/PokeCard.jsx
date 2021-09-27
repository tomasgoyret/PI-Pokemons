import React from "react";
import { Link } from "react-router-dom";
import './styles.css/PokeCard.css'
import Pikachu from './styles.css/media/ohNoPikachu.png'
import Gif from './styles.css/media/EXfY.gif';

export function PokeCard({ loading, pokemons }) {
    if (loading) {
        return <h2 className='loading'><img src={Gif} alt='cargando'></img> </h2>
    }
    console.log(pokemons)
    if(!pokemons.length){
        return <h2 className='mensajeErr'> <img className="pikachuDet" src={Pikachu} alt="ohno!" />   No hay resultados </h2>
    }
    if(pokemons[0].message){
        return <h2 className='mensajeErr'><img className="pikachuDet" src={Pikachu} alt="ohno!" />  {pokemons[0].message}</h2>
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
                <p className='tipos_pokeCard'>Tipos: {pokemon.tipo.map((p) => <li key={p}> {p} </li>)}</p>
                <p className='attack'>Attack : {pokemon.attack}</p>
            </div>
        } 
        )}
    </div>
}