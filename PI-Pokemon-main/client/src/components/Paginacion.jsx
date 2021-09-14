import React from "react";
import './styles.css/Paginacion.css'

export function Paginacion({pokesPorPage, totalPokes, pagina}) {
    const numerosPag = [];
    if(totalPokes<=3){
        return <div></div>
    } else {
        for(let i=1; i <= Math.ceil( totalPokes / pokesPorPage ) ; i++){
            numerosPag.push(i)
        }
        return <nav className='Paginacion_Container'>
            <ul className="Paginacion">
                 {numerosPag.map((number) =>{
                     return <button key={number} className="itemPaginacion" onClick={()=> pagina(number)}> {number} </button>
                 })}   
            </ul>
        </nav>
    }
    }
