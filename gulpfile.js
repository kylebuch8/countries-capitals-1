var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var ghpages = require('gulp-gh-pages');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');

gulp.task('sass', function () {
    gulp.src('app/assets/sass/**/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('app/assets/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init(["app/assets/css/*.css", 'app/**/*.js','app/**/*.html'], {
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('imagemin', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('images/build'));
});

var files = ['app/assets/**/*',
            'app/countries-list/*',
            'app/country-detail/*',
            'app/home/*',
            'app/bower_components/angular/angular.min.js',
            'app/bower_components/angular-route/angular-route.min.js',
            'app/bower_components/angular-animate/angular-animate.min.js',
            'app/index.html',
            'app/app.js',
            'app/countries.js'
            ];

gulp.task('build', function() {
    return gulp.src(files,{base:'./app'})
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['build'],function() {
    return gulp.src('./build/**/*').pipe(ghpages());
});

gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("app/assets/sass/*/*.scss", ['sass']);
});