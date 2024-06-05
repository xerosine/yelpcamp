mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/dark-v11', // style URL
  center: campground.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup().setHTML(`<h4>${campground.title}</h4><p class="mb-0">${campground.location}</p>`)
    )
    .addTo(map)