var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var usemin = require('gulp-usemin');
var mainYarnFiles = require('main-yarn-files');
var yaml = require('gulp-yaml');
var insert = require('gulp-insert');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var connect = require('gulp-connect');
var del = require('del');
var argv = require('yargs').argv;
var s3 = require('gulp-s3-upload')({
    useIAM: true
});

gulp.task('clean', function() {
    return del(['dist/*']);
});

gulp.task('build-swagger', function() {
    return gulp.src('./app/api/api.yaml')
        .pipe(yaml())
        // .pipe(replace('localhost:3000', envConfig.apiHost))
        .pipe(insert.prepend('var API = {};API["swagger"] = '))
        .pipe(rename('contract-api.js'))
        .pipe(gulp.dest('./dist/app/'));
})

gulp.task('build-code-js', function() {
    return gulp.src(['./app/**/*.js'])
        // .pipe(sourcemaps.init())
        // .pipe(uglify().on('error', function(err){
        //     console.log(err);
        // }))
        .pipe(concat('contract-web.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('build-asset-js', function() {
    return gulp.src(['./assets/js/*.js'])
        // .pipe(concat(''))
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('build-yarn', function() {
    return gulp.src(mainYarnFiles({
            paths: {
                modulesFolder: "./node_modules"
            }
        }))
        .pipe(gulp.dest('./dist/libs/'))
})

gulp.task('build-js', ['build-yarn', 'build-code-js', 'build-asset-js']);

gulp.task('build-css', function(){
    return gulp.src(['./assets/css/*.css'])
        // .pipe(minifyCss({
        //     keepBreaks: true
        // }))
        .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('build-fonts', function(){
    return gulp.src(['./assets/fonts/*'])
        .pipe(gulp.dest('./dist/assets/fonts/'));
})

gulp.task('build-images', function() {
    return gulp.src(['./assets/images/*.png'])
        .pipe(gulp.dest('./dist/assets/images/'));
})

gulp.task('build-root-html', function(){
    return gulp.src(['./*.html'])
        // .pipe(minifyHtml({
        //     comments: true,
        //     spare: true,
        //     conditionals: true
        // }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-app-html', function(){
   return gulp.src(['./app/**/*.html'])
        // .pipe(minifyHtml({
        //     comments: true,
        //     spare: true,
        //     conditionals: true
        // }))
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('build-html', ['build-root-html', 'build-app-html']);

gulp.task('build', ['build-swagger', 'build-js', 'build-css', 'build-fonts', 'build-images', 'build-html']);

gulp.task('connect', ['build'], function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 5000
    });
});

gulp.task('watch', ['connect'], function() {
    gulp.watch(['./app/**/*.js'], ['build-js']);
    gulp.watch(['./app/**/*.html', './*.html'], ['build-html']);
    gulp.watch(['./assets/css/*.css'], ['build-css']);
    //gulp.watch(['./bower_components/**/*.js'], ['build-bower']);
});

gulp.task('default', ['watch'], function(){

});

gulp.task('deploy', function() {
    gulp.src("./dist/**")
        .pipe(s3({
            Bucket: 'contract-web',
            ACL: 'public-read'
        }, {
            maxRetries: 5
        }))
})
