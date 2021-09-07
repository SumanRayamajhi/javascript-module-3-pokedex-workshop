async function getAllPokemons() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
}

// async function getOnePokemon(url) {
//   const response = await fetch(url)
//   const pokemon = await response.json()
//   retu
// }

async function getOnePokemon(term) {
  const url = `https://pokeapi.co/api/v2/pokemon/${term}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

async function getOnePokemonSprite(url) {
  const response = await fetch(url);
  const pokemon = await response.json();
  return pokemon.sprites["front_default"];
}
export { getAllPokemons, getOnePokemonSprite, getOnePokemon };
