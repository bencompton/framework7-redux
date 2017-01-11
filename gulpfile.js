const gulp = require('gulp'),
    path = require('path'),
    clean = require('gulp-clean'),
    tsc = require('gulp-typescript'),
    merge = require('merge2'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', () => {
    return gulp.src(['./dist'], { read: false })
        .pipe(clean());
});  

gulp.task('compile-ts', ['clean'], () => {
    var tsProject = tsc.createProject('tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('dist/')),
        tsResult.js.pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: function (file) {
                var sourceFile = path.join(file.cwd, file.sourceMap.file);
                return "../" + path.relative(path.dirname(sourceFile), __dirname);
            }
        }))
        .pipe(gulp.dest('dist/'))        
    ]);
});

gulp.task('default', ['clean', 'compile-ts'])