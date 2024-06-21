import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    const [pokemonList, setPokemonList] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    
    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'; 

    useEffect(() => {
      async function downloadPokemons() {
          const response = await axios.get(POKEDEX_URL);
          const pokemonResults = response.data.results;
          const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
          const pokemonData = await axios.all(pokemonResultPromise);
          const pokeListResult = pokemonData.map((pokeData) => {
              const pokemon = pokeData.data;
              return {
                  id: pokemon.id,
                  name: pokemon.name,
                  image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                  types: pokemon.types
              };
          });
          setPokemonList(pokeListResult);
          setIsLoading(false);
      }
      downloadPokemons();
  }, []);

  return (
    <div className="pokemon-list-wrapper">
       <div>List of Pokemon</div>
        {(isloading) ? 'Loading... ': 
        pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} ></Pokemon>)}
    </div>
  )
}
export default PokemonList;