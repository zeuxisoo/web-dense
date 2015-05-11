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
            .when('/signup', {
                templateUrl: 'template/partial/signup.html',
                controller : 'SignUpController',
            })
            .otherwise({
                redirectTo : '/'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
