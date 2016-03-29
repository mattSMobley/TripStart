angular.module("app")
  .controller('MainController', ['search', MainController])
  .controller('ResultController', ['search', 'weatherService', 'airbnbService', '$http', ResultController])
  .controller('UserController', ['userSaves', 'search', '$http', UserController]);

function MainController(search, weather) {
  var main = this;
  main.search = search;
  main.weather = weather;
  main.setData = function() {
    main.search.setData();
    window.location = '#/result';
  }

  //AUTOCOMPLETE
  jQuery(function() {
    jQuery("#mainSearch").autocomplete({
      source: function(request, response) {
        jQuery.getJSON(
          "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
          function(data) {
            response(data);
          }
        );
      },
      minLength: 3,
      select: function(event, ui) {
        var selectedObj = ui.item;
        jQuery("#mainSearch").val(selectedObj.value);
        getcitydetails(selectedObj.value);
        return false;
      },
      open: function() {
        jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
      },
      close: function() {
        jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
      }
    });
    jQuery("#mainSearch").autocomplete("option", "delay", 100);
  });
  //END AUTOCOMPLETE

  //GET CITY DETAILS
  function getcitydetails(fqcn) {
    if (typeof fqcn == "undefined") fqcn = jQuery("#f_elem_city").val();
    cityfqcn = fqcn;
    if (cityfqcn) {
      jQuery.getJSON(
        "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn=" + cityfqcn,
        function(data) {
          var cityData = data;
          main.search.formData = {
            city: cityData.geobytescity,
            country: cityData.geobytescountry,
            currency: cityData.geobytescurrency,
            latitude: cityData.geobyteslatitude,
            longitude: cityData.geobyteslongitude,
            countrypopulation: cityData.geobytespopulation,
            timezone: cityData.geobytestimezone,
            region: cityData.geobytesregion
          }

        }
      );
    }
  }


}



