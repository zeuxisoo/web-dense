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
