angular.module("app")
  .service("userSaves", ['$http', savesCatalog])


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
