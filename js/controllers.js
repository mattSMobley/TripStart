angular.module("app")
  .controller('MainController', ['Search', MainController])
  .controller('ResultController', ['$http', ResultController]);

function MainController() {
  var vm = this;
  vm.searchTerm = '';
  vm.submitForm = function(Search) {
    vm.searchTerm = Search;
  }

  vm.title = "Angular Template"
}

function ResultController($http) {
  var vm = this;
  vm.searchTerm = '';
  vm.panoCity;
  // return $http({
  //   method: 'jsonp',
  //   url: 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=10&minx=-180&miny=-90&maxx=180&maxy=90&size=medium&mapfilter=true'
  // }).then(function successCallback(data) {
  //   console.log(data);
  //   panoCity = data;
  // }, function errorCallback(data) {
  //   console.log('fart');
  // });
  
  vm.submitForm = function(Search) {
    vm.searchTerm = Search;
  }
}
