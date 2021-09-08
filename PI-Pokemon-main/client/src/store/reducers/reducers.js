import { GET_POKES } from "../actions/actions";

const initialState = {
    pokemons : []
}

export default function rootReducers ( state = initialState, action) {
    switch(action.type) {
        case GET_POKES:
            return {
                ...state,
                pokemons: action.payload
            }
            default: return state      
    }
}