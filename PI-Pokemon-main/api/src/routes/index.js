const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const { Pokemon , Tipo } = require("../models/");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/' , (req,res) =>{

})

router.get('/pokemons' , (req,res) =>{ //acá va el caso en que agregue el nombre del pokemon como query
    axios.get("https://pokeapi.co/api/v2/pokemon")
            .then((pokes) => {
                return res.send(pokes.data)
            })
})

router.get("/pokemons/:id", (req,res) => {
    const {id} = req.params
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((pokes) => {
                return res.send(pokes.data)
            })
    
} )

let pokemon=[]
router.post("/pokemons", (req,res) => {
    var nuevoPoke = {
        name: req.body.name,
        fuerza:req.body.fuerza
    }
    pokemon.push(nuevoPoke)
    res.json(nuevoPoke);
    
})

router.get("/types", (req,res)=>{
    axios.get(`https://pokeapi.co/api/v2/type`)
            .then((pokes) => {
                return res.send(pokes.data)
            })
})
module.exports = router;
