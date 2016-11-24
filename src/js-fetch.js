import { retry } from 'async';

const urls = [];

export default function(url, waitVar) {
  return new Promise((resolve, reject) => {
    if (typeof document !== 'undefined') {
      if (!urls.includes(url)) {
        const el = document.createElement('script');
        el.async = true;
        el.src = url;
        el.onerror = el.onload = err => {
          if (err && err.type === 'error') {
            el.remove();
            reject(err);
          }
          resolve(window[waitVar]);
        };
        document.body.appendChild(el);
        urls.push(url);
      } else {
        retry({ times: Number.MAX_SAFE_INTEGER }, (callback) => {
          if (window[waitVar]) {
            callback(null, window[waitVar]);
          } else {
            callback(new Error('Cannot found variable ' + waitVar));
          }
        }, (err, result) => {
          err && reject(err);
          resolve(result);
        });
      }
    } else {
      reject(new Error('This package is not called during SSR.'));
    }
  });
}
