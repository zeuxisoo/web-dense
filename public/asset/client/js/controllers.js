denseApp.controller(
    'HomeController',
    [
        'app', '$scope',
        function(app, $scope) {

        }
    ]
);

denseApp.controller(
    'SignInController',
    [
        'app', '$scope',
        function(app, $scope) {

        }
    ]
);

denseApp.controller(
    'SignUpController',
    [
        'app', '$scope',
        function(app, $scope) {
            $scope.user = {
                username              : '',
                email                 : '',
                password              : '',
                password_confirmation : ''
            };

            $scope.checkName = function (scope, model) {
                return app.filter('checkName')(model.$value);
            };

            $scope.checkMin = function (scope, model) {
                return app.filter('length')(model.$value) >= 6;
            };

            $scope.checkMax = function (scope, model) {
                return app.filter('length')(model.$value) <= 18;
            };

            $scope.submit = function() {
                var user = $scope.user;

                if (app.validate($scope)) {
                    app.restAPI.user.save({
                        action: 'signup'
                    }, {
                        username              : user.username,
                        email                 : user.email,
                        password              : user.password,
                        password_confirmation : user.password_confirmation
                    }, function(http) {
                        var user = http.data;

                        app.rootScope.global.user = user;
                        app.checkUser();
                        $scope.$destroy();
                        app.location.path('/');
                    }, function(http) {
                        var response = http.data,
                            message  = response.data.message;

                        app.toast.error(message);
                    });
                }
            }
        }
    ]
);

denseApp.controller(
    'TopicController',
    [
        'app', '$scope',
        function(app, $scope) {

        }
    ]
);
