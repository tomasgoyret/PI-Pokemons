import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createPokemon } from "../store/actions/actions";
import { Link } from "react-router-dom";
import './styles.css/NewPoke.css'

function validate(newPoke) {
    let errors = {}
    if (!newPoke.name) {
        errors.name = "Se requiere un nombre"
    } else if (!newPoke.hp) {
        errors.hp = "Completar vida de Pokemon"
    } else if (!newPoke.attack) {
        errors.attack = "Completar ataque de Pokemon"
    } else if (!newPoke.defense) {
        errors.defense = "Completar defensa de Pokemon"
    } else if (!newPoke.speed) {
        errors.speed = "Completar velocidad de Pokemon"
    } else if (!newPoke.weight) {
        errors.weight = "Completar peso de Pokemon"
    } else if (!newPoke.height) {
        errors.height = "Completar altura de Pokemon"
    } else if (!newPoke.image) {
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

    const [errors, setErrors] = useState({})
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
    }

    const handleSelect = (e) => {
        if (!newPoke.tipo.includes(e.target.value) && newPoke.tipo.length < 4) {
            setNewPoke({
                ...newPoke,
                tipo: [...newPoke.tipo, e.target.value]
            })
            // setErrors(validate({
            //     ...newPoke,
            //     [e.target.name]: e.target.value
            // }))
        } else {
            alert('Este tipo de pokemon ya está incluído o llegaste al màximo de cuatro tipos por Pokemon')
        }
    }

    const handelDeleteType = (el) =>{
        setNewPoke({
            ...newPoke,
            tipo: newPoke.tipo.filter(t=> t !== el)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!Object.keys(errors).length && newPoke.tipo.length) {
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
        <h1 className='Titulo_NuevoPoke'> Nuevo Pokemon</h1>

        <form className="nuevoPoke" onSubmit={(e) => handleSubmit(e)} >
            <div className='item_form'>
                <label className='label_form'>Nombre</label>
                <input className='input_form'
                    name="name"
                    type="text"
                    value={name}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.name && (<p className='requerimiento'>{errors.name}</p>)}

            <div className='item_form'>
                <label className='label_form'>Vida</label>
                <input className='input_form'
                    name="hp"
                    type="number"
                    min="0"
                    value={hp}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.hp && (<p  className='requerimiento' >{errors.hp}</p>)}

            <div className='item_form'>
                <label className='label_form'>Ataque</label>
                <input className='input_form'
                    name="attack"
                    type="number"
                    min="0"
                    value={attack}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.attack && (<p className='requerimiento'>{errors.attack}</p>)}
            <div className='item_form'>
                <label className='label_form'>Defensa</label>
                <input className='input_form'
                    name="defense"
                    type="number"
                    min="0"
                    value={defense}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.defense && (<p className='requerimiento'>{errors.defense}</p>)}
            <div className='item_form'>
                <label className='label_form'>Velocidad</label>
                <input className='input_form'
                    name="speed"
                    type="number"
                    min="0"
                    value={speed}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.speed && (<p className='requerimiento'>{errors.speed}</p>)}
            <div className='item_form'>
                <label className='label_form'>Peso</label>
                <input className='input_form'
                    name="weight"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.weight && (<p className='requerimiento'>{errors.weight}</p>)}
            <div className='item_form'>
                <label className='label_form'>Altura</label>
                <input className='input_form'
                    name="height"
                    type="number"
                    min="0"
                    value={height}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.height && (<p className='requerimiento'>{errors.height}</p>)}
            <div className='item_form'>
                <label className='label_form'>Imagen</label>
                <input className='input_form'
                    name="image"
                    type="url"
                    value={image}
                    onChange={(event) => handleChange(event)}
                >
                </input>
            </div>
                {errors.image && (<p className='requerimiento'>{errors.image}</p>)}
            <div className='item_form'>
                <label className='label_form'>Tipo</label>
                <select  className='input_form' onChange={(e) => handleSelect(e)}>
                    {types.map(t => {
                        return <option key={t} value={t}>{t}</option>
                    })}
                </select>
            </div>

            <div className='item_form'>
            <label className='label_form'> Tipos: </label>
            <ul className='tipos_form'>  {newPoke.tipo.map(t => 
                <div key={t} className='tipos_form_item' > {t}
                    <button className='buttonX' type='button' onClick={()=>handelDeleteType(t)}>X</button>
                </div>
            
                )}
            </ul>

            </div>    

            <div className='item_form' >
                <button className='buttonStyle'>
                    <Link to="/pokemons/"> VOLVER</Link>
                </button>
                <button className='buttonStyle' type="submit"> + CREAR POKEMON</button>
            </div>
        </form>
    </div>
}