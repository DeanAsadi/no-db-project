import React, { Component } from "react";
import axios from "axios";

class Pokemon extends Component {
  constructor() {
    super();

    this.state = {
      pokemons: [],
      val: "",
      edit: false
    };
  }

  componentDidMount() {
    // localhost:3001/api/pokemons
    axios.get("http://localhost:3001/api/pokemons").then(response => {
      this.setState({ pokemons: response.data });
    });
  }

  onChange = e => {
    this.setState({ val: e.target.value });
    // console.log(this.state.val);
  };

  onSubmit = e => {
    axios
      .post("http://localhost:3001/api/pokemons", { name: this.state.val })
      .then(response => {
        this.setState({ pokemons: response.data });
        // console.log(this.state.pokemons);
      });
  };

  updatePokemon = (id, name) => {
    console.log(name, id);
    this.setState({ edit: !this.state.edit });
    console.log(this.state.edit);
    if (this.state.edit) {
      axios
        .put(`http://localhost:3001/api/pokemons/${id}`, { name })
        .then(response => {
          this.setState({ pokemons: response.data, edit: false });
        });
    }
  };
  deletePokemon = id => {
    console.log(id);

    axios.delete(`http://localhost:3001/api/pokemons/${id}`).then(response => {
      this.setState({ pokemons: response.data });
    });
    console.log(id);
  };
  onChangeHandler = event => {
    this.setState({ newPokemon: event.target.value });
  };

  render() {
    const { pokemons } = this.state;

    const PokemonsDisplay = pokemons.map(pokemon => (
      <h2 className="h2" key={pokemon.id}>
        <button
          className="update"
          onClick={() => this.updatePokemon(pokemon.id, this.state.val)}
        >
          {" "}
          update{" "}
        </button>
        {/* {pokemon.name} */}
        {this.state.edit ? <input onChange={this.onChange} /> : pokemon.name}

        <button
          className="delete"
          onClick={() => this.deletePokemon(pokemon.id)}
        >
          Delete
        </button>
      </h2>
    ));
    // console.log(PokemonsDisplay);

    return (
      <div>
        {/* <button onClick={() => this.deletePokemon}> delete </button> */}
        <input
          className="inputSubmit"
          placeholder="Type here..."
          onChange={this.onChange}
        />

        <button className="submit" onClick={this.onSubmit}>
          Submit
        </button>
        {PokemonsDisplay}
      </div>
    );
  }
}

export default Pokemon;
