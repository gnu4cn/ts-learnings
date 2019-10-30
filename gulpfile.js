// https://stackoverflow.com/questions/40823462/how-to-bundle-typescript-files-for-the-browser-user-gulp-and-tsproject
var gulp = require('gulp');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');

gulp.task('clean', () => {
    return gulp
        .src([
            './dist/'
        ], { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task("transpile-ts", () => {
    var tsProject = ts.createProject('tsconfig.json',{
        outFile: "app.js"
    });
    return tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task("copy-html", () => {
    return gulp
        .src(['./src/*.html'])
        .pipe(gulp.dest("./dist/"));
});

// 这里 watch 里必须使用 gulp.series
gulp.task('watch', () => {
    gulp.watch('./src/namespace/*.ts', gulp.series('clean', 'transpile-ts'));
});


// 这里必须要有一个 default 任务
gulp.task('default', gulp.series('clean', 'copy-html', 'transpile-ts', 'watch'));
