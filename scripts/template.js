function getPokemonsTemplateHTML(pkmNr) {
  let pokemonName = currentList[pkmNr].name;
  let pokemonImg = currentList[pkmNr].sprites.other["official-artwork"].front_default;
  let pokemonType = currentList[pkmNr].types[0].type.name;
  let pokemonId = currentList[pkmNr].id;

  let typeClass = "type-" + pokemonType;

  return `
    <button class="card-small-btn" onclick="openCardInfo(${pkmNr}, 'main-btn')">
        <div class="card-small ${typeClass}" id="card">
          <div class="card-small-title d-flex bd-radius-top">
            <h2 id="card-name">${pokemonName}</h2>
          </div>
          <div class="card-small-img d-flex ">
         
            <img
              src="${pokemonImg}"
              alt="${pokemonName}"
              class="card-pokemon-img"
            />
          </div>
    
          <div class="card-bottom">
          <div class="card-circle">
         
          </div>
           <div class="card-small-nr">#${pokemonId}</div>
        </div>
      </button>
    `;
}

function getCircleTypesTemplateHTML(pkmNr, pokemonType) {
  let pokemonName = currentList[pkmNr].name;
  return `
            <div class="circle-type type-${pokemonType} tooltip" >
              <img src="./assets/icons/${pokemonType}.svg" alt="${pokemonName}" class="type-icon " >
              <span class="tooltiptext">Type: ${pokemonType} </span>
            </div>
  `;
}

function getInfoTemplateHTML(pkmNr) {
  const pokemonName = currentList[pkmNr].name;
  const pokemonImg =
  currentList[pkmNr].sprites.other["official-artwork"].front_default;
  const pokemonType = currentList[pkmNr].types[0].type.name;
  let pokemonId = currentList[pkmNr].id;

  return `
  <div class="card card-color type-${pokemonType}" id="card">
        <div class="card-title d-flex bd-radius-top">
          <span id="card-nr">#${pokemonId}</span>
          <h2 id="card-name">${pokemonName}</h2>
          <button id="close-btn" onclick="closeCardInfo()">
            <img
              class="icon"
              src="./assets/icons/xmark-solid.svg"
            >
            </button>
        </div>
        <div class="card-img d-flex">
          <button id="arrow-left" onclick="showPreviousPokemon(${pkmNr})">
            <img
              class="icon chevron"
              src="./assets/img/chevron-left.svg"
            >
          </button>
          <img
            src="${pokemonImg}"
            alt="${pokemonName}"
            id="card-img"
            class="card-pokemon-img"
          />
        <button id="arrow-right" onclick="showNextPokemon(${pkmNr})">
            <img
              class="icon chevron"
              src="./assets/img/chevron-right.svg"
            >
          </button>
        </div>
        <div class="card-info-container d-flex card-padding bd-radius-bt">
          <div class="card-menu d-flex">
            <button id="main-btn" class=" menu-left-btn menu-btn d-flex " onclick="showMainInfo(${pkmNr}, 'main-btn')">main</button>
            <button id="stats-btn" class="menu-center-btn menu-btn d-flex" onclick="showStatsInfo(${pkmNr}, 'stats-btn')">stats</button>
            <button id="evo-chain-btn" class="menu-right-btn menu-btn d-flex" onclick="showEvolutionChain(${pkmNr}, ${pokemonId}, 'evo-chain-btn')">evo-chain</button>
          </div>
          <div class="card-info" id="card-info">

          </div>
        </div>
      </div>
  `;
}

function getMainTemplateHTML(pkmNr) {
  const pokemonkWeight = currentList[pkmNr].weight / 10;
  const pokemonHeight = currentList[pkmNr].height / 10;
  const pokemonAbilities = () => currentList[pkmNr].abilities.map((item) => item.ability.name).join(", ");
  const pokemonAllAbilites = pokemonAbilities();
  const pokemonType = () => currentList[pkmNr].types.map((item) => item.type.name).join(", ");
  const pokemonAllTypes = pokemonType();

  return `
  <table>
              <tr>
                <td>Height</td>
                <td>${pokemonHeight} m</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${pokemonkWeight} kg</td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td>${pokemonAllAbilites}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>${pokemonAllTypes}</td>
              </tr>

            </table>
  `;
}

function getStatsTemplateHTML() {
  return `
    
      <table>
        <tr>
          <td>Hp</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Attack</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Defense</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Special Attack</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Special Defense</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
        <tr>
          <td>Speed</td>
          <td>
            <div class="progress-container">
              <div class="progress-bar"></div>
            </div>
          </td>
        </tr>
      </table>
  `;
}

// for Evolution-Chain:
function getPokemonImage(pokemonId) {   
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}