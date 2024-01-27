const {src,dest, series, watch} = require('gulp');


//CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const plumber= require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');//*esta dependencia es para encontrar archivos 
const cssnano = require('cssnano'); //*Optimiza el proyecto


//IMAGENES
const imagemin = require('gulp-imagemin');
const webp= require('gulp-webp')
const avif= require('gulp-avif')


function css(done){

    //compilar sass
/**Pasos: 1 -identificar archivo, 2 - compilar, 3 - guardar el .css*/

 src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber()) 
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()])) 
        .pipe(sourcemaps.write())
        .pipe(dest('build/css'))

        
    done()
    
     //!npm i gulp-sourcemaps
    //!npm i -D gulp-plumber
    //!npm i --save-dev cssnano
    //!npm i --save-dev autoprefixer gulp-postcss
}




function imagenes(){

 return   src('src/img/**/*')
          .pipe(imagemin({optimizationLevel: 3}))
          .pipe( dest('build/img'));

    //!instalar dependencia npm i --save-dev gulp-imagemin
    //*npm install --save-dev gulp-imagemin@7.1.0 (version anterior)
}


function formatoWebp(){

    const opciones={
        quality: 50
    }

    return src('src/img/**/*.{jpg,png}')
    .pipe(webp(opciones))
    .pipe( dest('build/img'));


    //!npm install --save-dev gulp-webp@4.0.1 (version anterior)

}


function formatoAvif(){

    const opciones={
        quality: 50
    }

    return src('src/img/**/*.{jpg,png}')
    .pipe(avif(opciones))
    .pipe( dest('build/img'));


    //!npm i gulp-avif
}


function dev(){
    watch('src/scss/**/*.scss',css) //escucha por todos los archivos con extension .scss
    watch('src/img/**/*', imagenes) //escucha por las imagenes
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.formatoWebp = formatoWebp;
exports.formatoAvif = formatoAvif;


exports.default = series( imagenes, formatoWebp,formatoAvif,css,dev);
   