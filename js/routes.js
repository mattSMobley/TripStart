angular.module("app")
.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController as main'
      })
      .when('/result', {
        templateUrl: 'views/result.html',
        controller: 'ResultController as result'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserController as user'
      });

  });
