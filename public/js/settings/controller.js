export default class Controller {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    if($('#app').hasClass('vibrate')){
      $('#d').prop('checked',true)
    }
  }

  setupListeners () {
    $('#d').on('click', (event) =>{
      var audio = document.getElementById("audio");
      audio.play();
      if(event.target.checked){
        $('#app').addClass('vibrate')
        // Give them some points!
        if(!this.gameState.gottenPoints.controller) {
          this.gameState.points += 5
        }
          this.gameState.gottenPoints.controller = true
      } else {
        $('#app').removeClass('vibrate')
      }
    })
  }
}

