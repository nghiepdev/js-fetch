# JS-FETCH
Simple load library JS from CDN and return global varibale.

## Install
`npm install js-fetch -S`

## Usage
Example using in React, Vue,...
```javascript
import jsFetch from 'js-fetch';
jsFetch('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'google').then(google => {
  new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}).catch(err => {
  throw err;
});
```

## Features
- Just one load fist CDN if it loaded.
- Support global varibale

## License
MIT © [Nghiệp](http://nghiepit.pro)