const baseUrl = 'https://pokeapi.co/api/v2/';

// Funktion zum Abrufen der Pokémon-Daten
async function getPokemonData(pokemonName) {
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

  // Funktion zum Abrufen des Bildes eines Pokémon
function getPokemonImage(pokemonId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }


//------------------------- Extrahieren der Evolution Chain und Abrufen der Bilder---------------------

// Funktion zum Extrahieren der Pokémon aus der Evolution Chain
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
    const container = document.getElementById('evolution-chain');
    container.innerHTML = ''; // Leeren des Containers
  
    evolutionChain.forEach(pokemon => {
      const pokemonElement = document.createElement('div');
      pokemonElement.className = 'pokemon';
  
      const img = document.createElement('img');
      img.src = pokemon.imageUrl;
      img.alt = pokemon.name;
  
      const name = document.createElement('p');
      name.textContent = pokemon.name;
  
      pokemonElement.appendChild(img);
      pokemonElement.appendChild(name);
      container.appendChild(pokemonElement);
    });
  }
  

  //-------------------------Hauptlogik zur Ausführung der gesamten Evolution Chain:---------------------

  // Hauptfunktion zum Abrufen und Anzeigen der Evolution Chain eines Pokémon
async function showEvolutionChain(pokemonName) {
    const pokemonData = await getPokemonData(pokemonName);
    
    if (pokemonData.evolution_chain) {
      const evolutionChainData = await getEvolutionChain(pokemonData.evolution_chain.url);
      const evolutionChain = extractEvolutionChain(evolutionChainData);
      displayEvolutionChain(evolutionChain);
    }
  }
  
  // Beispiel: Die Evolution Chain von Pikachu abrufen
  showEvolutionChain('pikachu');
  

