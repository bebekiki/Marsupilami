app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'app/pages/home.html',
            controller: 'homeCtrl'
        })
        .when('/register', {
            templateUrl: 'app/pages/register.html',
            controller: 'registerCtrl'
        })
        .when('/login', {
            templateUrl: 'app/pages/login.html',
            controller: 'loginCtrl'
        })
        .when('/friends', {
            templateUrl: 'app/pages/friends.html',
            controller: 'friendsCtrl'
        })
        .otherwise({redirectTo: '/home'});
        // $locationProvider.html5Mode({ enabled: true, requireBase: false });
});