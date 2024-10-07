
function openCardInfo(pkmNr, btnId) {
    const contentInfoRef = document.getElementById("pokemon-info-card");
    const placeholderRef = document.getElementById("placeholder"); 
    const cardInfoRef = document.getElementById("pkm-card");
    const bodyRef = document.getElementsByTagName("body")[0];
    const pkmCardRef = document.querySelectorAll(".card-small-btn")[pkmNr];
    
    checkIfPkmMarked  ();
    pkmCardRef.classList.toggle("border");
    placeholderRef.classList.remove("d_none")
    bodyRef.classList.add("no-scroll");
    cardInfoRef.classList.add("info-conatiner");
    
    contentInfoRef.innerHTML = getInfoTemplateHTML(pkmNr);
  
    showMainInfo(pkmNr, btnId);
    checkIfFirstOrLastPkm(pkmNr);
  
  }

  function closeCardInfo() {
    const ContentInfoRef = document.getElementById("pokemon-info-card");
    const placeholderRef = document.getElementById("placeholder"); 
    const cardInfoRef = document.getElementById("pkm-card");
    const bodyRef = document.getElementsByTagName("body")[0];
    
    checkIfPkmMarked ();
    placeholderRef.classList.add("d_none")
    bodyRef.classList.remove("no-scroll");
    cardInfoRef.classList.remove("info-conatiner");
    ContentInfoRef.innerHTML = "";
  }

  function addOrRemoveArrow() {
    let pkmNr = document.getElementById("card-nr")
    // check if dialog open
    if(pkmNr != null){
      pkmNr = parseInt(pkmNr.innerHTML.replace("#", ""));
      if (pkmNr == currentList.length) { // check if Pkm is the first or last one
        pkmNr -= 1
        checkIfFirstOrLastPkm(pkmNr); 
      }
    }
  }

  function checkIfFirstOrLastPkm(pkmNr){
    if(currentList.length == 1){ // if there is just one Pkm shown
      document.getElementById("arrow-right").classList.toggle("v_none");
      document.getElementById("arrow-left").classList.add("v_none");
    }else {
      if (pkmNr == currentList.length -1) { // if its the last Pkm
      document.getElementById("arrow-right").classList.toggle("v_none");
    }  else if (pkmNr == 0){ // if its the first Pkm
      document.getElementById("arrow-left").classList.add("v_none");
    } 
  }
}

  function showMainInfo(pkmNr, btnId) {
    const mainInfoRef = document.getElementById("card-info");
  
    mainInfoRef.innerHTML = getMainTemplateHTML(pkmNr);
    toggleActiveButton(pkmNr, btnId);
  }
  
  function toggleActiveButton(pkmNr, clickedButtonId) {
    const buttons = document.querySelectorAll(".menu-btn");
    const pokemonType = currentList[pkmNr].types[0].type.name;
    const typeClass = "type-" + pokemonType;
  
    buttons.forEach((button) => {
      if (button.id === clickedButtonId) {
        button.classList.add(typeClass, "btn-active-font"); //background color for active button
      } else {
        button.classList.remove(typeClass, "btn-active-font"); // back to Default-color
      }
    });
  }
  
  function showStatsInfo(pkmNr, btnId) {
    const mainInfoRef = document.getElementById("card-info");
    mainInfoRef.innerHTML = getStatsTemplateHTML(pkmNr);
    updateProgressBars(pkmNr);
    toggleActiveButton(pkmNr, btnId);
  }

async function updateProgressBars(pkmNr) {
  
    const progressBars = document.querySelectorAll('.progress-bar'); 
  
    progressBars.forEach((bar, index) => {
        
        let progress = currentList[pkmNr].stats[index].base_stat;
        let progressProcent;
        let numbers = [255, 190, 250, 194, 250, 200] 
        // 255 is highest base HP value
        // 190 is highest base attack value
        // 250 is highest base defense value
        // 194 is highest special attack value
        // 250 is highest special defense value
        // //200 is highest base speed value

        progressProcent = (progress/numbers[index]*100).toFixed();

        bar.style.width = `${progressProcent}%`; 
        bar.setAttribute('data-progress', progressProcent);
    });
  }

  async function getEvolutionChain(evolutionChainUrl) {
    try {
      const response = await fetch(evolutionChainUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error retrieving Evolution Chain:", error);
    }
  }

  function extractEvolutionChain(evolutionData) {
    let evolutions = [];
    let currentEvolution = evolutionData.chain;
  
    while (currentEvolution) {
      const speciesName = currentEvolution.species.name;
      const speciesUrl = currentEvolution.species.url;
      const speciesId = speciesUrl.split("/")[6]; // Extracting Pokémon ID from URL
      evolutions.push({
        name: speciesName,
        id: speciesId,
        imageUrl: getPokemonImage(speciesId),
      });
  
      // Next Evolution
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
  
    evolutionChain.forEach((pokemon, index) => {
      evoChainRef.innerHTML += `
       <div class="evo">
         <img src="${pokemon.imageUrl}" alt="${pokemon.name}" />
         <p>${pokemon.name}</p>
       </div>
     `;
  
      // add arrow, if its not the last Pokemon
      if (index < evolutionChain.length - 1) {
        evoChainRef.innerHTML +=
          '<div class="arrow"><img src="./assets/icons/chevron-right-solid.svg" class="icon-small"></div>';
      }
    });
  }
  
  async function showEvolutionChain(pkmNr, pokemonId, btnId) {
    const pokemonSpecies = await getSpeciesData(pokemonId);
  
    if (pokemonSpecies.evolution_chain) {
      const evolutionChainData = await getEvolutionChain(
        pokemonSpecies.evolution_chain.url
      );
      const evolutionChain = extractEvolutionChain(evolutionChainData);
      displayEvolutionChain(evolutionChain);
      toggleActiveButton(pkmNr, btnId);
    }
  }
  
  async function showNextPokemon(pokemonNr, btnId) {
  
    if (pokemonNr < currentList.length-1) {
      pokemonNr += 1;
      openCardInfo(pokemonNr, btnId);
    }
  }
  
  function showPreviousPokemon(pokemonNr, btnId) {
    if (pokemonNr > 0) {
      pokemonNr = pokemonNr - 1;
      openCardInfo(pokemonNr, btnId);
    }
  } 

