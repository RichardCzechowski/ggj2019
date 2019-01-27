export default class MainMenu {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {
    if (this.gameState.points) {
      this.quitJump()
    }

    $(".quit").on("click", ()=>{
      console.log(this.gameState.difficulty)
      switch (this.gameState.difficulty) {
        case 1:
          this.quitAlert()
          break;

        case 2:
          this.quitAlert()
          break;

        case 3:
          // this also gets quitJump
          this.quitAlert()
          break;

        default:
          console.log('difficulty not set')
          break;
      }
    })
  }

  quitAlert (){
    let quitMsgs = [
      "Are you sure you want to leave?",
      "Are you absolutely sure?",
      "Click Cancel to quit your quitting",
      "You haven't really started playing...",
      "But you just got here.",
      "I'm lonely. Play with me.",
      "Click Cancel to quit your quitting",
      "Click Ok to Stay",
      "Whyyyyyyyyyyyy",
      "Okay, you can leave",
      "Are you a quitter?",
      "Quitting is for quitters",
      "2legit2quit",
      "You'll miss out on all I have in STORE for you"
    ]
    this.recursiveConfirm(quitMsgs)
  }

  quitJump () {
    $(".quit").on("mouseenter", (event)=>{

      // Reset to origin
      event.target.style.left  = '0px'
      event.target.style.top  = '0px'
      event.target.style.position = 'relative'

      // Randomize position
      let randomHorz = 100 * Math.random()
      let randomVert = 100 * Math.random()
      randomHorz = Math.random() >= .5 ? randomHorz : randomHorz * -1
      randomVert = Math.random() >= .5 ? randomVert : randomVert * -1
      event.target.style.left  = `${parseInt(event.target.style.left) + randomHorz}px`
      event.target.style.top  = `${parseInt(event.target.style.left) + randomVert}px`
    })
  }

  recursiveConfirm (messageArr) {
    let msg = messageArr.splice(Math.floor(Math.random()*messageArr.length), 1)[0]
    if (msg && confirm(msg)) {
      // remove a point each time.
      this.gameState.points = this.gameState.points ? this.gameState.points -= 1 : this.gameState.points
      this.recursiveConfirm(messageArr)
    }
  }

}
