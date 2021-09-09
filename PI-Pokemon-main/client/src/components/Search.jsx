import React, { useEffect, useState } from "react";
import { getPokeByName } from "../store/actions/actions";
import { useSelector, useDispatch } from "react-redux";

export function Search() {
    const [busqueda, setBusqueda] = useState("")
    const dispatch = useDispatch()


    const handleChange = (event) => {
        setBusqueda(event.target.value.toLowerCase())
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch((getPokeByName(busqueda)))
    }

    const { pokemonSearched } = useSelector(state => state)


    return (
        <div className="Buscador">
             <form onSubmit={(e)=>handleSubmit(e)} >   
                <input
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder="Encontrá pokemons"
                    onChange={(e) => handleChange(e)}
                >
                </input>

                <button type="submit">BUSCAR</button>
            </form>
            <div>
                {pokemonSearched && <img src={`${pokemonSearched.image}`} />}

            </div>
        </div>)
}