var denseApp = angular.module('denseApp', [
    'ngRoute',
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
    'app', '$filter', '$rootScope',
    function(app, $filter, $rootScope) {
        app.filter = $filter;

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
