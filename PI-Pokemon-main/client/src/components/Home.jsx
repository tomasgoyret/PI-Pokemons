import './styles.css/Home.css';
import { useEffect } from "react";
import { PokeCard } from "./PokeCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import { useState } from "react";
import { Paginacion } from "./Paginacion";
import { filterByCreated, filterByType, getPokemons, getTypes, sortByAttack, sortByName } from "../store/actions/actions";


export function Pokemons() {

    const { pokemons, loading, types } = useSelector(state => state)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPorPage] = useState(3)
    //const[ordenado,setOrden] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])



    //Obtener los pokemones actuales

    const indexUltPoke = currentPage * pokesPorPage;
    const indexPrimerPoke = indexUltPoke - pokesPorPage;
    const currentPoke = pokemons.slice(indexPrimerPoke, indexUltPoke);

    // Cambiar Página

    const pagina = (numeroPagina) => setCurrentPage(numeroPagina)

    const handleOrderByName = (e) => {
        e.preventDefault()
        dispatch(sortByName(e.target.value))
        setCurrentPage(1)
        //setOrden(`Ordenado ${e.target.value}`)
    }
    const handleFilterbyType = (e) => {
        dispatch(filterByType(e.target.value))
    }
    const handleFilterbyCreated = (e) => {
        dispatch(filterByCreated(e.target.value))
    }
    const handleInicio = (e) =>{
        dispatch(getPokemons())
    }
    const handleOrderByAttack =(e) =>{
        dispatch(sortByAttack(e.target.value))
        setCurrentPage(1)
        //setOrden(`Ordenado ${e.target.value}`)
    }


    return <div className='Home_Container'>

        <div className="Top">
            <div className="BotonIzquierda">
            <button className="buttonStyle" onClick={(e)=>{handleInicio(e)}}>
                <Link to="/pokemons/"> Inicio</Link>
            </button>

            <button className='buttonStyle'>
                <Link to="/pokemons/new/Poke"> + Crear Pokemon</Link>
            </button>
            </div>

            <select className='input_form' onChange={(e) => handleFilterbyType(e)}>
                <option value="all">all</option>
                {types.map(t => {
                    return <option key={t} value={t}>{t}</option>
                })}
            </select>

            <select className='input_form' onChange={(e) => handleFilterbyCreated(e)}>
                <option value="all">all</option>
                <option value="created">creado</option>
                <option value="api">api</option>
            </select>
            <div>
                Orden por nombre : 
                 <select  className='input_form' onChange={(e)=>handleOrderByName(e)} >
                    <option value=""></option>
                    <option value="Asc">A-Z</option>
                    <option value="Desc">Z-A</option>
                </select>
            </div>
            <div>
                Orden por fuerza : 
                <select className='input_form' onChange={(e)=>handleOrderByAttack(e)}>
                    <option value=""></option>
                    <option value="Asc">Menos fuerte</option>
                    <option value="Desc">Más fuerte</option>
                </select>

            </div>
            <Search />
        </div>

        <PokeCard pokemons={currentPoke} loading={loading} />
        <Paginacion pokesPorPage={pokesPorPage} totalPokes={pokemons.length} pagina={pagina} />
    </div>
}