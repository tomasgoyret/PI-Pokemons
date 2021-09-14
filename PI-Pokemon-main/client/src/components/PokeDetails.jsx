import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../store/actions/actions";

export function PokeDetails({id}){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetails(id))
    },[dispatch,id])
    const {pokemonsDetails,loading} = useSelector(state => state)
    
    if(loading) {
        return <h2>Loading...</h2>
    }

    return <div>
         <h1>{pokemonsDetails.name}</h1>
         <h2> <img src={pokemonsDetails.image} alt="imagen" /></h2>
         <h3>{pokemonsDetails.tipo && pokemonsDetails.tipo.map((p)=> {
            return (<p key={pokemonsDetails.id}> {p} </p>)} ) }
        </h3>
            
         <h4>Vida : {pokemonsDetails.hp}</h4>
         <h4>Attaque : {pokemonsDetails.attack}</h4>
         <h4>Defensa : {pokemonsDetails.defense}</h4>
         <h4>Velocidad : {pokemonsDetails.speed}</h4>
         <h4>Altura : {pokemonsDetails.height}</h4>
         <h4>Peso : {pokemonsDetails.weight}</h4>
         </div>
}