export default class MainMenu {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    $("#quit").on("click", ()=>{
      switch (gameState.difficulty) {
        case 1:
        break;

        case 2:
        break;

        case 3:
        break;

        default:
        console.log('difficulty not set')
        break;
      }


    })
  }

}
