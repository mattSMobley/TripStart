angular.module("app")
  .controller('MainController', ['search', MainController])
  .controller('ResultController', ['search','getCoordinates','$http', ResultController])
  .controller('UserController', ['userSaves','search','$http', UserController]);

    function MainController(search) {
    var main = this;
    main.search = search;

    }


    function ResultController(search, $http) {
    var result = this;


    //SKYSCANNER WIDGET LOAD
    skyscanner.load("snippets","2");
    function main(){
        var flights = new skyscanner.snippets.SearchPanelControl();
        flights.setShape("box300x250");
        flights.setCulture("en-GB");
        flights.setCurrency("USD");
        flights.setMarket("US");
        flights.setDeparture("DEN", false);
        flights.setColourScheme("classicbluelight");
        flights.setProduct("flights","1");

        var hotels = new skyscanner.snippets.SearchPanelControl();
        hotels.setShape("box300x250");
        hotels.setCulture("en-GB");
        hotels.setCurrency("USD");
        hotels.setMarket("US");
        hotels.setColourScheme("classicbluelight");
        hotels.setProduct("hotels", "1");


        flights.draw(document.getElementById("flights_search"));
        hotels.draw(document.getElementById("hotels_search"))
    }
    skyscanner.setOnLoadCallback(main);
    //END SKYSCANNER WIDGET

    // PARSING THE SEARCH TEARMS
    result.search = search;
    result.splitting = search.query.split(',');
    console.log('This is result.search: ' + result.search);
    console.log('This is result.splitting: ' + result.splitting);
    result.search.city = result.splitting[0].toString();
    result.search.country = result.splitting[1].toString().replace(' ', '');
    console.log(search.city);
    console.log(search.country);
    //END PARSING
    function getMapUrl (){
    result.mapUrl = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyCd4yYuac4ot0nIp49HE9f_Sxy-tVKrD4I&q=' + result.search.city + '+' + result.search.country;
    return result.mapUrl;
  }
    //PANORAMIO
    var myRequest = {
      'tag': result.search.city
      };

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


  }


  function UserController(userSaves, search) {
    var user = this;
    user.search = search;
    user.saves = [];
    user.term = '';
    user.city = '';
    user.country = '';
    user.bookImage = '';
    user.newdata = {};

    var getSaves = userSaves.getSaves()
      .then(function(data) {
        user.saves = data;

      })

  }
