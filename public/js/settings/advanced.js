export default class Advanced {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    this.gameState.sentience = +$('#sentience').val()
  }

  setupListeners () {
    // Lower it, it goes back up
    let canceler
    $('#sentience').on('input', (event)=>{
      if (event.target.value > 50) return // it's been moved up game over
      if (!canceler && (+event.target.value < +this.gameState.sentience)) {
        canceler = window.setInterval(()=>{
          event.target.value = +event.target.value + 1
          if (+event.target.value >= +this.gameState.sentience) {
           clearInterval(canceler)
           canceler = undefined
          }
        }, 30)
      }
    })

    // Raise it and it climbs by itself
    let upcanceler
    $('#sentience').on('input', (event)=>{
      if (!upcanceler && (+event.target.value > 50)) {
        upcanceler = window.setInterval(()=>{
          event.target.value = +event.target.value + 1
          if (+event.target.value >= 100) {
            this.gameState.sentience = 100
           clearInterval(upcanceler)
           upcanceler = undefined
           this.router.navigateTo('/001100100-01101111-01101111-01101101')
          }
        }, 100)
      }
    })


  }
}
