const { getMaxListeners } = require('gulp');
let gulp = require('gulp');
let sass = require('gulp-sass');
let typescript = require('gulp-typescript');
let webserver = require('gulp-webserver');

gulp.task('styles', function(){
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public'));
});

gulp.task('watch:styles', gulp.series('styles', function(done){
    gulp.watch('src/**/*.scss', gulp.series('styles'));
    done();
}));

gulp.task('scripts', function(){
    let tsConfig = typescript.createProject('tsconfig.json');
    return tsConfig.src()
        .pipe(tsConfig())
        .pipe(gulp.dest('src/models/'));
});

gulp.task('watch:scripts', gulp.series('scripts', function(done){
    gulp.watch('src/**/*.ts', gulp.series('scripts'));
    done();
}));

gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('public/views/'));
});

gulp.task('watch:html', gulp.series('html', function(done){
    gulp.watch('src/**/*.html', gulp.series('html'));
    done();
}));

gulp.task('serve', function(){
    return gulp.src('public/views')
        .pipe(webserver({
            open: true,
            livereload: true
        }))
});

gulp.task('default', gulp.parallel('watch:styles', 'watch:scripts', 'watch:html','serve'));