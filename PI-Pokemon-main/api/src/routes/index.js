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

    const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon")
    let datosPokesApi = pokesApi.data.results
   
    if (datosPokesApi) {
         datosPokesApi = await datosPokesApi.map(async (p) => {
            let subReq = p.url
            let subReqPoke = await axios.get(`${subReq}`)
            let resultado =  { 
                name: subReqPoke.data.name,
                tipo:subReqPoke.data.types.map(e=>e.type.name),
                image:subReqPoke.data.sprites.front_default 
            }
            
            return resultado
        })

    }
    console.log(datosPokesApi)
    res.send(pokesBD.concat(datosPokesApi))

    // Promise.all([pokesBD,datosPokesApi])
    //     .then((results => {
    //         let [pokesBDresults,datosPokesApiResults] = results;
    //         let resp = pokesBDresults.concat(datosPokesApiResults);
    //         res.json(resp)
    //     }))
    //     .catch ((error) => next(error))
})

router.get("/pokemons/:id", async (req, res) => {
    const { id } = req.params
    try {
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return res.json(pokeApi.data)
    } catch {
        const pokeBD = await Pokemon.findOne({ where: { ID: id }, include: Tipo });
        const { name, hp, attack, defense, speed, weight, height } = pokeBD
        const respuesta = {
            name,
            hp,
            attack,
            defense,
            speed,
            weight,
            height
        }
        return res.json(respuesta)
    }
})


router.post("/pokemons", async (req, res,next) => {
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
        res.send(tiposApi)
        console.log("Primero instancia, copia en BD")
    } else {
        const tiposBD = await Tipo.findAll()
        res.send(tiposBD.name)
        console.log("Segunda instancia,no Copia en BD")
    }
})
module.exports = router;
