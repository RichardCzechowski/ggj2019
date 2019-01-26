export default class Graphics {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    this.gottenPoints = false
  }

  setupListeners () {
    $('#shadow').on('input', (event)=>{
      console.log(event.target, event.target.value)
      $('#dropshadow').html(`menu, menuitem{box-shadow: ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px teal;}`)
    })

    $('#d').on('click', (event) =>{
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
