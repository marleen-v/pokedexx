function checkIfPkmMarked () {
    const allPkmCardRef = document.querySelectorAll(".card-small-btn");
    for (let index = 0; index < allPkmCardRef.length; index++) {
      const pkmCard = allPkmCardRef[index];
      if(pkmCard.classList.contains("border")){
        pkmCard.classList.remove("border")
      }
    }
  } 


