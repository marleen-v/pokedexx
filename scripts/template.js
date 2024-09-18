function getPokemonsTemplateHTML(pokemonNr, pokemonData) {
  let pokemonName = pokemonData.name;
  let pokemonImg = pokemonData.sprites.other["official-artwork"].front_default;
  let pokemonType = pokemonData.types[0].type.name;

  let typeClass = "type-" + pokemonType;

  return `
    <button class="card-small-btn" onclick="openCardInfo(${pokemonNr})">
        <div class="card-small ${typeClass}" id="card">
          <div class="card-small-title d-flex bd-radius-top">
            <span class="card-small-nr">#${pokemonNr}</span>
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

          </div>
        </div>
      </button>
    `;
}

function getCircleTypesTemplateHTML(pokemonData, pokemonType) {
  let pokemonName = pokemonData.name;
  let typeClass = "type-" + pokemonType;
  return `
            <div class="circle-type ${typeClass}" >
              <img src="./assets/icons/${pokemonType}.svg" alt="${pokemonName}" class="type-icon" >
            </div>
  `;
}

function getInfoTemplateHTML(pokemonNr, pokemonData) {
  const pokemonName = pokemonData.name;
  const pokemonImg =
    pokemonData.sprites.other["official-artwork"].front_default;
  const pokemonType = pokemonData.types[0].type.name;
  const typeClass = "type-" + pokemonType;

  return `
  <div class="card card-color ${typeClass}" id="card">
        <div class="card-title d-flex bd-radius-top">
          <span id="card-nr">#${pokemonNr}</span>
          <h2 id="card-name">${pokemonName}</h2>
          <button id="close-btn" onclick="closeCardInfo()">
            <img
              class="icon"
              src="./assets/icons/xmark-solid.svg"
            >
            </button>
        </div>
        <div class="card-img d-flex">
          <button id="arrow-left" onclick="showPreviousPokemon(${pokemonNr})">
            <img
              class="arrow-icon"
              src="./assets/icons/chevron-left-solid.svg"
            >
          </button>
          <img
            src="${pokemonImg}"
            alt="${pokemonName}"
            id="card-img"
            class="card-pokemon-img"
          />
          <button id="arrow-right" onclick="showNextPokemon(${pokemonNr})">
            <img
              class="arrow-icon"
              src="./assets/icons/chevron-right-solid.svg"
            >
          </button>
        </div>
        <div class="card-info-container d-flex card-padding bd-radius-bt">
          <div class="card-menu d-flex">
            <button id="main-btn" class=" menu-left-btn menu-btn d-flex ${typeClass}" onclick="showMainInfo(${pokemonNr}, 'main-btn')">main</button>
            <button id="stats-btn" class="menu-center-btn menu-btn d-flex" onclick="showStatsInfo(${pokemonNr}, 'stats-btn')">stats</button>
            <button id="evo-chain-btn" class="menu-right-btn menu-btn d-flex" onclick="showEvolutionChain(${pokemonNr}, 'evo-chain-btn')">evo-chain</button>
          </div>
          <div class="card-info" id="card-info">

          </div>
        </div>
      </div>
  `;
}

function getMainTemplateHTML(pokemonData) {
  const pokemonkWeight = pokemonData.weight / 10;
  const pokemonHeight = pokemonData.height / 10;
  const pokemonAbilities = () =>
    pokemonData.abilities.map((item) => item.ability.name).join(", ");
  const pokemonAllAbilites = pokemonAbilities();

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

            </table>
  `;
}

function renderStatsTemplateHTML() {
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
