import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createPokemon } from "../store/actions/actions";
import { Link } from "react-router-dom";

function validate(newPoke){
    let errors = {}
    if(!newPoke.name){
        errors.name = "Se requiere un nombre"
    } else if (!newPoke.hp){
        errors.hp = "Completar vida de Pokemon"
    } else if (!newPoke.attack){
        errors.attack = "Completar ataque de Pokemon"
    } else if (!newPoke.defense){
        errors.defense = "Completar defensa de Pokemon"
    } else if (!newPoke.speed){
        errors.speed = "Completar velocidad de Pokemon"
    } else if (!newPoke.weight){
        errors.weight = "Completar peso de Pokemon"
    } else if (!newPoke.height){
        errors.height = "Completar altura de Pokemon"
    } else if (!newPoke.image){
        errors.image = "Completar con una url de la imagen del Pokemons"
    }
    return errors
}

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

    const [errors,setErrors] = useState({})
    const dispatch = useDispatch()
    const { types } = useSelector(state => state)
    const history = useHistory()
    const { name, hp, attack, defense, speed, weight, height, image } = newPoke

    const handleChange = (event) => {
        setNewPoke({
            ...newPoke,
            [event.target.name]: event.target.value.toLowerCase()
        })
        setErrors(validate({
            ...newPoke,
            [event.target.name]: event.target.value
        }))
        console.log(newPoke)
    }

    const handleSelect = (e) => {
        if(!newPoke.tipo.includes(e.target.value)){
            setNewPoke({
                ...newPoke,
                tipo: [...newPoke.tipo, e.target.value]
            })
            // setErrors(validate({
            //     ...newPoke,
            //     [e.target.name]: e.target.value
            // }))
        } else {
            alert('Este tipo de pokemon ya está incluído')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(!Object.keys(errors).length && newPoke.tipo.length){
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
        } else {
            alert("Por favor completa todos los campos")
        }
    }

    // arm<ar el handle change con esta 
    // hanbdle submit con prevent Default
    // onSubmit={(e)=> handleSubmit(e)}

    return <div className='NewPokePage'>
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
                {errors.name && (<p>{errors.name}</p>)}
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
                {errors.hp && (<p>{errors.hp}</p>)}
            </div>

            <div>
                <label>Ataque</label>
                <input
                    name="attack"
                    type="number"
                    min="0"
                    value={attack}
                    onChange={(event) => handleChange(event)}
                >
                </input>
                {errors.attack && (<p>{errors.attack}</p>)}
            </div>
            <div>
                <label>Defensa</label>
                <input
                    name="defense"
                    type="number"
                    min="0"
                    value={defense}
                    onChange={(event) => handleChange(event)}
                >
                </input>
                {errors.defense && (<p>{errors.defense}</p>)}
            </div>
            <div>
                <label>Velocidad</label>
                <input
                    name="speed"
                    type="number"
                    min="0"
                    value={speed}
                    onChange={(event) => handleChange(event)}
                >
                </input>
                {errors.speed && (<p>{errors.speed}</p>)}
            </div>
            <div>
                <label>Peso</label>
                <input
                    name="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(event) => handleChange(event)}
                >
                </input>
                {errors.weight && (<p>{errors.weight}</p>)}
            </div>
            <div>
                <label>Altura</label>
                <input
                    name="height"
                    type="number"
                    min="0"
                    value={height}
                    onChange={(event) => handleChange(event)}
                >
                </input>
                {errors.height && (<p>{errors.height}</p>)}
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
                {errors.image && (<p>{errors.image}</p>)}
            </div>
            <div>
                <label>Tipo</label>
                <select onChange={(e) => handleSelect(e)}>
                    {types.map(t => {
                        return <option value={t}>{t}</option>
                    })}
                </select>
                <ul> Tipos asignados : {newPoke.tipo.map(t => t + " , ")}</ul>
                {/* {errors.tipo && (<p>{errors.tipo}</p>)} */}

            </div>
            {/* {errors.message && (<p className='error'> {errors.message} </p>)} */}
            <button type="submit"> + CREAR POKEMON</button>

        </form>
    </div>
}