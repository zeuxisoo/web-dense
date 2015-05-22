denseApp.controller(
    'HomeController',
    [
        'app', '$scope',
        function(app, $scope) {
            $scope.topics = [];

            app.restAPI.topic.get({
                'action': 'latest'
            }, function(http) {
                $scope.topics     = http.data;
                $scope.pagination = http.meta.pagination;
            }, function(http) {
                var response = http.data,
                    message  = response.data.message;

                if (message == null) {
                    message = "Unknown error";
                }

                app.toast.error(message);
            })
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
        'app', '$scope', '$routeParams',
        function(app, $scope, $routeParams) {
            // Fetch and show topic information
            app.restAPI.topic.get({
                'action': 'show',
                'id'    : $routeParams.id
            }, function(http) {
                var topic = http.data;

                $scope.topic = topic;
            }, function(http) {
                var response = http.data,
                    message  = response.data.message;

                app.toast.error(message);
            });

            // Fetch and show comments information
            app.restAPI.comment.get({
                'action'  : 'show',
                'topic_id': $routeParams.id
            }, function(http) {
                var comments = http.data;

                $scope.comments = comments;
            }, function(http) {
                var response = http.data,
                    message  = response.data.message;

                app.toast.error(message);
            });

            // Define variable
            $scope.comment = {
                content : '',
            };

            // Define method
            $scope.submitComment = function() {
                var comment = $scope.comment;

                console.log(comment);

                if (app.validate($scope)) {
                    app.restAPI.comment.save({
                        'action': 'create'
                    }, {
                        topic_id: $routeParams.id,
                        content : comment.content
                    }, function(http) {
                        var comment = http.data;

                        if (comment) {
                            $scope.comments.push(comment);
                            app.toast.info('Comment created');
                            clearCommentArea();
                        }
                    }, function(http) {
                        var response = http.data,
                            message  = response.data.message;

                        app.toast.error(message);
                    });
                }
            }

            // Helper function
            var clearCommentArea = function() {
                $scope.comment.content = "";
            }
        }
    ]
);

denseApp.controller(
    'SearchController',
    [
        'app', '$scope', '$routeParams',
        function(app, $scope, $routeParams) {
            app.restAPI.topic.get({
                'action' : 'search',
                'keyword': $routeParams.keyword
            }, function(http) {
                $scope.keyword    = $routeParams.keyword,
                $scope.topics     = http.data;
                $scope.pagination = http.meta.pagination;
            }, function(http) {
                var response = http.data,
                    message  = response.data.message;

                if (message == null) {
                    message = "Unknown error";
                }

                app.location.search({}).path('/home');
                app.toast.error(message);
            })
        }
    ]
);
