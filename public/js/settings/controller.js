export default class Controller {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    if($('#app').hasClass('vibrate')){
      $('#vibration').prop('checked',true)
    }
    this.gottenPoints = false
  }

  setupListeners () {
    $('#vibration').on('click', (event) =>{
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
