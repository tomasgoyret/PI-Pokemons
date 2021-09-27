const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Tipo } = require("../db");
const { v4: uuidv4 } = require('uuid');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/pokemons', async (req, res, next) => {
    //Primero reviso si me envian el nombre por query
    let name = req.query.name
    if (name) {
        try {
            const pokeBD = await Pokemon.findOne({ where: { name: name }, include : Tipo })
            if (pokeBD != null) {
                const { id, name, hp, attack, defense, speed, weight, height, image } = pokeBD
                const respuesta = {
                    id,
                    name,
                    hp,
                    attack,
                    defense,
                    speed,
                    weight,
                    height,
                    image,
                    tipo: pokeBD.dataValues.tipos.map((p)=>p.dataValues.name),
                }
                return res.status(200).json(respuesta)
            } else {
                try {
                    const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    let respuesta = {
                        id: pokeApi.data.id,
                        name: pokeApi.data.name,
                        hp: pokeApi.data.stats[0].base_stat,
                        attack: pokeApi.data.stats[1].base_stat,
                        defense: pokeApi.data.stats[2].base_stat,
                        speed: pokeApi.data.stats[5].base_stat,
                        weight: pokeApi.data.weight,
                        height: pokeApi.data.height,
                        image: pokeApi.data.sprites.other.dream_world.front_default,
                        tipo: pokeApi.data.types.map(e => e.type.name),
                    }
                    return res.status(200).json(respuesta)
                } catch (error) {
                     next(res.json({message:" Pokemon no encontrado"}))
                }
            }
        } catch (error) {
            next(error)
        }
    }
    //si no envian nada por quiery traigo todos los Pokemons
    try {
        let pokesBD = await Pokemon.findAll( {include :Tipo }
        )
        if (pokesBD) {
            pokesBD = pokesBD.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    tipo: p.dataValues.tipos.map((p)=>p.dataValues.name),
                    image: p.image,
                    creado: p.creadoByMe,
                    attack: p.attack
                }
            })
        }
        // Opcion 1
        const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
        let datosPokesApi = pokesApi.data.results
        let pokeData = []
        for (p of datosPokesApi) {
            let subReq = p.url
            let subReqPoke = await axios.get(`${subReq}`)
            pokeData.push({
                id:subReqPoke.data.id,
                name: subReqPoke.data.name,
                tipo: subReqPoke.data.types.map(e => e.type.name),
                image: subReqPoke.data.sprites.other.dream_world.front_default,
                attack: subReqPoke.data.stats[1].base_stat,
            })
        }
        res.status(200).send(pokesBD.concat(pokeData))
        // // Opcion 2
        // const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
        // let datosPokesApi = pokesApi.data.results
        // let pokeData = datosPokesApi.map(p => p.url)
        // let arregloFunciones = pokeData.map(url => {
        //     return function () {
        //         return axios.get(url)
        //     }
        // })

        // let result = await Promise.all(arregloFunciones.map(fn => fn()))
        // let response = result.map(p => {
        //     return {
        //          id:p.data.id
        //         name: p.data.name,
        //         tipo: p.data.types.map(e => e.type.name),
        //         image: p.data.sprites.other.dream_world.front_default
                    // attack: p.data.stats[1].base_stat,
        //     }
        // })
        // res.send(pokesBD.concat(response))
    } catch (error) {
        next("Api no responde")
    }

})

router.get("/pokemons/:id", async (req, res, next) => {
    const { id } = req.params
    if (id.length > 4) {
        try {
            const pokeBD = await Pokemon.findOne({ where: { id: id }, include: Tipo });
            console.log(pokeBD)
            const { name, hp, attack, defense, speed, weight, height, image } = pokeBD
            const respuesta = {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                image,
                tipo:pokeBD.dataValues.tipos.map((p)=>p.dataValues.name),
            }
            return res.json(respuesta)
        } catch (error) {
            next("El id es incorrecto")
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
                image: pokeApi.data.sprites.other.dream_world.front_default,
                tipo: pokeApi.data.types.map(e => e.type.name),
            }
            return res.json(respuesta)
        } catch (error) {
            next("El id es incorrecto")
        }
    }
})


router.post("/pokemons", async (req, res, next) => {
    const { name, hp, attack, defense, speed, weight, height, tipo, image } = req.body
    

    try {
        const nuevoPoke = await Pokemon.create({
            id: uuidv4(),
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height,
            image
        })

        await nuevoPoke.addTipo(tipo)
        return res.send(nuevoPoke)
    } catch (error) {
        next(error)
    }
})

router.get("/types", async (req, res, next) => {
    try{
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
    } catch (error) {
        next(error)
    }
})
module.exports = router;
