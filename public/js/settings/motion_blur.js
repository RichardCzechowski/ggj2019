export default class MotionBlur {
  constructor (gameState, router) {
    this.gameState = gameState
    this.router = router
    this.setupListeners()
    this.gottenPoints = false
  }

  setupListeners () {
    var $box = $('.box'),
    inter = 30,
    speed = 0;

    let moveBox = (e) => {
      let that = this
      $box.each(function(index, val) {
       TweenLite.to($(this), that.gameState.blurLength, { css: { left: e.pageX - 5, top: e.pageY - 5},delay:0+(index/750)});
      });
    }

    $(window).on('mousemove', moveBox);

    $box.each(function(index, val) {
        index = index + 1;
        TweenMax.set(
          $(this),{
            autoAlpha: 1 - (0.0333 * index),
            delay:0
          });
      });
      TweenMax.set(
        $('.text:nth-child(30)'), {
          autoAlpha: 1.5,
          delay: 0
        }
      );
  }
}
