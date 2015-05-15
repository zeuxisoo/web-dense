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
                username        : '',
                email           : '',
                password        : '',
                confirm_password: ''
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
                        username        : user.username,
                        email           : user.email,
                        password        : user.password,
                        confirm_password: user.confirm_password
                    }, function (data) {
                        console.log(data);
                        // app.rootScope.global.user = data.data;
                        // app.checkUser();
                        // $scope.$destroy();
                        // app.location.path('/home');
                    })
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
