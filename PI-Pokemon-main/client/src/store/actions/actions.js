import axios from 'axios';
export const GET_POKES = 'GET_POKES';

export function getPokemons() {
    return function(dispatch){
        return axios.get("http://localhost:3001/pokemons")
            .then((response)=>{
                dispatch({
                    type : GET_POKES,
                    payload: response.data
                });
            })
    }
}
