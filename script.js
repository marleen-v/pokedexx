const baseUrl = 'https://pokeapi.co/api/v2/';



let num = 10;

function init() {
    renderPokemon();
   
  }

// Funktion zum Abrufen aller Pokemons

async function getAllPokemons() {
  try {
    const response = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
  }
}

// Funktion zum Abrufen der Pokémon-Daten
async function getPokemonData(pokemonNr) {
    try {
      const response = await fetch(`${baseUrl}pokemon/${pokemonNr}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
    }
  }

// Funktion zum Abrufen der Pokémon-SpeciesDaten
async function getSpeciesData(pokemonName) {
  try {
    const response = await fetch(`${baseUrl}pokemon-species/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
  }
}

// Funktion zum Abrufen der Evolution Chain
async function getEvolutionChain(evolutionChainUrl) {
    try {
      const response = await fetch(evolutionChainUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Evolution Chain:', error);
    }
  }


//---------------------------------


async function renderPokemon() {
    const contentRef = document.getElementById("content");

    for (let pokemonNr = 1; pokemonNr <= num; pokemonNr++) {

       const pokemonData = await getPokemonData(pokemonNr);

        contentRef.innerHTML += getPokemonsTemplateHTML(pokemonNr, pokemonData);
      }
}


async function openCardInfo(pokemonNr) {
  const contentInfoRef = document.getElementById("pokemon-info-card");

  const pokemonData = await getPokemonData(pokemonNr);

  contentInfoRef.innerHTML = getInfoTemplateHTML(pokemonNr, pokemonData); 
  showMainInfo(pokemonNr);
    
}

function closeCardInfo(){
  const ContentInfoRef = document.getElementById("pokemon-info-card");

  ContentInfoRef.innerHTML ="";

}


async function showMainInfo(pokemonNr) {
  const mainInfoRef = document.getElementById("card-info");

  const pokemonData = await getPokemonData(pokemonNr);

  mainInfoRef.innerHTML = getMainTemplateHTML(pokemonData);
}

function showStatsInfo(pokemonNr) {
  const mainInfoRef = document.getElementById("card-info");
  mainInfoRef.innerHTML = renderStatsTemplateHTML(pokemonNr);
  updateProgressBars(pokemonNr);
}

async function showNextPokemon(pokemonNr){

  const pokemonData = await getAllPokemons();

  let count = pokemonData.count;  // to do: noch nutzen (Load-More-button)

  if (pokemonNr < count){
    pokemonNr += 1;
  openCardInfo(pokemonNr);
};
}

async function showPreviousPokemon(pokemonNr) {

  const pokemonData = await getAllPokemons();

  if(pokemonNr > 1){
    pokemonNr = pokemonNr - 1;
  openCardInfo(pokemonNr);
}
};