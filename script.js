const baseUrl = "https://pokeapi.co/api/v2/";

let pokemonNr = 1;

let currentPkmCount = 0;
let currentList = [];

let allPkmCount;
/* let allPkmList = []; */

let allPkmNames = [];
let foundNames = [];

function init() {
 
  /* getAllPkmData(); */
  renderPokemon();
  getAllPokemonNames();
  
}




function renderStartPkm() {
  const contentRef = document.getElementById("content");
  const LoadMoreBtnRef = document.getElementById("load-btn");
  const searchFieldRef = document.getElementById("search-field");

  searchFieldRef.value = "";

pokemonNr = 1;
currentPkmCount = 0;
currentList = [];
allPkmCount;
/* allPkmList = []; */



contentRef.innerHTML="";
LoadMoreBtnRef.style.display = 'flex';
closeCardInfo();
renderPokemon();
}



function filterAndShowNames() {
  const searchFieldRef = document.getElementById("search-field");
  const filterWord = searchFieldRef.value;
  const LoadMoreBtnRef = document.getElementById("load-btn");
  const contentRef = document.getElementById("content");
  const infoRef = document.getElementById("info-search-field");

  closeCardInfo();
  currentList = [];
  LoadMoreBtnRef.style.display = 'none';

  if (filterWord == "") {
  } //eingegebene Wert ist eine Nummer
  else if (isNaN(filterWord) === false && filterWord <= allPkmCount) {
    infoRef.classList.add("d_none");
    pokemonNr = parseInt(filterWord);
    renderPkmByNumber(pokemonNr);
  } //eingegebener Wert ist ein String
  else {
    // Pokemon wird gesucht, wenn eingegebener Wert drei oder mehr Buchstaben hat
    if (filterWord.length >= 3) {
      infoRef.classList.add("d_none");
      contentRef.innerHTML = "";

      closeCardInfo();
      foundNames = allPkmNames.filter((name) => name.includes(filterWord));
      if (foundNames.length > 0) {
        renderPokemonByNames();
      } else {
        contentRef.innerHTML = `<div class="no-pokemons"> <p>There are no Pokemons for you </p> </div>`;
      }
    } else {
      infoRef.classList.remove("d_none"); // Hinweis-Nachricht für Suchfeld-Eingabe
    }
  }
}

 async function renderPkmByNumber(PokemonNr) {
  const contentRef = document.getElementById("content");
  const pokemonData = await getPokemonData(PokemonNr);

  currentList.push(pokemonData);
  contentRef.innerHTML = "";
  const pokIndex = 0; // da immer nur nach einem einzigen Pkm gesucht wird und dieses an Positin 0 steht 
  contentRef.innerHTML += getPokemonsTemplateHTML(pokIndex);
  renderCricleTypes(pokIndex);
} 

async function renderPokemonByNames() {
  const contentRef = document.getElementById("content");

  for (let index = 0; index < foundNames.length; index++) {
    const pokemonName = foundNames[index];

    const pokemonData = await getPokemonData(pokemonName);
    currentList.push(pokemonData);

    contentRef.innerHTML += getPokemonsTemplateHTML(index);
    renderCricleTypes(index);
  }
}



// Funktion zum Abrufen der Evolution Chain


function renderMorePokemon() {
  renderPokemon();
}

async function renderPokemon() {
  const contentRef = document.getElementById("content");

  showLoadingSpinner();

  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    // Wartet 500ms
    for (pokemonNr; pokemonNr <= currentPkmCount + 10; pokemonNr++) {
      const pokemonData = await getPokemonData(pokemonNr);
      currentList.push(pokemonData);
      let pkmNr = pokemonNr - 1; // da "currentList" bei 0 anfängt
      contentRef.innerHTML += getPokemonsTemplateHTML(pkmNr);
      renderCricleTypes(pkmNr);
    }
    currentPkmCount = currentList.length;
  } catch (error) {
    console.error("Fehler beim Laden der Pokémon-Daten:", error);
  } finally {
    // Spinner ausblenden, bevor die neuen Pokémon angezeigt werden
    hideLoadingSpinner();
  }
}

function renderCricleTypes(pkmNr) {
  const typeCirclesRef = document.querySelectorAll(".card-circle")[pkmNr];

  for (let index = 0; index < currentList[pkmNr].types.length; index++) {
    let pokemonType = currentList[pkmNr].types[index].type.name;

    typeCirclesRef.innerHTML += getCircleTypesTemplateHTML(pkmNr, pokemonType);
  }
}

function showLoadingSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "flex";
}

function hideLoadingSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}



