denseApp.filter('checkName', ['JSONKit', function(JSONKit) {
    return function (text) {
        var pattern = /^[(\u4e00-\u9fa5)a-zA-Z0-9_]{1,}$/,
            text = JSONKit.toStr(text);

        return pattern.test(text);
    };
}]);

denseApp.filter('length', ['utf8', 'JSONKit', function(utf8, JSONKit) {
    return function (text) {
        var text = JSONKit.toStr(text);

        return utf8.stringToBytes(text).length;
    };
}]);

denseApp.filter('nl2br', function() {
    return function(message, is_xhtml) {
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var message  = (message + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');

        return message;
    }
});
