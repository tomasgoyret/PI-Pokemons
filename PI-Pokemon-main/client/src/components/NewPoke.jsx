import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createPokemon } from "../store/actions/actions";
import { Link } from "react-router-dom";

export function NewPoke() {

    const [newPoke, setNewPoke] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        tipo: [],
        image: ""

    })
    const dispatch = useDispatch()
    const { types } = useSelector(state => state)
    const history = useHistory()
    const { name, hp, attack, defense, speed, weight, height, image } = newPoke

    const handleChange = (event) => {
        setNewPoke({
            ...newPoke,
            [event.target.name]: event.target.value.toLowerCase()
        })
    }

    const handleSelect = (e) => {
        setNewPoke({
            ...newPoke,
            tipo: [...newPoke.tipo, e.target.value]
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createPokemon(newPoke))
        alert("Pokemon creado")
        setNewPoke({
            name: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            weight: "",
            height: "",
            tipo: [],
            image: ""

        })
        history.push("/pokemons")
    }

    // arm<ar el handle change con esta 
    // hanbdle submit con prevent Default
    // onSubmit={(e)=> handleSubmit(e)}

    return <div>
        <h1> Nuevo Pokemon</h1>

        <button>
            <Link to="/pokemons/"> Inicio</Link>
        </button>

        <form className="nuevoPoke" onSubmit={(e) => handleSubmit(e)} >
            <div>
                <label>Nombre</label>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>

            <div>
                <label>Vida</label>
                <input
                    name="hp"
                    type="number"
                    min="0"
                    value={hp}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>

            <div>
                <label>Ataque</label>
                <input
                    name="attack"
                    type="number"
                    value={attack}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Defensa</label>
                <input
                    name="defense"
                    type="number"
                    value={defense}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Velocidad</label>
                <input
                    name="speed"
                    type="number"
                    value={speed}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Peso</label>
                <input
                    name="weight"
                    type="number"
                    value={weight}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Altura</label>
                <input
                    name="height"
                    type="number"
                    value={height}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Imagen</label>
                <input
                    name="image"
                    type="url"
                    value={image}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
            <div>
                <label>Tipo</label>
                <select onChange={(e) => handleSelect(e)}>
                    {types.map(t => {
                        return <option value={t}>{t}</option>
                    })}
                </select>
                <ul> Tipos asignados : {newPoke.tipo.map(t => t + " , ")}</ul>

            </div>
            <button type="submit">CREAR POKEMON</button>

        </form>
    </div>
}