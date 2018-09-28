const Router = require('./router');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-nav li').forEach (el => {
    el.addEventListener('click', e => {
      window.location.hash = el.innerText.toLowerCase();
    });
  });
  const content = document.querySelector('.content');
  const router = new Router(content);
  router.start();
});
