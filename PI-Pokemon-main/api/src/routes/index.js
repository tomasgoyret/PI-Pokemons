const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Tipo } = require("../db");
const { v4: uuidv4 } = require('uuid');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {

})

router.get('/pokemons', async (req, res, next) => { //acá va el caso en que agregue el nombre del pokemon como query
        let name = req.query.name
        if (name) {
            try{
                const pokeBD = await Pokemon.findOne({ where: { name: name } })
                if (pokeBD != null) {
                    const { name, hp, attack, defense, speed, weight, height, image, tipo } = pokeBD
                    const respuesta = {
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        weight,
                        height,
                        image,
                        tipo
                    }
                    return res.json(respuesta)
                } else {
                        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                        let respuesta = {
                            name: pokeApi.data.name,
                            hp: pokeApi.data.stats[0].base_stat,
                            attack: pokeApi.data.stats[1].base_stat,
                            defense: pokeApi.data.stats[2].base_stat,
                            speed: pokeApi.data.stats[5].base_stat,
                            weight: pokeApi.data.weight,
                            height: pokeApi.data.height,
                            image: pokeApi.data.sprites.front_default,
                            tipo: pokeApi.data.types.map(e => e.type.name),
                        }
                        return res.json(respuesta)
            }
            } catch (error) {
        next("Pokemon no encontrado, revisa el nombre que estàs buscando")
    }
}


    let pokesBD = await Pokemon.findAll()
    if (pokesBD) {
        pokesBD = pokesBD.map(p => {
            return {
                name: p.name,
                tipo: p.tipo,
                image: p.image
            }
        })
    }

    // // Opcion 1
    // // en este caso meter en un arreglo todas las promesas pendientesa, y luego pasar ese arreglo a un promiseAll para que las resuleva juntos.
    const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    let datosPokesApi = pokesApi.data.results
    let pokeData = []
    for (p of datosPokesApi) {
        let subReq = p.url
        let subReqPoke = await axios.get(`${subReq}`)
        pokeData.push({
            name: subReqPoke.data.name,
            tipo: subReqPoke.data.types.map(e => e.type.name),
            image: subReqPoke.data.sprites.front_default
        })

    }
    res.send(pokesBD.concat(pokeData))




    // Opcion 2

    // const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=2")
    // let datosPokesApi = pokesApi.data.results
    // let pokeData = 
    //     Promise.all (datosPokesApi.map( async (p)=> {
    //     let subReq = p.url
    //     let subReqPoke =  await axios.get(`${subReq}`)
    //     let resultado = { 
    //         name: subReqPoke.data.name,
    //         tipo:subReqPoke.data.types.map(e=>e.type.name),
    //         image:subReqPoke.data.sprites.front_default 
    //     }
    //     return await resultado  ;
    // })
    //     )

    // // res.send(pokesBD.concat(pokeData))
    // Promise.all([pokesBD,pokeData])
    //     .then((results => {
    //         let [pokesBDresults,datosPokesApiResults] = results;
    //         let resp = pokesBDresults.concat(datosPokesApiResults);
    //         res.json(resp)
    //     }))
    //     .catch ((error) => next(error))

})

router.get("/pokemons/:id", async (req, res, next) => {
    const { id } = req.params
    if (id.length > 4) {
        try {
            const pokeBD = await Pokemon.findOne({ where: { ID: id }, include: Tipo });
            const { name, hp, attack, defense, speed, weight, height, image, tipo } = pokeBD
            const respuesta = {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                image,
                tipo
            }
            return res.json(respuesta)
        } catch (error) {
            next(error)
        }
    } else {
        try {
            const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            let respuesta = {
                name: pokeApi.data.name,
                hp: pokeApi.data.stats[0].base_stat,
                attack: pokeApi.data.stats[1].base_stat,
                defense: pokeApi.data.stats[2].base_stat,
                speed: pokeApi.data.stats[5].base_stat,
                weight: pokeApi.data.weight,
                height: pokeApi.data.height,
                image: pokeApi.data.sprites.front_default,
                tipo: pokeApi.data.types.map(e => e.type.name),
            }
            return res.json(respuesta)
        } catch (error) {
            next(error)
        }
        // const pokeBD = await Pokemon.findOne({ where: { ID: id }, include: Tipo });
        // const { name, hp, attack, defense, speed, weight, height } = pokeBD
        // const respuesta = {
        //     name,
        //     hp,
        //     attack,
        //     defense,
        //     speed,
        //     weight,
        //     height
        // }
        // return res.json(respuesta)
    }
})


router.post("/pokemons", async (req, res, next) => {
    const { name, hp, attack, defense, speed, weight, height, tipo, image } = req.body
    try {
        const nuevoPoke = await Pokemon.create({
            ID: uuidv4(),
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            tipo,
            image
        })
        return res.send(nuevoPoke)
    } catch (error) {
        next(error)
    }
})

router.get("/types", async (req, res) => {
    const llenado = await Tipo.count()
    if (llenado === 0) {
        const tipos = await axios.get(`https://pokeapi.co/api/v2/type`)
        let tiposApi = tipos.data.results
        if (tiposApi) {
            tiposApi = tiposApi.map(t => {
                return {
                    name: t.name
                }
            })
        }
        await Tipo.bulkCreate(tiposApi)
        res.send(tiposApi.map(p => p.name))
        console.log("Primero instancia, copia en BD")
    } else {
        const tiposBD = await Tipo.findAll()
        let tiposBD2 = tiposBD.map((e) => {
            return e.name
        })
        res.send(tiposBD2)
        console.log("Segunda instancia,no Copia en BD")
    }
})
module.exports = router;
