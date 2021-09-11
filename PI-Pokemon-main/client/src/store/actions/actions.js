import axios from 'axios';
export const GET_POKES = 'GET_POKES';
export const LOADING =  'LOADING';
export const GET_DETAILS = 'GET_DETAILS';
export const ADD_POKEMON = 'ADD_POKEMON';
export const GET_POKE_BYNAME = 'GET_POKE_BYNAME';
export const GET_TYPES = 'GET_TYPES';
export const CREATE_POKEMONS = 'CREATE_POKEMONS';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';

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
        return axios.get(`http://localhost:3001/pokemons?name=${name}`)
            .then((response) =>{
                dispatch({
                    type: GET_POKE_BYNAME,
                    payload:response.data
                })
            })
    }
}

export function createPokemon(payload){
    return function(dispatch){
        return axios.post(`http://localhost:3001/pokemons`,payload)
            .then((response)=>{
                return response;
            })
}
}

export function filterByType(payload){
        return {
            type: FILTER_BY_TYPE,
            payload
        }
}

export function filterByCreated(payload){
        return {
            type: FILTER_BY_CREATED,
            payload
        }
}

export function sortByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function sortByAttack(payload){
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}


