var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

var pre_src = "src/";
var pre_dist = "dist/";
var paths = {
    scripts: pre_src + 'js',
    libs: pre_src + 'lib',
    images: pre_src + 'img',
    css: pre_src + 'css',
};

var js_map = {
    "lib/lib.js" : [
        pre_src + "lib/codemirror/lib/codemirror.js",
        pre_src + "lib/codemirror/addon/mode/overlay.js",
        pre_src + "lib/marked.js",
        pre_src + "lib/highlight.min.js",
        pre_src + "lib/MathJax.js",
        pre_src + "lib/base64.min.js",
        pre_src + "lib/rawdeflate.js",
        pre_src + "lib/rawinflate.js"
    ],
    "js/flymarkdown.js" :[
        pre_src + "js/codemirror/mode/markdown/markdown.js",
        pre_src + "js/codemirror/mode/gfm/gfm.js",
        pre_src + "js/codemirror/mode/javascript/javascript.js",
        pre_src + "js/codemirror/mode/xml/xml.js",
        pre_src + "js/flymarkdown.js"
    ]
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    //del(['dist'], cb);
    return '';
});


gulp.task('scripts', function() {
    // Minify and copy all JavaScript (except vendor scripts)
    //zip lib   
    for (var key in js_map){
        gulp.src(js_map[key])
        .pipe(uglify())
        .pipe(concat(key))
        .pipe(gulp.dest(pre_dist));
    }

    gulp.src("src/js/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js/"));
});

// HTML replace URL
gulp.task('html', function() {
    gulp.src(pre_src+'**/*.html')
    .pipe(usemin({
        css: [minifyCss(),'concat'],
        html : [minifyHtml({empty:true})],
        js: [uglify(),rev()],
        js1: [uglify(),rev()]
    }))     
    .pipe(gulp.dest(pre_dist));
});

// Copy all static images
gulp.task('images', function() {
    return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('iconfont', function() {
    return gulp.src(pre_src+'iconfont.*')
    .pipe(gulp.dest('dist'));
});


gulp.task('mathjax',function(){
    //mathjax fix
    gulp.src("src/lib/mathjax/**/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/lib/mathjax/"));

    gulp.src("src/lib/mathjax/font/**/*")
    .pipe(gulp.dest("dist/lib/mathjax/font/"));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    console.log('haha');
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'html', 'images']);
