async function getPokemonData(pokemonId) {
  try {
    const response = await fetch(`${baseUrl}pokemon/${pokemonId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error loading Pokémon data:", error);
  }
}

async function getAllPokemonNames() {
  try {
    const response = await fetch(`${baseUrl}pokemon?limit=1025&offset=0`);
    const data = await response.json();
    allPkmNames = data.results.map((element) => element.name); //Array of all existing Pokemon names
    allPkmCount = data.count; //total number of all Pkms
    return data;
  } catch (error) {
    console.error("Error loading Pokémon data:", error);
  }
}

// for evolution chain
async function getSpeciesData(pokemonName) {
  try {
    const response = await fetch(`${baseUrl}pokemon-species/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading Pokémon data:", error);
  }
}

