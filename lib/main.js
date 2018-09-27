const DOMNodeCollection = require('./dom_node_collection');

const readyCallbacks = [];
document.addEventListener("DOMContentLoaded", () => {
  readyCallbacks.forEach(cb => cb());
});

window.$l = function(arg) {
  if(typeof arg === "string") {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));
  } else if (arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (typeof arg === 'function') {
    if (['complete', 'interactive'].includes(document.readyState)) {
      arg();
    } else {
      readyCallbacks.push(arg);
    }
  }
};

window.$l.extend = function(...objects) {
  let merged = objects.shift();
  objects.forEach (obj => {
    Object.keys(obj).forEach (key => merged[key] = obj[key]);
  });
  return merged;
};
