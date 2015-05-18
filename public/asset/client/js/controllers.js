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
            $scope.user = {
                account  : '',
                password : ''
            };

            $scope.submit = function() {
                var user = $scope.user;

                if (app.validate($scope)) {
                    app.restAPI.user.save({
                        action: 'signin'
                    }, {
                        account  : user.account,
                        password : user.password,
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
    'TopicCreateController',
    [
        'app', '$scope',
        function(app, $scope) {
            if (app.rootScope.global.isSignIn === false) {
                return app.location.search({}).path('/');
            }else{
                $scope.topic = {
                    subject : '',
                    content : '',
                };

                $scope.submit = function() {
                    var topic = $scope.topic;

                    if (app.validate($scope)) {
                        app.restAPI.topic.save({
                            'action': 'create'
                        }, {
                            subject: topic.subject,
                            content: topic.content,
                        }, function(http) {
                            var topic = http.data;

                            $scope.$destroy();
                            app.location.search({}).path('/topic/show/' + topic.id);
                        }, function(http) {
                            var response = http.data,
                                message  = response.data.message;

                            app.toast.error(message);
                        });
                    }
                }
            }
        }
    ]
);

denseApp.controller(
    'TopicShowController',
    [
        'app', '$scope',
        function(app, $scope) {

        }
    ]
);
