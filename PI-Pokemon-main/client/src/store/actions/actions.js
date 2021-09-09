import axios from 'axios';
export const GET_POKES = 'GET_POKES';
export const LOADING =  'LOADING';
export const GET_DETAILS = 'GET_DETAILS';
export const ADD_POKEMON = 'ADD_POKEMON';
export const GET_POKE_BYNAME = 'GET_POKE_BYNAME';
export const GET_TYPES = 'GET_TYPES';

export function loading () {
    return {
        type: LOADING
    }
}

export function getPokemons() {
    return function(dispatch){
        dispatch(loading())
        return axios.get("http://localhost:3001/pokemons")
            .then((response)=>{
                dispatch({
                    type : GET_POKES,
                    payload: response.data
                });
            })
    }
}

export function getTypes() {
    return function(dispatch){
        return axios.get("http://localhost:3001/types")
            .then((response)=>{
                dispatch({
                    type : GET_TYPES,
                    payload: response.data
                });
            })
    }
}

export function getDetails(id){
    return function(dispatch){
        dispatch(loading())
        return axios.get(`http://localhost:3001/pokemons/${id}`)
            .then((response) =>{
                dispatch({
                    type: GET_DETAILS,
                    payload: response.data
                })
            })
    }
}

export function getPokeByName(name){
    return function(dispatch){
        dispatch(loading())
        return axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then((response) =>{
                dispatch({
                    type: GET_POKE_BYNAME,
                    payload:response.data
                })
            })
    }
}


