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
            
         <h3>{pokemonsDetails.hp}</h3>
         </div>
}