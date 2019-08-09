(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.jsFetch = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var deepObjectWindow = function deepObjectWindow(pathString) {
    return pathString && eval("window.".concat(pathString));
  };

  var urls = [];

  var jsFetch = function jsFetch(url, waitVar) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;
    return new Promise(function (resolve, reject) {
      if (typeof document !== 'undefined') {
        if (!urls.includes(url)) {
          var el = document.createElement('script');
          el.src = url;

          if (_typeof(attributes) === 'object' && !Array.isArray(attributes)) {
            for (var i in attributes) {
              el[i] = attributes[i];
            }
          }

          el.onerror = el.onload = function (err) {
            if (err && err.type === 'error') {
              el.remove();
              reject(err);
            }

            resolve(deepObjectWindow(waitVar));
          };

          document.body.appendChild(el);
          urls.push(url);
        } else {
          var waitVarValue = deepObjectWindow(waitVar);

          if (waitVarValue) {
            var timerInterval = setInterval(function () {
              if (waitVarValue) {
                clearInterval(timerInterval);
                resolve(waitVarValue);
              }
            }, 500);
            setTimeout(function () {
              clearInterval(timerInterval);
              reject('Cannot found variable ' + waitVar);
            }, timeout);
          } else {
            resolve();
          }
        }
      } else {
        reject(new Error('This package is not use during SSR.'));
      }
    });
  };

  return jsFetch;

}));
