'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jsFetch v1.1.2
 * (c) Nghiep<me@nghiepit.pro>
 * MIT License.
 */

(function () {
  var urls = [];

  var jsFetch = function jsFetch(url, waitVar) {
    var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15000;

    return new Promise(function (resolve, reject) {
      if (typeof document !== 'undefined') {
        if (!urls.includes(url)) {
          var el = document.createElement('script');
          el.src = url;

          if ((typeof attributes === 'undefined' ? 'undefined' : _typeof(attributes)) === 'object' && !Array.isArray(attributes)) {
            for (var i in attributes) {
              el[i] = attributes[i];
            }
          }

          el.onerror = el.onload = function (err) {
            if (err && err.type === 'error') {
              el.remove();
              reject(err);
            }
            if (waitVar) {
              resolve(window[waitVar]);
            }
            resolve();
          };

          document.body.appendChild(el);
          urls.push(url);
        } else {
          if (waitVar) {
            var timerInterval = setInterval(function () {
              if (window[waitVar]) {
                clearInterval(timerInterval);
                resolve(window[waitVar]);
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
        reject(new Error('This package is not called during SSR.'));
      }
    });
  };

  if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') {
    module.exports = jsFetch;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return jsFetch;
    });
  } else if (typeof window !== 'undefined') {
    window.jsFetch = jsFetch;
  }
})();
