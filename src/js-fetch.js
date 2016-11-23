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
        if (window[waitVar]) {
          resolve(window[waitVar]);
        } {
          reject(new Error('Cannot find ' + window[waitVar]));
        }
      }
    } else {
      reject(new Error('Cannot run in environment SSR!'));
    }
  });
}
