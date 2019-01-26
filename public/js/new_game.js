export default class NewGame {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    $('#easy').on('click', ()=>{
      this.gameState.difficulty = 1
      this.gameState.points += 1
      this.router.navigateTo('');
    })
    $('#medium').on('click', ()=>{
      this.gameState.difficulty = 2
      this.gameState.points += 5
      this.router.navigateTo('');
    })
    $('#hard').on('click', ()=>{
      this.gameState.difficulty = 3
      this.gameState.points += 10
      this.router.navigateTo('');
    })
  }

}
