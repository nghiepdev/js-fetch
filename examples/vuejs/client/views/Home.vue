<template>
  <div class="page">
    <div ref="map" style="width: 100%; height: 400px"></div>
    <counter></counter>
    <p>
      To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
</template>

<script>
import Counter from 'components/Counter'
import jsFetch from 'js-fetch'

export default {
  components: {
    Counter
  },

  mounted() {
    jsFetch('//maps.googleapis.com/maps/api/js?key=AIzaSyAyWnfCUjOWe6kaZzw5ZGp8Ys6UB_qjvw8', 'google').then(google => {
      new google.maps.Map(this.$refs.map, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }).catch(err => {
      throw err;
    });
  }
}
</script>
