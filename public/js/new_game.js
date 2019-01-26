export default class NewGame {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    let warn = ()=>{
      if (this.gameState.points) {
        return !confirm('Are you sure you want to start a new game? All progress will be lost.')
      } else {
        return false
      }
    }
    $('.easy').on('click', ()=>{
      if (warn()) { return }
        this.gameState.difficulty = 1
        this.gameState.points = 10
        this.router.navigateTo('');
    })
    $('.medium').on('click', ()=>{
      if (warn()) { return }
      this.gameState.difficulty = 2
      this.gameState.points = 5
      this.router.navigateTo('');
    })
    $('.hard').on('click', ()=>{
      if (warn()) { return }
      this.gameState.difficulty = 3
      this.gameState.points = 1
      this.router.navigateTo('');
    })
  }

}
