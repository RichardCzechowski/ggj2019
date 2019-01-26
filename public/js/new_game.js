export default class NewGame {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    $('#easy').on('click', ()=>{
      this.gameState.difficulty = 1
      this.router.navigateTo('');
    })
    $('#medium').on('click', ()=>{
      this.gameState.difficulty = 2
      this.router.navigateTo('');
    })
    $('#hard').on('click', ()=>{
      this.gameState.difficulty = 3
      this.router.navigateTo('');
    })
  }

}
