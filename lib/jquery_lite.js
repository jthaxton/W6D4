/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(els) {\n    this.els = els;\n  }\n\n  html(str) {\n    if(str === undefined) {\n      return this.els[0].innerHTML;\n    } else {\n      for (let i = 0; i < this.els.length; i++) {\n        this.els[i].innerHTML = str;\n      }\n    }\n  }\n\n  empty() {\n    this.html('');\n  }\n\n  append(arg) {\n    this.els.forEach(thisEl => {\n      if (arg instanceof DOMNodeCollection) {\n        arg.els.forEach(otherEl => {\n          thisEl.innerHTML += otherEl.outerHTML;\n        });\n      } else if (arg instanceof HTMLElement) {\n        thisEl.innerHTML += arg.outerHTML;\n      } else if (typeof arg === 'string') {\n        thisEl.innerHTML += arg;\n      }\n    });\n  }\n\n  attr(attribute, value) {\n    if(value === undefined) {\n      return this.els[0].getAttribute(attribute);\n    } else {\n      this.els.forEach ((el) => {\n        el.setAttribute(attribute, value);\n      });\n    }\n  }\n\n  addClass (name) {\n    this.els.forEach ((el) => {\n      el.classList.add(name);\n    });\n  }\n\n  removeClass(name) {\n    this.els.forEach ((el) => {\n      el.classList.remove(name);\n    });\n  }\n\n  children () {\n    let results = [];\n    this.els.forEach ((el) =>{\n      results = results.concat(Array.from(el.children));\n    });\n    return new DOMNodeCollection(results);\n  }\n\n  parent() {\n    const parents = [];\n    this.els.forEach(el => {\n      if (!parents.includes(el.parentElement)) parents.push(el.parentElement);\n    });\n    return new DOMNodeCollection(parents);\n  }\n\n  find(selector) {\n    let results = [];\n    this.els.forEach(el => {\n      results = results.concat(Array.from(el.querySelectorAll(selector)));\n    });\n    return new DOMNodeCollection(results);\n  }\n\n  remove() {\n    this.els.forEach (el => {\n      el.parentElement.removeChild(el);\n    });\n    this.els = [];\n  }\n\n  on(e, cb) {\n    this.els.forEach (el => {\n      el.addEventListener(e,cb);\n      if(el.events === undefined) el.events = {};\n      if(el.events[e] === undefined) el.events[e] = [];\n      el.events[e].push(cb);\n    });\n  }\n\n  off(e) {\n    this.els.forEach (el => {\n      if(el.events !== undefined && el.events[e] !== undefined) {\n        el.events[e].forEach (cb => el.removeEventListener(e,cb));\n      }\n    });\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nconst readyCallbacks = [];\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  readyCallbacks.forEach(cb => cb());\n});\n\nwindow.$l = function(arg) {\n  if(typeof arg === \"string\") {\n    return new DOMNodeCollection(Array.from(document.querySelectorAll(arg)));\n  } else if (arg instanceof HTMLElement) {\n    return new DOMNodeCollection([arg]);\n  } else if (typeof arg === 'function') {\n    if (['complete', 'interactive'].includes(document.readyState)) {\n      arg();\n    } else {\n      readyCallbacks.push(arg);\n    }\n  }\n};\n\nwindow.$l.extend = function(...objects) {\n  let merged = objects.shift();\n  objects.forEach (obj => {\n    Object.keys(obj).forEach (key => merged[key] = obj[key]);\n  });\n  return merged;\n};\n\n// options is pojo\nwindow.$l.ajax = function(options) {\n  const xhr = new XMLHttpRequest();\n\n  xhr.open(options.type, options.url);\n  xhr.onload = function () {\n    if (xhr.status < 500 && xhr.status >= 400) {\n      options.error(JSON.parse(xhr.response));\n    } else {\n      options.success(JSON.parse(xhr.response));\n    }\n  };\n  xhr.send(options.data);\n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });