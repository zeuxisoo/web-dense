denseApp.directive('denseTooltip', ['$timeout', function($timeout) {
    return {
        require: '?ngModel',
        link: function (scope, element, attr, ctrl) {
            /* Attr :
             *      attr.denseTooltip -> dense-tooltip
             * HTML :
             *      <input type="text" name="username" dense-tooltip="validateTooltip" />
             * Value:
             *      File  : application.js
             *      Option:
             *          $rootScope.validateTooltip = {
             *              validate: true,
             *          };
             */
            var option = scope.$eval(attr.denseTooltip) || {};

            function ucfirst(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function updateTooltips(invalid) {
                ctrl.validate = option.validate;
                if (ctrl.validate) {
                    // console.log(ctrl.$name, ' -> ', invalid, ' -> ', ctrl.$error);

                    for(key in ctrl.$error) {
                        var errorMessage = attr['error' + ucfirst(key)],
                            message      = '';

                        if (errorMessage) {
                            message = errorMessage;
                            break;
                        }
                    }

                    renderTooltips(invalid, message);
                }else{
                    renderTooltips(false);
                }
            }

            function renderTooltips(show, message) {
                if (show) {
                    if (element.hasClass('error') === false) {
                        element.addClass('error');
                        element.parent().parent().append('<small class="error">' + message + '</small>');
                    }

                    // If error existsing and showing, just update error text only
                    if (message != element.parent().parent().find("small.error").text()) {
                        element.parent().parent().find('small.error').text(message);
                    }
                }else{
                    element.removeClass('error');
                    element.parent().parent().find('small.error').remove();
                }
            }

            if (option.validate) {
                scope.$on('denseTooltipValidate', function (event, collect) {
                    if (ctrl) {
                        if (angular.isArray(collect)) {
                            collect.push(ctrl);
                        }
                        updateTooltips(ctrl.$invalid);
                    }
                });
            }
        }
    }
}]);

denseApp.directive('loadMore', ['app', '$routeParams', function(app, $routeParams) {
    return {
        restrict   : 'E',
        templateUrl: 'template/partial/directive/load-more.html',
        controller : function($scope, $element, $attrs) {
            $scope.nextPage = function() {
                var currentPage = $attrs.currentPage,
                    totalPage   = $attrs.totalPage,
                    action      = $attrs.action;

                var parameters = {
                    'action' : action,
                    'page'   : parseInt(currentPage) + 1,
                };

                if (action === 'search') {
                    parameters['keyword'] = $routeParams.keyword;
                }

                if (currentPage < totalPage) {
                    app.restAPI.topic.get(
                        parameters,
                        function(http) {
                            $scope.topics     = $scope.topics.concat(http.data);
                            $scope.pagination = http.meta.pagination;
                        },
                        function(http) {
                            var response = http.data,
                                message  = response.data.message;

                            if (message == null) {
                                message = "Unknown error";
                            }

                            app.toast.error(message);
                        }
                    )
                }else{
                    $element.find("a.button").text("No more topics :(");
                }
            }
        }
    }
}]);
