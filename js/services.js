angular.module("app")
  .service("search", [search])
  .service("getCoordinates", [getCoordinates])
  .service("getFlights", [getFlights])
  .service("userSaves", ['$http', savesCatalog])
  // .service("signInService", ['$http', signInService])
  // .service("skyscannerWidgets", [skyscannerWidgets])

    function search(){
    var search = this;

    search.query = '';

    }

    function getCoordinates(){

    }
    function getFlights(){

    }

    function savesCatalog($http) {
      this.getSaves = getSaves;

      // this.editBooks = editBooks;

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

    // function signinService ($http){
    //   return function(playerObject) {
    //     return $http.post('https://localhost:3000/signin', playerObject);
    //   };
    // }
