import { getAllPokemons, getOnePokemonSprite, getOnePokemon } from "./api.js";

async function createPokemonImage(url) {
  const pokemonImage = document.createElement("img");
  pokemonImage.src = await getOnePokemonSprite(url);
  return pokemonImage;
}

function createPokemonLink(name, url) {
  const pokemonLink = document.createElement("a");
  pokemonLink.href = url;
  pokemonLink.textContent = name;
  return pokemonLink;
}

async function createPokemon(name, url) {
  const newPokemonDiv = document.createElement("div");
  newPokemonDiv.className = "pokemonDiv";
  newPokemonDiv.textContent = name;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      newPokemonDiv.textContent += json.id;
      const imgEl = document.createElement("img");
      imgEl.src = json.sprites.front_default;
      newPokemonDiv.appendChild(imgEl);
    });

  // const response = await fetch(url);
  // const json = await response.json();
  //

  // const imgEl = document.createElement("img");
  // imgEl.src = json.sprites.front_default;
  // newPokemonDiv.appendChild(imgEl);
  // newPokemon.appendChild(await createPokemonImage(url));
  // const brEl = document.createElement("br");
  // newPokemon.appendChild(brEl);
  // newPokemon.appendChild(createPokemonLink(name, url));
  return newPokemonDiv;
}

async function searchPokemon(event) {
  if (event.code === "Enter") {
    const term = event.target.value;
    const url = `https://pokeapi.co/api/v2/pokemon/ ${term}`;
    const root = document.getElementById("root");
    root.innerHTML = "";
    const createPokemon = await getOnePokemon(term);
    createPokemon(term, url).then((newPokemon) => root.appendChild(newPokemon));
  }
}

function createSearchField() {
  const searchField = document.createElement("input");
  searchField.type = "text";
  searchField.placeholder = "Search";
  searchField.addEventListener("keyup", searchPokemon);

  return searchField;
}

async function init() {
  const root = document.getElementById("root");
  root.prepend(createSearchField());
  const pokemon = await getAllPokemons();
  pokemon.forEach(async ({ name, url }) => {
    console.log(name);
    root.appendChild(await createPokemon(name, url));
  });
}

init();
