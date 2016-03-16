angular.module("app")
.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/result', {
        templateUrl: 'views/result.html',
      })
      .when('/user', {
        templateUrl: 'views/user.html',
      });

  });
