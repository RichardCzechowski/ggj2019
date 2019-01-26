export default class Controller {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    if($('#app').hasClass('vibrate')){
      $('#d').prop('checked',true)
    }
    this.gottenPoints = false
  }

  setupListeners () {
    $('#d').on('click', (event) =>{
      var audio = document.getElementById("audio");
      audio.play();
      if(event.target.checked){
        $('#app').addClass('vibrate')
        // Give them some points!
        if(!this.gottenPoints) {
          this.gameState.points += 5
        }
        this.gottenPoints = true
      } else {
        $('#app').removeClass('vibrate')
      }
    })
  }
}

