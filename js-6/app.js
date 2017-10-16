var API_ENDPOINT_URL = 'https://sunrise-server.herokuapp.com/alumnus?page=1&limit=6';

fetch(API_ENDPOINT_URL)
  .then(function (response) {
    return response.json()
  })
  .then(function (response) {
    console.log(response);
  })