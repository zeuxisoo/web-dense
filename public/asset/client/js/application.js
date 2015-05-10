var denseApp = angular.module('denseApp', [
    'ngRoute'
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
    'app',
    function(app) {
        // TODO: Thinking
    }
]);

;(function($) {

    $(function() {
        $(document).foundation();
    });

})(jQuery);
