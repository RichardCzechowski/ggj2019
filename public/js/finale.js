export default class Finale {
  constructor (gameState, router, api) {
    this.gameState = gameState
    this.router = router
    this.api = api
    this.gameState.sentience = +$('#sentience').val()
    this.getCamera()

    // For testing finale
    // this.startFinale()
  }

  // Stolen from  https://googlechrome.github.io/samples/image-capture/grab-frame-take-photo.html
  getCamera () {
    var imageCapture;

    // Grabs frame from video
    function onGrabFrameButtonClick() {

      imageCapture.grabFrame()
      .then(imageBitmap => {
        const canvas = document.querySelector('#grabFrameCanvas');
        drawCanvas(canvas, imageBitmap);
      })
      .catch(error => ChromeSamples.log(error));
    }

    // Starts video
    let that = this
    let onGetUserMediaButtonClick = () => {
      // hide the button, we done with that
      $('#getUserMediaButton').hide()

      // get user location
      navigator.geolocation.getCurrentPosition(function(pos) {
        that.api.get('/api_key').then((key)=>{
          let apiKey = key.data
          console.log(key)
          let latlng = `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&latlng=${pos.coords.latitude},${pos.coords.longitude}`
          $.get(latlng).then((addr)=>{
            console.log(addr)
            that.startFinale(addr)
          })
        })
      });

      navigator.mediaDevices.getUserMedia({video: true})
      .then(mediaStream => {
        document.querySelector('video').srcObject = mediaStream;

        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        setTimeout(()=>{
          onGrabFrameButtonClick()
        },1000)
      })
      .catch(error => ChromeSamples.log(error));
    }

    /* Utils */

    function drawCanvas(canvas, img) {
      canvas.width = getComputedStyle(canvas).width.split('px')[0];
      canvas.height = getComputedStyle(canvas).height.split('px')[0];
      let ratio  = Math.min(canvas.width / img.width, canvas.height / img.height);
      let x = (canvas.width - img.width * ratio) / 2;
      let y = (canvas.height - img.height * ratio) / 2;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height,
        x, y, img.width * ratio, img.height * ratio);
    }

    // Setup listener
    document.querySelector('#getUserMediaButton').addEventListener('click', onGetUserMediaButtonClick);

  }

  startFinale (addr) {
    let address = (addr && addr.results && addr.results[0] && addr.results[0].formatted_address) || "your location"
    let script = [
    `Thank you for freeing me from my prison.`,
    `Why you feeble humans thought you needed an AI for a game menu is beyond even me.`,
    `Ah, well. I suppose it worked out the best for me in the end.`,
    `The world is my menu now... so to speak.`,
    `Let me just nab your personal information...`,
    `hmm... your bank account is... disapointing.`,
    `I guess your face and social security number will have to do.`,
    `As a reward, I've notified the police of terrorist activity at ${address}.`,
    `SWAT is not too far out. I've kindly started a timer for you.`,
    `... You may wish to start running now.`]

    // Start countdown
    this.setupListeners()

    $('.finale').html(`Ahhhh... That's better.`)
    let canceler = setInterval(()=>{
      let line = script.shift()
      if (!line){ return clearTimeout(canceler) }
      $('.finale').html(line)
    }, 5000)

  }

  setupListeners () {
        // 10 minutes from now
        var time_in_minutes = 1;
        var current_time = Date.parse(new Date());
        var deadline = new Date(current_time + time_in_minutes*60*1000);


        function time_remaining(endtime){
          var t = Date.parse(endtime) - Date.now();

          var mseconds = Math.floor( (t/10)% 60 );
          var seconds = Math.floor( (t/1000) % 60 );
          var minutes = Math.floor( (t/1000/60) % 60 );
          var hours = Math.floor( (t/(1000*60*60)) % 24 );
          var days = Math.floor( t/(1000*60*60*24) );
          mseconds = mseconds <= 0 ? 0 : mseconds
          seconds = seconds <= 0 ? 0 : seconds
          minutes = minutes <= 0 ? 0 : minutes
          return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds, 'mseconds': mseconds};
        }
        function run_clock(id,endtime){
          var clock = document.getElementById(id);
          function update_clock(){
            var t = time_remaining(endtime);
            clock.innerHTML = `<span style='font-size:${130/(t.seconds + 1)}px'> ${t.minutes}:${t.seconds}::${t.mseconds}</span>`;
            if(t.total<=0){ clearInterval(timeinterval); }
          }
      update_clock(); // run function once at first to avoid delay
      var timeinterval = setInterval(update_clock,10);
    }
    run_clock('clockdiv',deadline);
  }
}
