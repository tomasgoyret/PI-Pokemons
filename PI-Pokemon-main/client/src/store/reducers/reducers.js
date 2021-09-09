import { GET_POKES, LOADING, GET_DETAILS, GET_POKE_BYNAME } from "../actions/actions";

const initialState = {
    pokemons : [],
    loading : false,
    pokemonsDetails: [],
    pokemonSearched:{}
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
                loading: false
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
                pokemonSearched: action.payload,
                loading: false
            }
            default: return state      
    }
}