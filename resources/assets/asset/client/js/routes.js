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
            .when('/topic/create', {
                templateUrl: 'template/partial/topic/create.html',
                controller : 'TopicCreateController',
            })
            .when('/topic/show/:id', {
                templateUrl: 'template/partial/topic/show.html',
                controller : 'TopicShowController',
            })
            .when('/search', {
                templateUrl: 'template/partial/search.html',
                controller : 'SearchController',
            })
            .otherwise({
                redirectTo : '/'
            });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
