export default {
  getLocationByZip(zip) {
    return fetch(`https://api.zippopotam.us/us/${zip}`)
      .then(res => res.json())
  }
}