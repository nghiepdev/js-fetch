const deepObjectWindow = pathString => eval(`window.${pathString}`);

const urls = [];

const jsFetch = (url, waitVar, attributes = {}, timeout = 15000) => {
  return new Promise((resolve, reject) => {
    if (typeof document !== 'undefined') {
      if (!urls.includes(url)) {
        const el = document.createElement('script');
        el.src = url;

        if (typeof attributes === 'object' && !Array.isArray(attributes)) {
          for (const i in attributes) {
            el[i] = attributes[i];
          }
        }

        el.onerror = el.onload = err => {
          if (err && err.type === 'error') {
            el.remove();
            reject(err);
          }

          resolve(deepObjectWindow(waitVar));
        };

        document.body.appendChild(el);
        urls.push(url);
      } else {
        waitVarValue = deepObjectWindow(waitVar);

        if (waitVarValue) {
          const timerInterval = setInterval(() => {
            if (waitVarValue) {
              clearInterval(timerInterval);
              resolve(waitVarValue);
            }
          }, 500);

          setTimeout(() => {
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

export default jsFetch;
