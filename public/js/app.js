window.addEventListener('load', () => {
  const el = $('#app');

  // Define new pages here
  let menu = {
    mainMenu: {
      newGame: {},
      saveGame: {},
      loadGame: {},
      store: {},
      settings: {},
      quit: {}
    }
  }
  let gameState = {
    saveDisabled: "disabled",
    loadDisabled: "disabled"
  }

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

  const showMessage = (message) => {
    const html = errorTemplate({ color: 'red', title, message });
    el.html(html);
  };

  const load = (file) =>{
    $.get(file, function (data) {
        var html=Handlebars.compile(data);
        el.html(html(gameState));
        return data
    }, 'html')
  }

  router.add('/', async () => {
    load('/html/main_menu.html')
  });

  router.add('/new-game', async () => {
    load('/html/new_game.html')
  });

  router.add('/save-game', async () => {
    load('/html/save_game.html')
  });

  router.add('/load-game', async () => {
    load('/html/load_game.html')
  });

  router.add('/store', async () => {
    load('/html/store.html')
  });

  router.add('/settings', async () => {
    load('/html/settings.html')
  });

  router.add('/quit', async () => {
    load('/html/quit_game.html')
  });

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
