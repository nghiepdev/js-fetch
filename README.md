# JS-FETCH
Simple load external javascript library.

## Features
- Only load once in the project
- Support Promise

## Install
```sh
npm install js-fetch -S
```

## Usage
`jsFetch(CDNPath [, variable = null, [, attributes = {}, [, timeout = 15000]]])`

## Examples
### CDN
```html
<script src="//unpkg.com/js-fetch@1.1.2/dist/js-fetch.min.js"></script>
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
    jsFetch('//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'google').then(google => {
      new google.maps.Map(this.$refs.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }).catch(err => {
      // throw err;
    });
  }
})
```
### In React
```js
import jsFetch from 'js-fetch';

class App extends Component {
  componentDidMount() {
    jsFetch('//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'google').then(google => {
      new google.maps.Map(this.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }).catch(err => {
      // throw err;
    });
  }

  render() {
    return (
      <div className="App">
        <div style={{width:'100%', height: '400px'}} ref={map => { this.map = map; }}></div>
      </div>
    );
  }
}
```

## License
MIT © [Nghiệp](http://nghiepit.pro)