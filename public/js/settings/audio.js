export default class Audio {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
  }

  setupListeners () {

    $('.sfx').on('input', (event)=>{
      if(!this.gameState.gottenPoints.sfx) {
        this.gameState.points += 5
      }
      this.gameState.gottenPoints.sfx = true
      var audioArray = Array.from(document.getElementsByClassName('audio-collection'))
      audioArray = audioArray.concat(new Array(4).fill($('#record')))

      var i = 0;
      audioArray[i].play();
      for (i = 0; i < audioArray.length - 1; ++i) {
        if (audioArray[i] && audioArray[i].addEventListener){
          audioArray[i].addEventListener('ended', function(e){
            var currentSong = e.target;
            var next = $(currentSong).nextAll('audio');
            if (next.length) $(next[0]).trigger('play');
          });

        }
      }
    })

    var audio
    $('.music').on('input', (event)=>{
      if(!this.gameState.gottenPoints.music) {
        this.gameState.points += 5
      }
      this.gameState.gottenPoints.music = true
      audio = audio ? audio : document.getElementById("music")
      if(!event.target.value) return audio.pause()
      audio.play()
    })
  }
}
