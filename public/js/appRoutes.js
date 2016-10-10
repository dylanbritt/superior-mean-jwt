// public/js/appRoutes.js

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'UserController',
            controllerAs: 'uc'
        });

    $locationProvider.html5Mode(true);

}]);