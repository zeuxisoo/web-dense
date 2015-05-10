denseApp.config([
    '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'template/partial/home.html',
                controller : 'HomeController',
            })
            .otherwise({
                redirectTo : '/'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
