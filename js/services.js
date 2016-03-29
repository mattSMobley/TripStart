angular.module("app")
  .service("userSaves", ['$http', savesCatalog])
  .service("airbnbService", ['$http', airbnb])
  .service("weatherService", ['$http', weather])
  // .service("poiService", ['$http', poi])

function savesCatalog($http) {
  this.getSaves = getSaves;

  function getSaves() {
    return $http({
      method: 'GET',
      url: 'http://localhost:3000/getSaves'
    }).then(function successCallback(response) {
      var data = response.data;
      console.log(response.data);
      return data;
    }, function errorCallback(response) {
      console.log(response.data);
    })
  }

};

function airbnb($http) {
  this.getListings = getListings;

  function getListings(city, country) {
    return $http({
      method: 'GET',
      url: 'https://api.airbnb.com/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty&location=' + city + '%2C%20' + country
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log('airbnb did not work');
    })
  }
};

function weather($http) {
  var weather = this;
  weather.getCurrentWeather = getCurrentWeather;
  weather.getForecastWeather = getForecastWeather;
  weather.current = {};
  weather.forecast = [];


  function getCurrentWeather(city) {
    return $http({
      method: 'GET',
      url: 'https://api.apixu.com/v1/current.json?key=aca8cb2f939e4464860130320162803&q=' + city
    }).then(function successCallback(response) {
      weather.current = response.data.current;
      console.log(weather.current);
    }, function errorCallback(response) {
      console.log('getCurrentWeather did not work');
    })
  }

  function getForecastWeather(city) {
    return $http({
      method: 'GET',
      url: 'https://api.apixu.com/v1/forecast.json?key=aca8cb2f939e4464860130320162803&days=5&q=' + city
    }).then(function successCallback(response) {
      weather.forecast = response.data.forecast.forecastday;
      console.log(response.data.forecast.forecastday);
    }, function errorCallback(response) {
      console.log('getForecastWeather did not work');
    })
  }
}

// function poi($http) {
//   var poi = this;
//   poi.getPoi = getPoi;
//   poi.points = {};
//
//   function getPoi(lat, lon) {
//     return $http({
//       method: 'GET',
//       url: 'http://api.geonames.org/findNearbyPOIsOSMJSON?lat=' + lat + '&lng=' + lon + '&username=mattsmobley&radius=1'
//     }).then(function successCallback(response) {
//       poi.points = response;
//       console.log(poi.points);
//     }, function errorCallback(response) {
//       console.log('getPOI did not work');
//     })
//   }
//
// }
