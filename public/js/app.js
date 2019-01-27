// Scenes controllers
import MainMenu from './main_menu.js'
import NewGame from './new_game.js'
import Controller from './settings/controller.js'
import Audio from './settings/audio.js'
import Graphics from './settings/graphics.js'
import MotionBlur from './settings/motion_blur.js'
import Store from './store.js'
import Advanced from './settings/advanced.js'
import Finale from './finale.js'

window.addEventListener('load', () => {
  const el = $('#app');

  let advancedLink = "/001100100-01101111-01101111-01101101"

  let gameState = {
    boxes: new Array(10).fill(0),
    saveDisabled: "disabled",
    loadDisabled: "disabled",
    advancedLinkIsDisabled: "disabled",
    advancedLink: "",
    points: 0,
    shadowLength: 0,
    gottenPoints: {}
  }

  // Gamestate update once a second
  let previousPoints = undefined
  window.setInterval(()=>{
    // Watch points
    if (gameState.points !== previousPoints) {
      $('#points-container').html(`${gameState.points} credits`)
      previousPoints = gameState.points
    }
  }, 1000)

  // Instantiate api handler
  const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
  });

  const router = new Router({
    mode: 'history',
    page404: (path) => {
      load('/html/404.html')
    },
  });

  // Watch mouse
  let blur = new MotionBlur(gameState, router)

  const showMessage = (message) => {
    const html = errorTemplate({ color: 'red', title, message });
    el.html(html);
  };

  const load = async (file) =>{
    return $.get(file, function (data) {
      var html=Handlebars.compile(data);
      el.html(html(gameState));

      // Adds links based on ID
      $('menuitem').each((index, item)=>{
        $(item).on('click', (e)=>{
          if ($(item).attr('id')){
            router.navigateTo($(item).attr('id'))
          }
        })
      })

      // block clicks from navigating

      $(html).find('a').on('click', (event) => {
        // Block page load
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
      });

      return data
    }, 'html')
  }

  // Main Menu
  router.add('/', async () => {
    load('/html/main_menu.html').then(()=>{
      new MainMenu(gameState, router)
    })
  });

  router.add('/new-game', async () => {
    load('/html/new_game.html').then(()=>{
      new NewGame(gameState, router)
    })
  });

  router.add('/save-game', async () => {
    load('/html/save_game.html')
  });

  router.add('/load-game', async () => {
    load('/html/load_game.html')
  });

  router.add('/store', async () => {
    load('/html/store.html').then(()=>{
      new Store(gameState, router)
    })
  });

  // Settings
  router.add('/settings', async () => {
    load('/html/settings.html')
  });

  // Settings Sub menus
  router.add('/settings-audio', async () => {
    load('/html/settings/audio.html').then(()=>{
      new Audio(gameState, router)
    })
  });

  router.add('/settings-controller', async () => {
    load('/html/settings/controller.html').then(()=>{
      new Controller(gameState, router)
    })
  });
  router.add('/settings-graphics', async () => {
    load('/html/settings/graphics.html').then(()=>{
      new Graphics(gameState, router)
    })
  });
  router.add('/settings-language', async () => {
    load('/html/settings/language.html')
  });
  router.add('/settings-statistics', async () => {
    load('/html/settings/statistics.html')
  });
  router.add('/settings-advanced', async () => {
    load('/html/settings/advanced.html')
  });

  router.add('/settings-001100100-01101111-01101111-01101101', async () => {
    load('/html/settings/advanced.html').then(()=>{
      new Advanced(gameState, router)
    })
  });

  // Final stage
  router.add('/001100100-01101111-01101111-01101101', async () => {
    load('/html/finale.html').then(()=>{
      new Finale(gameState, router)
    })
  });

  // Quit
  router.add('/quit', async () => {
    load('/html/quit_game.html')
  });

  router.addUriListener();
  router.navigateTo(window.location.pathname);

  // Highlight Active Menu on Load
  const link = $(`a[href$='${window.location.pathname}']`);
  link.addClass('active');

  $('a').on('click', (event) => {
    // Block page load
    event.preventDefault();

    // Highlight Active Menu on Click
    const target = $(event.target);
    $('.item').removeClass('active');
    target.addClass('active');

    // Navigate to clicked url
    const href = target.attr('href');
    const path = href.substr(href.lastIndexOf('/'));
    router.navigateTo(path);
  });
});
