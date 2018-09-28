class Router {
  constructor(node) {
    this.node = node;
  }

  start(){
    this.render();
    window.addEventListener('hashchange', this.render.bind(this));
  }

  render() {
    this.node.innerHTML = '';
    const newNode = document.createElement('p');
    newNode.innerHTML = this.activeRoute();
    this.node.appendChild(newNode);
  }

  activeRoute() {
    return window.location.hash.slice(1);
  }
}

module.exports = Router;
