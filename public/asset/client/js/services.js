denseApp.factory('utf8', function() {
    return window.utf8;
});

denseApp.factory('JSONKit', function() {
    return window.JSONKit;
});

denseApp.factory('restAPI', ['$resource', function($resource) {
    return {
        user: $resource('/api/user/:action')
    }
}]);

denseApp.factory('toast', ['$log', 'JSONKit', function($log, JSONKit) {
    var toast   = {};

    angular.forEach(['info', 'error', 'success', 'warning'], function (method) {
        toast[method] = function (message, title) {
            var log     = $log[method] || $log.log,
                title   = JSONKit.toStr(title),
                message = angular.isObject(message) ? angular.toJson(message) : JSONKit.toStr(message);;

            log(message, title);

            toastr[method](message, title);
        };
    });

    toastr.options = angular.extend({
        positionClass: 'toast-bottom-full-width'
    }, toast.options);

    toast.clear = toastr.clear;

    return toast;
}]);
