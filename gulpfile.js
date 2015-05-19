var elixir = require('laravel-elixir'),
    gulp   = require('gulp'),
    clean  = require('gulp-clean');

// Custom task
gulp.task('clean', function () {
    return gulp.src([
        'public/asset/*',
    ])
    .pipe(clean({ force: true }));
});

// Elixir
elixir.config.sourcemaps = true;

elixir(function(mix) {
    mix
        .task('clean')
        .styles([
            'vendor/foundation/css/normalize.css',
            'vendor/foundation/css/foundation.min.css',
            'vendor/font-awesome/css/font-awesome.min.css',
            'vendor/toastr/toastr.min.css',
            'client/css/application.css'
        ], 'public/asset/css/application.css', 'resources/assets')
        .scripts([
            'vendor/foundation/js/vendor/modernizr.js',
            'vendor/foundation/js/vendor/jquery.js',
            'vendor/angular/angular.min.js',
            'vendor/angular/angular-route.min.js',
            'vendor/angular/angular-resource.min.js',
            'vendor/angular-ui-utils/validate.js',
            'vendor/foundation/js/foundation.min.js',
            'vendor/foundation/js/foundation/foundation.topbar.js',
            'vendor/toastr/toastr.min.js',
            'vendor/utf8/utf8.js',
            'vendor/jsonkit/jsonkit.js',
            'client/js/application.js',
            'client/js/routes.js',
            'client/js/controllers.js',
            'client/js/filters.js',
            'client/js/services.js',
            'client/js/directives.js'
        ], 'public/asset/js/application.js', 'resources/assets')
        .copy(
            'resources/assets/vendor/font-awesome/fonts',
            'public/asset/fonts'
        )
        .copy(
            'resources/assets/client/img',
            'public/asset/img'
        )
});
