const axios = require("axios");

let pokemons = [];
let id = 0;

axios.get("http://pokeapi.co/api/v2/pokemon").then(response => {
  const arr = response.data.results;
  // console.log(arr);
  const objectsWithIds = arr.map(obj => {
    obj.id = id;
    id++;
    return obj;
  });
  pokemons = objectsWithIds;
});

const getPokemons = (req, res, next) => {
  res.status(200).send(pokemons);
  console.log(pokemons);
};

const deletePokemons = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  let indexOfPokemon = pokemons.findIndex(pokemon => pokemon.id == id);
  pokemons.splice(indexOfPokemon, 1);
  res.status(200).send(pokemons);
};

const createPokemons = (req, res, next) => {
  const { name } = req.body;
  let newPokemon = {
    name,
    id
  };
  id++;
  pokemons.push(newPokemon);
  res.status(200).send(pokemons);
  console.log(pokemons);
};

const updatePokemons = (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  let indexOfPokemon = pokemons.findIndex(pokemon => pokemon.id == id);
  pokemons[indexOfPokemon].name = name;

  res.status(200).send(pokemons);
};

module.exports = {
  getPokemons,
  createPokemons,
  deletePokemons,
  updatePokemons
};
