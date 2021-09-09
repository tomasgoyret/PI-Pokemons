import React from "react";

export function NewPoke() {



    return <div>
        <h1> Nuevo Pokemon</h1>

        <form className="nuevoPoke" action="http://localhost:3001/pokemons" method='post'>

            <label>Nombre</label>
            <input
                name="name"
                type="text"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>


            <label>Vida</label>
            <input
                name="hp"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>


            <label>Ataque</label>
            <input
                name="attack"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>


            <label>Defensa</label>
            <input
                name="defense"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>


            <label>Velocidad</label>
            <input
                name="speed"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>


            <label>Peso</label>
            <input
                name="weight"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>

            <label>Altura</label>
            <input
                name="height"
                type="number"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>
            <label>Tipo</label>
            <input
                name="type"
                type="checkbox"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>

            <label>Imagen</label>
            <input
                name="image"
                type="url"
                // value={input.name}
               //</form> onChange={handleChange}
               >
               </input>

        </form>
    </div>
}