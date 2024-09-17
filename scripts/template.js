function getPokemonsTemplateHTML(pokemonNr, pokemonData){
    let pokemonName = pokemonData.name;
    let pokemonImg = pokemonData.sprites.other['official-artwork'].front_default;  
    let pokemonType = pokemonData.types[0].type.name; 

    let typeClass = "type-" + pokemonType;
    let typeClassIcon = "fa-star";           //----richtiges Icons schauen!

 /*    if(pokemonType === "fire") {
      typeClass = "typeFire";
      typeClassIcon = "fa-star";
    } else if(pokemonType === "grass"){
      typeClass = "typeGrass";
      typeClassIcon = "fa-user";
    } else if(pokemonType === "water"){
        typeClass = "typeWater";
        typeClassIcon = "fa-user";
  }  */
 

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