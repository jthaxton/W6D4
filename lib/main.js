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

// options is pojo
window.$l.ajax = function(options) {
  const xhr = new XMLHttpRequest();

  xhr.open(options.type, options.url);
  xhr.onload = function () {
    if (xhr.status < 500 && xhr.status >= 400) {
      options.error(JSON.parse(xhr.response));
    } else {
      options.success(JSON.parse(xhr.response));
    }
  };
  xhr.send(options.data);
};
