const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

const pokemon = {
  
    name: "prueba",
    hp: "56",
    attack: null,
    defense: "45",
    speed: "234",
    weight: "45",
    height: "342",
    tipo:["normal","flying"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"

}

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('debe tener un atributo llamado Creado por mi seteado en true', ()=>{
        Pokemon.create(pokemon)
          .then( el => {
            expect(el.creadoByMe).to.eql(true)
          })
      })
      it('puede funcionar si no se le pasa attack' ,()=>{
        Pokemon.create(pokemon)
      })
    });
  });
});
