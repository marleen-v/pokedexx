async function updateProgressBars(pokemonNr) {
  
    const progressBars = document.querySelectorAll('.progress-bar'); // Wähle alle Balken aus
  
    const pokemonData = await getPokemonData(pokemonNr);

    progressBars.forEach((bar, index) => {
        
        let progress = pokemonData.stats[index].base_stat;
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