import { PokeCard } from "./PokeCard";
import axios from "axios";
import { useEffect, useState } from "react";
import {Paginacion} from "./Paginacion";

export function Pokemons () {
    const [pokemons,setPokemons] = useState([])
    const [loading,setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPorPage] = useState(3)

    useEffect(()=>{
        const traerPokes = async () => {
            setLoading(true)
            const res = await axios.get("http://localhost:3001/pokemons")
            setPokemons(res.data)
            setLoading(false)
        }
        traerPokes();
    },[])

    

    //Obtener los pokemones actuales

    const indexUltPoke = currentPage * pokesPorPage;
    const indexPrimerPoke = indexUltPoke - pokesPorPage;
    const currentPoke = pokemons.slice(indexPrimerPoke,indexUltPoke);

    // Cambiar Página

    const pagina = (numeroPagina) => setCurrentPage(numeroPagina)

    return <div>
         <div>Buscador</div>
         <div>Filtros</div>
         <div>Boton para crear pokemopn</div>

         <PokeCard pokemons={currentPoke} loading={loading} />
         <Paginacion pokesPorPage={pokesPorPage} totalPokes={pokemons.length} pagina={pagina} />
        </div>
}