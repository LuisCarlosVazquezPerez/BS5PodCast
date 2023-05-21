const { src, dest, watch, series } = require('gulp');

//COMPILAR CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//IMAGENES
const imagemin = require('gulp-imagemin');

function css(done) {
    src('src/scss/app.scss')//IDENTIFICAR EL ARCHIVO PRINCIPAL
        .pipe(sass()) //COMPILAR SASS
        .pipe(dest('build/css')) //EXPORTARLO O GUARDARLO

    done();
}

function cssbuild(done) {
    src('build/css/app.css')
    .pipe(rename({
        suffix: '.min'
    }) )

    .pipe(purgecss({
        content: ['index.html']
    }))

    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'))
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);
