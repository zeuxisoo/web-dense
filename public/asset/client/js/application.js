var denseApp = angular.module('denseApp', [
    'ngRoute',
    'ngResource',
    'ui.validate'
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
    'app', 'restAPI', '$filter', '$rootScope',
    function(app, restAPI, $filter, $rootScope) {
        app.restAPI = restAPI;
        app.filter  = $filter;

        // Add more utils to app object like app.each
        angular.extend(app, JSONKit);

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

        $rootScope.validateTooltip = {
            validate: true,
        };
    }
]);

;(function($) {

    $(function() {
        $(document).foundation();
    });

})(jQuery);
