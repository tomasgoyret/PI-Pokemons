import React, { useState } from "react";
import { getPokeByName } from "../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

export function Search() {
    const [busqueda, setBusqueda] = useState("")
    const dispatch = useDispatch()
    const { pokemonSearched } = useSelector(state => state)
   const history = useHistory();


    const handleChange = (event) => {
        setBusqueda(event.target.value.toLowerCase())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch((getPokeByName(busqueda)))
        history.push(`/pokemons/${pokemonSearched.id}`)
    }



    return (
        <div className="Buscador">  
                <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Encontrá pokemons"
                    onChange={(e) => handleChange(e)}
                >
                </input>

                <button onClick={(e)=>handleSubmit(e)} type="submit">BUSCAR</button>
            <div>
                {pokemonSearched && <img src={`${pokemonSearched.image}`} alt="imagen"/>}

            </div>
        </div>)
}