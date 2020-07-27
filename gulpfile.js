const gulp = require('gulp')
const yaml = require('gulp-yaml')

gulp.task('build-yaml', () => {
    return gulp
        .src('./config.yaml')
        .pipe(yaml({ space: 2 }))
        .pipe(gulp.dest('./dest/'))
})
