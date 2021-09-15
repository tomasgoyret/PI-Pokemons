/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  // beforeEach(() => Pokemon.sync({ force: true })
  //   .then(() => Pokemon.create(pokemon)));
  // });
});

// describe('GET /pokemons', () => {
//   it('should get 200', () => agent.get('/pokemons').expect(200))
// });


describe(' GET /types', () => {
  it('debe retornar status 200', () => agent.get('/types').expect(200))
})

describe(' GET /pokemons', () => {
  it('debe retornar un Pokemon cuando se envía el nombre por query', () => {
    agent.get(`/pokemons?name=${pokemon.name}`)
      .expect(res => {
        expect(res.body).to.eql({
          id: 25,
          name: pikachu,
          hp: 35,
          attack: 55,
          defense: 40,
          speed: 90,
          weight: 60,
          height: 4,
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
          tipo: [
            "electric"
          ]
        })
      })
  })
  it('debe retornar Pokemon no encontrado cuando el nombre pasado por query no es exacto', () => {
    agent.get('/pokemons?name=pikachuu')
      .expect(res => {
        expect(res.body).to.eql({
          message: "Pokemon no encontrado"
        })
      })
  })

})

describe('GET /pokemons/:id', () => {
  it('debe devolver un Pokemon cuando un ID es enviado por params', () => {
    agent.get('/pokemons/25')
      .expect(res => {
        expect(res.body).to.eql({
          name: "pikachu",
          hp: 35,
          attack: 55,
          defense: 40,
          speed: 90,
          weight: 60,
          height: 4,
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
          tipo: [
            "electric"
          ]
        })
      })
  })
})


