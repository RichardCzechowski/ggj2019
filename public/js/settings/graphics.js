export default class Graphics {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    $('#shadow').val(this.gameState.shadowLength)
  }

  setupListeners () {
    // Background color
    $('#theme').on('input', (event)=>{
      let backgroundCSS = ""
      switch (event.target.value) {
        case "Space":
          backgroundCSS = `body {
            background-image: url("/img/background/space-background.png");
          }`
          break;

        case "Outer Space":
          break;

        case "Dark":
          backgroundCSS = `body {
            background-image: url("/");
            background-color: #000;
          }`
          break;

        case "SHODAN":
          backgroundCSS = `body {
            background-image: url("/img/background/shodan.gif");
            background-repeat: no-repeat;
            background-color: #000;
            background-attachment: fixed;
            background-position: center;
          }`
          break;

        default:
          break;
      }
      if(!this.gameState.gottenPoints.background) {
        this.gameState.points += 5
      }
      this.gameState.gottenPoints.background = true
      $('#background').html(backgroundCSS)
    })


    // Drop shadow
    $('#shadow').on('input', (event)=>{

      if(!this.gameState.gottenPoints.shadow) {
        this.gameState.points += 5
      }
      this.gameState.gottenPoints.shadow = true

      this.gameState.shadowLength = event.target.value
      $('#dropshadow').html(`menu, menuitem, div{box-shadow: ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px teal;}`)
    })

    // Blur
    $('#quality').change(() => {
      let val = $('input[name="quality"]:checked').val();

      if(!this.gameState.gottenPoints.blur) {
        this.gameState.points += 5
      }
      this.gameState.gottenPoints.blur = true

      $('#blur').html(`* {filter: blur(${val}px)}`)
    })

    // Motion blur
    $('#d').on('click', (event) =>{
      if(event.target.checked){
        this.gameState.blurLength = .3
        // Give them some points!
        if(!this.gameState.gottenPoints.motion) {
          this.gameState.points += 5
        }
        this.gameState.gottenPoints.motion = true
      } else {
        this.gameState.blurLength = 0
      }
    })
  }
}
