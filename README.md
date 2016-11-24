# JS-FETCH
Simple load library JS from CDN and reture global varibale.

## Install
`npm install js-fetch -S`

## Usage
Example using in React, Vue,...
```
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
- Return Promise with global `varibale` ex `google` such as above.
- Just one load fist CDN if it loaded.