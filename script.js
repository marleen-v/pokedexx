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
  let count = pokemonData.count; 

  if (pokemonNr < count){
    pokemonNr += 1;
  openCardInfo(pokemonNr);
};
}

function showPreviousPokemon(pokemonNr) {

  if(pokemonNr > 1){
    pokemonNr = pokemonNr - 1;
  openCardInfo(pokemonNr);
}
};


// --------------Rendern EVOLUTION-CHAIN-----------------------------


// Funktion zum Abrufen des Bildes eines Pokémon
function getPokemonImage(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

//------------------------- Extrahieren der Evolution Chain und Abrufen der Bilder---------------------

function extractEvolutionChain(evolutionData) {
  let evolutions = [];
  let currentEvolution = evolutionData.chain;

  while (currentEvolution) {
    const speciesName = currentEvolution.species.name;
    const speciesUrl = currentEvolution.species.url;
    const speciesId = speciesUrl.split('/')[6]; // Extrahieren der Pokémon-ID aus der URL
    evolutions.push({
      name: speciesName,
      id: speciesId,
      imageUrl: getPokemonImage(speciesId)
    });

    // Nächste Evolution
    currentEvolution = currentEvolution.evolves_to.length ? currentEvolution.evolves_to[0] : null;
  }

  return evolutions;
}

 // Funktion zum Anzeigen der Evolution Chain mit Bildern
 function displayEvolutionChain(evolutionChain) {
  const mainInfoRef = document.getElementById("card-info");
      mainInfoRef.innerHTML = `<div class="flex-center" style="height: 80%;" id="evo-chain-container">`;
  const evoChainRef = document.getElementById('evo-chain-container')
 /*  evoChainRef.innerHTML = '' */

 

 evolutionChain.forEach((pokemon, index) => {
  evoChainRef.innerHTML += `
     <div class="evo">
       <img src="${pokemon.imageUrl}" alt="${pokemon.name}" />
       <p>${pokemon.name}</p>
     </div>
   `;

   // Pfeil hinzufügen, wenn es nicht das letzte Pokémon ist
   if (index < evolutionChain.length - 1) {
    evoChainRef.innerHTML += '<div class="arrow">→</div>';
   }
 });
}




  //-------------------------Hauptlogik zur Ausführung der gesamten Evolution Chain:---------------------

  async function showEvolutionChain(pokemonNr) {
    const pokemonData = await getSpeciesData(pokemonNr);
    
    if (pokemonData.evolution_chain) {
      const evolutionChainData = await getEvolutionChain(pokemonData.evolution_chain.url);
      const evolutionChain = extractEvolutionChain(evolutionChainData);
      displayEvolutionChain(evolutionChain);
    }
  }
