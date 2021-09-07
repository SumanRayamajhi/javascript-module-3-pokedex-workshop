import { getAllPokemons, getOnePokemonSprite, getOnePokemon } from "./api.js";

const root = document.getElementById("root");
const headerEl = document.createElement("h1");
headerEl.textContent = "Pokedex";
headerEl.className = "header";
root.appendChild(headerEl);

const divContainer = document.createElement("div");
divContainer.className = "divContainer";
root.appendChild(divContainer);

async function createPokemon(name, url) {
  const newPokemonDiv = document.createElement("div");
  newPokemonDiv.className = "pokemonDiv";
  const pokemonName = document.createElement("div");
  pokemonName.className = "pokemonName";
  pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  newPokemonDiv.appendChild(pokemonName);
  divContainer.appendChild(newPokemonDiv);
  const response = await fetch(url);
  const json = await response.json();
  // console.log(json);
  const imgEl = document.createElement("img");
  imgEl.src = json.sprites.front_default;
  newPokemonDiv.appendChild(imgEl);

  return newPokemonDiv;
}
//async function create

async function searchPokemon(event) {
  if (event.code === "Enter") {
    const term = event.target.value;
    const url = `https://pokeapi.co/api/v2/pokemon/ ${term}`;

    divContainer.innerHTML = "";
    createPokemon(term, url).then((newPokemon) =>
      newPokemonDiv.appendChild(newPokemon)
    );
    getOnePokemon(term).then((pokemon) => console.log(pokemon));
    //createPokemon(term, url).then((newPokemon) => root.appendChild(newPokemon));
  }
}

function createSearchField() {
  const searchField = document.createElement("input");
  searchField.className = "search-bar";
  searchField.type = "text";
  searchField.placeholder = "Search";
  searchField.addEventListener("keyup", searchPokemon);

  return searchField;
}

async function init() {
  //const root = document.getElementById("root");
  root.prepend(createSearchField());
  const pokemon = await getAllPokemons();
  pokemon.forEach(async ({ name, url }) => {
    await createPokemon(name, url);
  });
}

init();
