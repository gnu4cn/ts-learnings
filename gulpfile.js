var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

let paths = {
    pages: ["src/*.html"]
};

gulp.task("copy-html", ()=>{
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"))
});

gulp.task('tsc', () => {
    return gulp.src('src/*.ts')
                          .pipe(tsProject())
                          .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch('src/*ts', ['tsc']);
});

gulp.task('default', gulp.series('copy-html', 'tsc', 'tsc'));
