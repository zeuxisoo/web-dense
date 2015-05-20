var elixir = require('laravel-elixir'),
    gulp   = require('gulp'),
    clean  = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');

// Custom task
gulp.task('clean', function () {
    return gulp.src([
        'public/asset',
        'public/template'
    ])
    .pipe(clean({ force: true }));
});

gulp.task('moveSiteAsset', function() {
    return gulp.src('public/template/asset/**/*').pipe(gulp.dest('public/asset'));
});

gulp.task('removeSiteAsset', function() {
    return gulp.src('public/template/asset').pipe(clean({ force: true }));
});

// Elixir config
elixir.config.sourcemaps = false;

// Custom powerful elixir task
elixir.extend("siteIndex", function() {
    gulp.task('siteIndex', function() {
        return gulp
            .src('resources/assets/template/index.html')
            .pipe(usemin({
                path: 'resources/assets',
                css: [cssmin({ noAdvanced: 0, keepSpecialComments: 0 })],
                js : [uglify()]
            }))
            .pipe(gulp.dest('public/template'))
    });

    this.registerWatcher('siteIndex', "resources/assets/template/index.html");

    return this.queueTask('siteIndex');
});

elixir.extend("sitePartial", function() {
    gulp.task('sitePartial', function() {
        return gulp.src('resources/assets/template/partial/**/*').pipe(gulp.dest('public/template/partial'));
    });

    this.registerWatcher('sitePartial', "resources/assets/template/partial/**/*");

    return this.queueTask('sitePartial');
});

elixir(function(mix) {
    mix
        .task('clean')
        .styles([
            'vendor/foundation/css/normalize.css',
            'vendor/foundation/css/foundation.min.css',
            'vendor/font-awesome/css/font-awesome.min.css',
            'vendor/toastr/toastr.min.css',
            'client/css/application.css'
        ], 'public/asset/css/application.css', 'resources/assets/asset')
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
        ], 'public/asset/js/application.js', 'resources/assets/asset')
        .copy(
            'resources/assets/asset/vendor/font-awesome/fonts',
            'public/asset/fonts'
        )
        .copy(
            'resources/assets/asset/client/img',
            'public/asset/img'
        )
        .sitePartial()
        .siteIndex()
        .task('moveSiteAsset')
        .task('removeSiteAsset')
});
