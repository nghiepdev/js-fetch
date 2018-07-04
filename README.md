# JS-FETCH

Asyncronous JavaScript loader for client such as Google Map API, Twitter widget,...

[![NPM version](https://img.shields.io/npm/v/js-fetch.svg)](https://www.npmjs.com/package/js-fetch)
[![NPM monthly download](https://img.shields.io/npm/dm/js-fetch.svg)](https://www.npmjs.com/package/js-fetch)

## Features

- Just load one times in your project
- Return Promise

## Installation

```sh
yarn add js-fetch
```

## Usage

```
  jsFetch(CDNPath [, variablePath = null [, attributes = {} [, timeout = 15000]]])

  positional arguments:
    CDNPath           url path(ex: https://maps.googleapis.com/maps/api/js)
    variablePath      variable global support path string (ex: 'google', 'google.maps.Map')
    attributes        attributes in script tag (ex: {async: true})
    timeout           timeout for waiting load CDNPath
```

## Examples

### CDN

```html
<script src="//unpkg.com/js-fetch"></script>
<div id="map" style="width: 100%; height: 400px"></div>
```

```js
jsFetch('//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'google', { async: true, id: 'abc' }, 5000).then(function(google) {
  new google.maps.Map(document.querySelector('#map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  });
}).catch(function(err) {
  // throw err;
});
```

---

### In Vue

```js
import jsFetch from 'js-fetch';

Vue.component('my-component', {
  template: `
  <div>
    <div ref="map" style="width: 100%; height: 400px"></div>
  </div>`,
  mounted() {
    jsFetch(
      '//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY',
      'google.maps.Map',
    )
      .then(Map => {
        new Map(this.$refs.map, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
        });
      })
      .catch(err => {
        // throw err;
      });
  },
});
```

### In React

```js
import jsFetch from 'js-fetch';

class App extends Component {
  componentDidMount() {
    jsFetch('//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'google')
      .then(google => {
        new google.maps.Map(this.map, {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8,
        });
      })
      .catch(err => {
        // throw err;
      });
  }

  render() {
    return (
      <div className="App">
        <div
          style={{width: '100%', height: '400px'}}
          ref={map => {
            this.map = map;
          }}
        />
      </div>
    );
  }
}
```

## License

MIT © [Nghiệp](https://nghiepit.pro)
