export default class Graphics {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    this.gottenPoints = false
    this.gottenPointsFromShadow = false
    this.gottenPointsFromBackground = false
    this.gottenPointsFromBlur = false
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
      if(!this.gottenPointsFromBackground) {
        this.gameState.points += 5
      }
      this.gottenPointsFromBackground = true
      $('#background').html(backgroundCSS)
    })


    // Drop shadow
    $('#shadow').on('input', (event)=>{

      if(!this.gottenPointsFromShadow) {
        this.gameState.points += 5
      }
      this.gottenPointsFromShadow = true

      this.gameState.shadowLength = event.target.value
      $('#dropshadow').html(`menu, menuitem{box-shadow: ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px ${event.target.value / 10}px teal;}`)
    })

    // Blur
    $('#quality').change(() => {
      let val = $('input[name="quality"]:checked').val();

      if(!this.gottenPointsFromBlur) {
        this.gameState.points += 5
      }
      this.gottenPointsFromBlur = true

      $('#blur').html(`* {filter: blur(${val}px)}`)
    })

    // Motion blur
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