function ResultController(search, weatherService, airbnbService, $http) {
  var result = this;
  result.search = search;
  result.weather = weatherService;
  result.airbnb = airbnbService;


  //BEGIN PANORAMIO

  // if (result.search.formData.country = "United States" || "USA" || "U.S.A."){
  //   var myRequest = {
  //     'tag': result.search.formData.city + '+' + result.search.formData.region
  //     };
  //     console.log(myRequest);
  // } else {
  //   var myRequest = {
  //     'tag': result.search.formData.city + '+' + result.search.formData.country
  //   };
  //   console.log(myRequest);
  // }

  var myRequest = {
    'tag': result.search.formData.city
  }


  var myOptions = {
    'width': 650,
    'height': 400,
    'columns': 3,
    'rows': 2,
    'croppedPhotos': panoramio.Cropping.TO_FILL
  }

  var photoset = new panoramio.PhotoWidget('photoset', myRequest, myOptions);
  photoset.setPosition(0);
  //END PANORAMIO


  //AIRBNB
  var getAirbnb = result.airbnb.getListings(result.search.formData.city, result.search.formData.country)
    .then(function(data) {
      result.listings = data;
    })
    //END AIRBNB

  //WEATHER
  var getWeather = result.weather.getCurrentWeather(result.search.formData.city)
    .then(function(response) {

    })


  result.weatherForecast = {
    // day1: {
    //   min: '',
    //   max: '',
    //   rain: '',
    //   // icon: '',
    //   sunrise: '',
    //   sunset: ''
    // }
  }
  var getForecast = result.weather.getForecastWeather(result.search.formData.city)
    .then(function(response){
      console.log(result.weather.forecast[0].day);
      result.weatherForecast.day1 = {
        min: result.weather.forecast[0].day.mintemp_f,
        max: result.weather.forecast[0].day.maxtemp_f,
        rain: result.weather.forecast[0].day.totalprecip_in,
        icon: result.weather.forecast[0].day.condition.icon,
        sunrise: result.weather.forecast[0].astro.sunrise,
        sunset: result.weather.forecast[0].astro.sunset
      };
      result.weatherForecast.day2 = {
        min: result.weather.forecast[1].day.mintemp_f,
        max: result.weather.forecast[1].day.maxtemp_f,
        rain: result.weather.forecast[1].day.totalprecip_in,
        icon: result.weather.forecast[1].day.condition.icon,
        sunrise: result.weather.forecast[1].astro.sunrise,
        sunset: result.weather.forecast[1].astro.sunset
      };
      result.weatherForecast.day3 = {
        min: result.weather.forecast[2].day.mintemp_f,
        max: result.weather.forecast[2].day.maxtemp_f,
        rain: result.weather.forecast[2].day.totalprecip_in,
        icon: result.weather.forecast[2].day.condition.icon,
        sunrise: result.weather.forecast[2].astro.sunrise,
        sunset: result.weather.forecast[2].astro.sunset
      };
      result.weatherForecast.day4 = {
        min: result.weather.forecast[3].day.mintemp_f,
        max: result.weather.forecast[3].day.maxtemp_f,
        rain: result.weather.forecast[3].day.totalprecip_in,
        icon: result.weather.forecast[3].day.condition.icon,
        sunrise: result.weather.forecast[3].astro.sunrise,
        sunset: result.weather.forecast[3].astro.sunset
      };
      result.weatherForecast.day5 = {
        min: result.weather.forecast[4].day.mintemp_f,
        max: result.weather.forecast[4].day.maxtemp_f,
        rain: result.weather.forecast[4].day.totalprecip_in,
        icon: result.weather.forecast[4].day.condition.icon,
        sunrise: result.weather.forecast[4].astro.sunrise,
        sunset: result.weather.forecast[4].astro.sunset
      };

      console.log(result.weatherForecast.day1.icon)
    });
  //Comes in as array of 7 objects 0-6, each one with 'astro' property that holds sunrise and sunset, 'day' property that has highs and lows

  //END WEATHER

  result.latParsed = parseFloat(result.search.formData.latitude);
  result.lonParsed = parseFloat(result.search.formData.longitude);

  //GOOGLE MAPS

  var centerLatlng = new google.maps.LatLng(result.latParsed, result.lonParsed);

  var mapStyles = [{
    "featureType": "all",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "poi.attraction",
    "elementType": "labels",
    "stylers": [{
      "visibility": "on"
    }]
  }];

  var satelliteOptions = {
      zoom: 18,
      center: new google.maps.LatLng(result.latParsed, result.lonParsed),
      mapTypeId: google.maps.MapTypeId.HYBRID,
      heading: 90,
      tilt: 45
    }
    // result.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  result.map2 = new google.maps.Map(document.getElementById('satellite'), satelliteOptions);
  result.map2.setTilt(45);


  var currentCity = new google.maps.LatLng(result.latParsed, result.lonParsed);



  map = new google.maps.Map(document.getElementById('map'), {
    center: currentCity,
    zoom: 12
  });

  var request = {
    location: currentCity,
    radius: 10000,
    type: ['point_of_interest']
  };
  console.log(request);

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
  var icon = new google.maps.MarkerImage("http://www.google.com/mapfiles/marker.png", null, null, new google.maps.Point(41, 47));

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: icon
    });
    infoWindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'mouseover', function() {
      infoWindow.setContent(place.name + '<br/>' + place.vicinity + '<br/><img src="' + place.icon + '">');
      infoWindow.open(map, this);
    });
  }

  //END PLACES SERVICE

  function rotate90() {
    var heading = map.getHeading() || 0;
    map.setHeading(heading + 90);
  }

  function autoRotate() {
    // Determine if we're showing aerial imagery.
    if (map.getTilt() !== 0) {
      window.setInterval(rotate90, 3000);
    }
  }
  //END GOOGLE MAPS


  //BEGIN POI CHECK - RETURNS FIREHYDRANTS AND JENNY CRAIG STORES
  // var getPoi = result.poi.getPoi(result.search.formData.latitude, result.search.formData.longitude)
  //   .then(function(response){
  //     console.log(response);
  //   })
  //END POI

}

//END RESULTCONTROLLER


//BEGIN USERCONTROLLER
function UserController(userSaves, search) {
  var user = this;

  user.saves = [];
  user.city = '';
  user.country = '';

  var getSaves = userSaves.getSaves()
    .then(function(data) {
      user.saves = data;

    })

  user.setData = function() {
    user.search.setData();
    window.location = '#/result';
    console.log(user.search.formData);
  }

}

//END USERCONTROLLER
