import React from "react";

export function Paginacion({pokesPorPage, totalPokes, pagina}) {
    const numerosPag = [];

    for(let i=1; i <= Math.ceil( totalPokes / pokesPorPage ) ; i++){
        numerosPag.push(i)
    }
    return <nav>
        <ul className="Paginacion">
             {numerosPag.map((number) =>{
                 return <li key={number} className="itemPaginacion"> 
                    <button onClick={()=> pagina(number)}> {number} </button>
                 </li>
             })}   
        </ul>
    </nav>
}