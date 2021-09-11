import { GET_POKES, LOADING, GET_DETAILS, GET_POKE_BYNAME, GET_TYPES, CREATE_POKEMONS, FILTER_BY_TYPE, FILTER_BY_CREATED, ORDER_BY_NAME, ORDER_BY_ATTACK } from "../actions/actions";

const initialState = {
    pokemons : [],
    allPokemons: [],
    types: [],
    loading : false,
    pokemonsDetails: []
}

export default function rootReducers ( state = initialState, action) {
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading : true
            }
        case GET_POKES:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                loading: false
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        case CREATE_POKEMONS:
            return {
                ...state,
            }
        case GET_DETAILS:
            return {
                ...state,
                pokemonsDetails: action.payload,
                loading: false
            }
        case GET_POKE_BYNAME:
            return {
                ...state,
                pokemons: [action.payload],
                loading: false
            }
        case FILTER_BY_TYPE:
            const allPokes = state.allPokemons ;
            const filtroType = action.payload === "all" ? allPokes : allPokes.filter( p => p.tipo.includes(action.payload))
            return {
                ...state,
                pokemons: filtroType
            }
        case FILTER_BY_CREATED:
            const allPokes2 = state.allPokemons ;
            const filtroCreated = action.payload === "created" ? allPokes2.filter( p => p.creado) : allPokes2.filter( p=> !p.creado)
            return {
                ...state,
                pokemons: action.payload === "all" ? state.allPokemons : filtroCreated
            }
        case ORDER_BY_NAME:
                    let arrayOrdenado = action.payload === "Asc" ? state.pokemons.sort(function(a,b){
                        if(a.name > b.name) {
                            return 1
                        }
                        if(a.name < b.name) {
                            return - 1
                        }
                        return 0;
                    }) : state.pokemons.sort(function(a,b){
                        if (a.name < b.name){
                            return 1
                        }
                        if(a.name > b.name){
                            return -1
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        pokemons: arrayOrdenado
                    }
        case ORDER_BY_ATTACK:
                    let arrayOrdenadoAttack = action.payload === "Asc" ? state.pokemons.sort(function(a,b){
                        if(a.attack > b.attack) {
                            return 1
                        }
                        if(a.attack < b.attack) {
                            return - 1
                        }
                        return 0;
                    }) : state.pokemons.sort(function(a,b){
                        if (a.attack < b.attack){
                            return 1
                        }
                        if(a.attack > b.attack){
                            return -1
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        pokemons: arrayOrdenadoAttack
                    }
            default: return state      
    }
}