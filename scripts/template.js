function getPokemonsTemplateHTML(pokemonNr, pokemonData){
    let pokemonName = pokemonData.name;
    let pokemonImg = pokemonData.sprites.other['official-artwork'].front_default;  
    let pokemonType = pokemonData.types[0].type.name; 

    let typeClass = "type-" + pokemonType;
    let typeClassIcon = "fa-star";           //----To Do:  richtiges Icons schauen!

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
              id="card-img"
              class="card-pokemon-img"
            />
          </div>
    
          <div class="card-bottom">
            <div class="circle-type ${typeClass} ">
              <span class="fa-solid ${typeClassIcon}"></span>
            </div>
          </div>
        </div>
      </button>
    `;
}

function getInfoTemplateHTML(pokemonNr, pokemonData) {
  const pokemonName = pokemonData.name;
  const pokemonImg = pokemonData.sprites.other["official-artwork"].front_default;
  const pokemonType = pokemonData.types[0].type.name;     // to-do: noch nutzen!!

  return `
  <div class="card card-color" id="card">
        <div class="card-title d-flex bd-radius-top">
          <span id="card-nr">#${pokemonNr}</span>
          <h2 id="card-name">${pokemonName}</h2>
          <button id="close-btn" onclick="closeCardInfo()">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </button>
        </div>
        <div class="card-img d-flex">
          <button id="arrow-left" onclick="showPreviousPokemon(${pokemonNr})">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
              />
            </svg>
          </button>
          <img
            src="${pokemonImg}"
            alt="${pokemonName}"
            id="card-img"
            class="card-pokemon-img"
          />
          <button id="arrow-right" onclick="showNextPokemon(${pokemonNr})">
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
              />
            </svg>
          </button>
        </div>
        <div class="card-info-container d-flex card-padding bd-radius-bt">
          <div class="card-menu d-flex">
            <button class="menu-left-btn menu-btn d-flex" onclick="showMainInfo(${pokemonNr})">main</button>
            <button class="menu-center-btn menu-btn d-flex" onclick="showStatsInfo(${pokemonNr})">stats</button>
            <button class="menu-right-btn menu-btn d-flex" onclick="showEvolutionChain(${pokemonNr})">evo-chain</button>
          </div>
          <div class="card-info" id="card-info">

          </div>
        </div>
      </div>
  `;
}



function getMainTemplateHTML (pokemonData) {

  const pokemonkWeight = pokemonData.weight/10;
  const pokemonHeight = pokemonData.height/10;
  const pokemonAbilities = () => pokemonData.abilities.map(item => item.ability.name).join(', ');
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


