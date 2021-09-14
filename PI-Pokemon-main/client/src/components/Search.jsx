import React, { useState } from "react";
import { getPokeByName } from "../store/actions/actions";
import { useDispatch } from "react-redux";

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



    return (
        <div className="Buscador">  
                <input className='input_form'
                    autoComplete="off"
                    type="text"
                    name="name"
                    placeholder=" Encontrá pokemons "
                    onChange={(e) => handleChange(e)}
                >
                </input>

                <button className='buttonStyle' onClick={(e)=>handleSubmit(e)} type="submit">BUSCAR</button>
            {/* <div>
                {pokemonSearched && <img src={`${pokemonSearched.image}`} alt="imagen"/>}

            </div> */}
        </div>)
}