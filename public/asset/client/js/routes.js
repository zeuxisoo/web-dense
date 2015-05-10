denseApp.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'template/partial/home.html',
                controller : 'HomeController',
            })
            .when('/signin', {
                templateUrl: 'template/partial/signin.html',
                controller : 'SignInController',
            })
            .otherwise({
                redirectTo : '/'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
