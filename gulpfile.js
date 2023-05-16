const { src, dest, watch, series } = require('gulp');

//COMPILAR CSS
const sass = require('gulp-sass')(require('sass'));

//IMAGENES
const imagemin = require('gulp-imagemin');

function css(done) {
    src('src/scss/app.scss')//IDENTIFICAR EL ARCHIVO PRINCIPAL
        .pipe(sass()) //COMPILAR SASS
        .pipe(dest('build/css')) //EXPORTARLO O GUARDARLO

    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe( dest('build/img'))
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series (imagenes, css, dev);
