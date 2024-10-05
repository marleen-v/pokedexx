// Funktion zum Abrufen der Pokémon-Daten eines einzelnen Pokemon
async function getPokemonData(pokemonId) {
  try {
    const response = await fetch(`${baseUrl}pokemon/${pokemonId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

async function getAllPokemonNames() {
  try {
    const response = await fetch(`${baseUrl}pokemon?limit=1025&offset=0`);
    const data = await response.json();
    allPkmNames = data.results.map((element) => element.name); //Array aus allen vorhandenen Pokemon-Namen
    allPkmCount = data.count; //Anzahl vorhandener Pokemon
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

// Funktion zum Abrufen der Pokémon-SpeciesDaten -> Evolution Chain
async function getSpeciesData(pokemonName) {
  try {
    const response = await fetch(`${baseUrl}pokemon-species/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

// fürs weiterklicken im Dialog
/*   async function getAllPkmData() {
    for (let index = 0; index <= 2; index++) {
      try {
        const response = await fetch(`${baseUrl}pokemon/${index}`);
        const data = await response.json();
        allPkmList.push(data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
      }
    }
  } */
