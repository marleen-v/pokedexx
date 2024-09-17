async function updateProgressBars(pokedexNr) {
    let resSingle = await fetch(singlePokemon_URL + pokedexNr.toString());
    let resSinglePokemon = await resSingle.json();  


    const progressBars = document.querySelectorAll('.progress-bar'); // Wähle alle Balken aus
  
/*     progressBars.forEach((bar, index) => {
        // Beispiel: Der Fortschritt für jeden Balken wird zufällig geändert
        let progress = Math.floor(Math.random() * 101); // Zufallszahl zwischen 0 und 100
        bar.style.width = `${progress}%`; // Aktualisiere die Breite des Fortschrittsbalkens
        bar.setAttribute('data-progress', progress); // Optional: Setze das neue Fortschrittsattribut
    }); */

    progressBars.forEach((bar, index) => {
        
        let progress = resSinglePokemon.stats[index].base_stat;
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