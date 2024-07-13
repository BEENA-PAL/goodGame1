import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "./search.svg";
import "./index.css";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const allPokemonResults = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonData = await axios.get(pokemon.url);
          return pokemonData.data;
        })
      );
      setAllPokemons(allPokemonResults);
      setPokemons(allPokemonResults.slice(0));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPokemons(filteredPokemons.slice(0));
  }, [searchQuery, allPokemons]);

  return (
    <div className="App container mx-auto p-4">
      <div className="sticky top-0 bg-pink-100 z-10 py-4 rounded-md shadow-md flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center my-4 text-pink-900">
          Pokémon Search
        </h1>

        <div className="search">
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={() => {}}></img>
        </div>
      </div>
      <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {pokemons.length === 0 ? (
          <>Loading</>
        ) : (
          pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card bg-pink-100 rounded-lg shadow-md p-4"
            >
              <img
                className="w-full h-48 object-cover mb-4 rounded-md"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <h3 className=" font-bold text-center text-3xl text-pink-900">
                {pokemon.name}
              </h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
