import React from "react";
import { Link } from "react-router-dom";
import { Search } from "./Search";
import './styles.css/NavBar.css'


export function NavBar(){
    return <div className="NavBar">
        <button>
            <Link to="/pokemons/"> Inicio</Link>
        </button>
        <button>
            <Link to="/pokemons/new/Poke"> Crear Pokemon</Link>
        </button>
        <Search/>
        <button>Filtro según Tipo y Creado</button>
        <button>Ordenar alfabetico y fuerza</button>
    </div>
}