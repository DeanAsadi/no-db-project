const express = require("express");
const { json } = require("body-parser");
var cors = require("cors");

const pokemonsCtrl = require("./controllers/pokemonsCtrl");

const app = express();
app.use(cors("*"));

app.use(json());

app.get("/api/pokemons", pokemonsCtrl.getPokemons);
// app.get("/api/pokemons/filter", pokemonsCtrl.getFilteredPokemons);
app.post("/api/pokemons", pokemonsCtrl.createPokemons);
app.delete("/api/pokemons/:id", pokemonsCtrl.deletePokemons);
app.put("/api/pokemons/:id", pokemonsCtrl.updatePokemons);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
