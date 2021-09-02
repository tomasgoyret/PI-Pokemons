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

router.get('/pokemons', async (req, res,next) => { //acá va el caso en que agregue el nombre del pokemon como query
    const pokesBD = await Pokemon.findAll()
    const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon")
        res.send(pokesBD.concat(pokesApi.data.results))
})

router.get("/pokemons/:id", (req, res) => {
    const { id } = req.params
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((pokes) => {
            return res.send(pokes.data)
        })

})


router.post("/pokemons", async (req, res) => {
    const {name,hp,attack,defense,speed,weight,height} = req.body
    try {
        const nuevoPoke = await Pokemon.create({
                ID: uuidv4(),
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height
        })
        res.send(nuevoPoke) 
    } catch (error){
        res.send(error)
    }
})

router.get("/types", async (req, res) => {
    const llenado = await Tipo.count()
    if(llenado === 0) {
        const tipos = await axios.get(`https://pokeapi.co/api/v2/type`)
        let tiposApi = tipos.data.results
        if(tiposApi) {
            tiposApi = tiposApi.map( t=> {
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
