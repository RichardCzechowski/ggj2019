export default class Store {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    $('#sentience').on('click', (event) =>{
      if (this.gameState.points >= 25){
        if(confirm("Purchase Advanced Options? Warning: Only for Savvy individuals.")){
          // TODO Play a good sound
          var audio = document.getElementById("audio");
          audio.play();
          this.gameState.points -= 25
          this.gameState.advancedLinkIsDisabled =  ""
          this.gameState.advancedLink = "/settings-001100100-01101111-01101111-01101101"
        }
      } else {
        // TODO Play a bad sound sound
        var audio = document.getElementById("audio");
        audio.play();
      }
    })

    // Can't afford these
    $('.expOpt').on('click', (event) =>{
      // TODO Play a bad sound sound
      var audio = document.getElementById("audio");
      audio.play();
    })
  }
}


