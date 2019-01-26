export default class Graphics {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    this.gottenPoints = false
  }

  setupListeners () {

    $('#motion-blur').on('click', (event) =>{
      if(event.target.checked){
        this.gameState.blurLength = .3
        // Give them some points!
        if(!this.gottenPoints) {
          this.gameState.points += 5
        }
        this.gottenPoints = true
      } else {
        this.gameState.blurLength = 0
      }
    })
  }
}
