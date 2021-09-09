import { PokeCard } from "./PokeCard";
import {useSelector } from "react-redux";
// import axios from "axios";
import { useState } from "react";
//import { useEffect } from "react";
import {Paginacion} from "./Paginacion";
import { NavBar } from "./Navbar";
//import { getPokemons } from "../store/actions/actions";

export function Pokemons () {
    // const [pokemons,setPokemons] = useState([])
    // const [loading,setLoading] = useState(false)

    const {pokemons , loading} = useSelector(state => state)
    
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPorPage] = useState(3)

    // useEffect(()=>{
    //     const traerPokes = async () => {
    //         setLoading(true)
    //         const res = await axios.get("http://localhost:3001/pokemons")
    //         setPokemons(res.data)
    //         setLoading(false)
    //     }
    //     traerPokes();
    // },[])

    // const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(getPokemons())
    // },[])

    

    //Obtener los pokemones actuales

    const indexUltPoke = currentPage * pokesPorPage;
    const indexPrimerPoke = indexUltPoke - pokesPorPage;
    const currentPoke = pokemons.slice(indexPrimerPoke,indexUltPoke);

    // Cambiar Página

    const pagina = (numeroPagina) => setCurrentPage(numeroPagina)

    return <div>
        
        <PokeCard pokemons={currentPoke} loading={loading} />
        <Paginacion pokesPorPage={pokesPorPage} totalPokes={pokemons.length} pagina={pagina} />
        </div>
}