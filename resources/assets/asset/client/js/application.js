var denseApp = angular.module('denseApp', [
    'ngRoute',
    'ngResource',
    'ui.validate',
    'angularMoment'
]);

denseApp.constant('app', {
    version: Date.now()
})

denseApp.config([
    '$httpProvider', 'app',
    function($httpProvider, app) {
        // TODO: Error handling
    }
]);

denseApp.run([
    'app', 'restAPI', 'toast', 'failedResponse', '$filter', '$rootScope', '$location',
    function(app, restAPI, toast, failedResponse, $filter, $rootScope, $location) {
        app.restAPI        = restAPI;
        app.toast          = toast;
        app.failedResponse = failedResponse;
        app.filter         = $filter;
        app.rootScope      = $rootScope;
        app.location       = $location;

        // Add more utils to app object like app.each
        angular.extend(app, JSONKit);

        // Define global variable
        var global = $rootScope.global = {
            isSignIn: false
        };

        // Method
        app.checkUser = function () {
            global.isSignIn = !! global.user;
        };

        app.validate = function (scope) {
            var collect = [],
                errors  = [];

            scope.$broadcast('denseTooltipValidate', collect);

            app.each(collect, function (x) {
                if (x.validate && x.$invalid) {
                    errors.push(x);
                }
            });

            if (errors.length === 0) {
                app.validate.errorList = null;
            }else{
                app.validate.errorList = errors;
            }

            return app.validate.errorList === null;
        };

        // Define global options
        $rootScope.validateTooltip = {
            validate: true,
        };

        $rootScope.signout = function() {
            app.restAPI.user.get({
                action: 'signout'
            }, function(http) {
                var response = http.data;

                app.rootScope.global.user = null;
                app.checkUser();
                app.location.path('/');

                app.toast.info(response.message);
            });
        };

        $rootScope.search = function() {
            var search = $rootScope.search;

            app.location.search({
                keyword: search.keyword
            }).path('/search');
        }

        // Extra method
        var bootstrap = function() {
            app.restAPI.user.get({
                action: 'status'
            }, function(http) {
                var user = http.data;

                app.rootScope.global.user = user;
                app.checkUser();
            }, function(http) {
                // If got error is not sign in, do nothing
            });
        }

        bootstrap();
    }
]);

;(function($) {

    $(function() {
        $(document).foundation();
    });

})(jQuery);
