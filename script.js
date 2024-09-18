const baseUrl = "https://pokeapi.co/api/v2/";

/* let pokemonCount = 10; */

let currentPokemons = 0;
let addPokemon = 10;

function init() {
  renderPokemon();
}

// Funktion zum Abrufen aller Pokemon

async function getAllPokemons() {
  try {
    const response = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

// Funktion zum Abrufen der Pokémon-Daten eines Pokemon
async function getPokemonData(pokemonNr) {
  try {
    const response = await fetch(`${baseUrl}pokemon/${pokemonNr}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

// Funktion zum Abrufen der Pokémon-SpeciesDaten
async function getSpeciesData(pokemonName) {
  try {
    const response = await fetch(`${baseUrl}pokemon-species/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
  }
}

// Funktion zum Abrufen der Evolution Chain
async function getEvolutionChain(evolutionChainUrl) {
  try {
    const response = await fetch(evolutionChainUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Evolution Chain:", error);
  }
}

// Pokemon rendern

async function renderPokemon() {
  const contentRef = document.getElementById("content");

    for (pokemonNr = currentPokemons + 1; pokemonNr <= (addPokemon + currentPokemons) ; pokemonNr++) {
      const pokemonData = await getPokemonData(pokemonNr);
     

      contentRef.innerHTML += getPokemonsTemplateHTML(pokemonNr, pokemonData);

      renderCricleTypes(pokemonNr, pokemonData);
    }
    currentPokemons += 10;
  } 

function renderMorePokemon() {
  renderPokemon();
 
}

/* async function renderPokemon() {
  const contentRef = document.getElementById("content");

  if (pokemonCount == 10) {
    for (let pokemonNr = 1; pokemonNr <= pokemonCount; pokemonNr++) {
      const pokemonData = await getPokemonData(pokemonNr);
     

      contentRef.innerHTML += getPokemonsTemplateHTML(pokemonNr, pokemonData);

      renderCricleTypes(pokemonNr, pokemonData);
    }
    pokemonCount += 1;
  } else {
    for (
      let pokedexNr = pokemonCount;
      pokedexNr <= pokemonCount + 9;
      pokedexNr++
    ) {
      const pokemonData = await getPokemonData(pokedexNr);

      contentRef.innerHTML += getPokemonsTemplateHTML(pokedexNr, pokemonData);

      renderCricleTypes(pokedexNr, pokemonData);
    }
    pokemonCount += 10;
  }
} */


function renderCricleTypes(pokemonNr, pokemonData) {
  const typeCirclesRef =
    document.querySelectorAll(".card-bottom")[pokemonNr - 1];

  for (let index = 0; index < pokemonData.types.length; index++) {
    let pokemonType = pokemonData.types[index].type.name;

    typeCirclesRef.innerHTML += getCircleTypesTemplateHTML(
      pokemonData,
      pokemonType
    );
  }
}





async function openCardInfo(pokemonNr) {
  const contentInfoRef = document.getElementById("pokemon-info-card");

  const pokemonData = await getPokemonData(pokemonNr);

  contentInfoRef.innerHTML = getInfoTemplateHTML(pokemonNr, pokemonData);

  showMainInfo(pokemonNr);
}

function closeCardInfo() {
  const ContentInfoRef = document.getElementById("pokemon-info-card");

  ContentInfoRef.innerHTML = "";
}

/* async function showActiveMenuBtn(pokemonData) {
  const mainBtnRef = document.getElementById("main-btn");
  const pokemonType = pokemonData.types[0].type.name; 
  const typeClass = "type-" + pokemonType;

  mainBtnRef.classList.add("type-" + typeClass);

} */

function toggleActiveButton(pokemonData, clickedButtonId) {
  const buttons = document.querySelectorAll(".menu-btn");
  const pokemonType = pokemonData.types[0].type.name;
  const typeClass = "type-" + pokemonType;

  buttons.forEach((button) => {
    if (button.id === clickedButtonId) {
      button.classList.add(typeClass, "btn-active-font"); //Hintergrundfarbe für den geklickten Button
    } else {
      button.classList.remove(typeClass, "btn-active-font"); // Zurück zur Default-Farbe
    }
  });
}

async function showMainInfo(pokemonNr, btnId) {
  const mainInfoRef = document.getElementById("card-info");

  const pokemonData = await getPokemonData(pokemonNr);

  mainInfoRef.innerHTML = getMainTemplateHTML(pokemonData);
  toggleActiveButton(pokemonData, btnId);
}

async function showStatsInfo(pokemonNr, btnId) {
  const mainInfoRef = document.getElementById("card-info");

  const pokemonData = await getPokemonData(pokemonNr);

  mainInfoRef.innerHTML = renderStatsTemplateHTML(pokemonNr);
  updateProgressBars(pokemonNr);
  toggleActiveButton(pokemonData, btnId);
}

async function showNextPokemon(pokemonNr) {
  const pokemonData = await getAllPokemons();
  let count = pokemonData.count;

  if (pokemonNr < count) {
    pokemonNr += 1;
    openCardInfo(pokemonNr);
  }
}

function showPreviousPokemon(pokemonNr) {
  if (pokemonNr > 1) {
    pokemonNr = pokemonNr - 1;
    openCardInfo(pokemonNr);
  }
}

function getPokemonImage(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

function extractEvolutionChain(evolutionData) {
  let evolutions = [];
  let currentEvolution = evolutionData.chain;

  while (currentEvolution) {
    const speciesName = currentEvolution.species.name;
    const speciesUrl = currentEvolution.species.url;
    const speciesId = speciesUrl.split("/")[6]; // Extrahieren der Pokémon-ID aus der URL
    evolutions.push({
      name: speciesName,
      id: speciesId,
      imageUrl: getPokemonImage(speciesId),
    });

    // Nächste Evolution
    currentEvolution = currentEvolution.evolves_to.length
      ? currentEvolution.evolves_to[0]
      : null;
  }

  return evolutions;
}

function displayEvolutionChain(evolutionChain) {
  const mainInfoRef = document.getElementById("card-info");
  mainInfoRef.innerHTML = `<div class="flex-center" style="height: 80%;" id="evo-chain-container">`;
  const evoChainRef = document.getElementById("evo-chain-container");
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

async function showEvolutionChain(pokemonNr, btnId) {
  const pokemonSpecies = await getSpeciesData(pokemonNr);
  const pokemonData = await getPokemonData(pokemonNr);

  if (pokemonSpecies.evolution_chain) {
    const evolutionChainData = await getEvolutionChain(
      pokemonSpecies.evolution_chain.url
    );
    const evolutionChain = extractEvolutionChain(evolutionChainData);
    displayEvolutionChain(evolutionChain);
    toggleActiveButton(pokemonData, btnId);
  }
}
