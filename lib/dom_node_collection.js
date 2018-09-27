class DOMNodeCollection {
  constructor(els) {
    this.els = els;
  }

  html(str) {
    if(str === undefined) {
      return this.els[0].innerHTML;
    } else {
      for (let i = 0; i < this.els.length; i++) {
        this.els[i].innerHTML = str;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    this.els.forEach(thisEl => {
      if (arg instanceof DOMNodeCollection) {
        arg.els.forEach(otherEl => {
          thisEl.innerHTML += otherEl.outerHTML;
        });
      } else if (arg instanceof HTMLElement) {
        thisEl.innerHTML += arg.outerHTML;
      } else if (typeof arg === 'string') {
        thisEl.innerHTML += arg;
      }
    });
  }

  attr(attribute, value) {
    if(value === undefined) {
      return this.els[0].getAttribute(attribute);
    } else {
      this.els.forEach ((el) => {
        el.setAttribute(attribute, value);
      });
    }
  }

  addClass (name) {
    this.els.forEach ((el) => {
      el.classList.add(name);
    });
  }

  removeClass(name) {
    this.els.forEach ((el) => {
      el.classList.remove(name);
    });
  }

  children () {
    let results = [];
    this.els.forEach ((el) =>{
      results = results.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(results);
  }

  parent() {
    const parents = [];
    this.els.forEach(el => {
      if (!parents.includes(el.parentElement)) parents.push(el.parentElement);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let results = [];
    this.els.forEach(el => {
      results = results.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(results);
  }

  remove() {
    this.els.forEach (el => {
      el.parentElement.removeChild(el);
    });
    this.els = [];
  }

  on(e, cb) {
    this.els.forEach (el => {
      el.addEventListener(e,cb);
      if(el.events === undefined) el.events = {};
      if(el.events[e] === undefined) el.events[e] = [];
      el.events[e].push(cb);
    });
  }

  off(e) {
    this.els.forEach (el => {
      if(el.events !== undefined && el.events[e] !== undefined) {
        el.events[e].forEach (cb => el.removeEventListener(e,cb));
      }
    });
  }
}

module.exports = DOMNodeCollection;
