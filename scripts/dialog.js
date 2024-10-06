
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

  function checkIfPkmMarked () {
    const allPkmCardRef = document.querySelectorAll(".card-small-btn");
    for (let index = 0; index < allPkmCardRef.length; index++) {
      const pkmCard = allPkmCardRef[index];
      if(pkmCard.classList.contains("border")){
        pkmCard.classList.remove("border")
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
        button.classList.add(typeClass, "btn-active-font"); //Hintergrundfarbe für den geklickten Button
      } else {
        button.classList.remove(typeClass, "btn-active-font"); // Zurück zur Default-Farbe
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
  
    const progressBars = document.querySelectorAll('.progress-bar'); // Wähle alle Balken aus
  

    progressBars.forEach((bar, index) => {
        
        let progress = currentList[pkmNr].stats[index].base_stat;
        let progressProcent;
        if(index = 0){
            progressProcent = (progress/255*100).toFixed();//255 ist der höchste Basis-HP-Wert, den in Pokemon hat 
        } else if(index = 1){
            progressProcent = (progress/190*100).toFixed(); // 190 ist dem höchsten Basis-Angriffswert
        } else if(index = 2){
            progressProcent = (progress/250*100).toFixed(); //250 ist dem höchsten Basis-Verteidigungswert
        } else if(index = 3){
            progressProcent = (progress/194*100).toFixed(); //194 ist dem höchsten Spezial-Angriffswert
        } else if(index = 4){
            progressProcent = (progress/250*100).toFixed(); //250 ist der höchste Spezial-Verteidigungswert
        } else {
            progressProcent = (progress/200*100).toFixed(); //200 ist der höchste Basis-Speedwert
        }

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
      console.error("Fehler beim Abrufen der Evolution Chain:", error);
    }
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
  
    evolutionChain.forEach((pokemon, index) => {
      evoChainRef.innerHTML += `
       <div class="evo">
         <img src="${pokemon.imageUrl}" alt="${pokemon.name}" />
         <p>${pokemon.name}</p>
       </div>
     `;
  
      // Pfeil hinzufügen, wenn es nicht das letzte Pokémon ist
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
  


/*   async function showNextPokemon(pokemonNr, btnId) {
    const pokemonData = await getAllPkmData();
    let count = pokemonData.count;
  
    if (pokemonNr < count) {
      pokemonNr += 1;
      openCardInfo(pokemonNr, btnId);
    }
  }
  
  function showPreviousPokemon(pokemonNr, btnId) {
    if (pokemonNr > 1) {
      pokemonNr = pokemonNr - 1;
      openCardInfo(pokemonNr, btnId);
    }
  } */
  