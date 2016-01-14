var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var typescript = require('gulp-typescript');
var tsc = require('typescript');
var tools = require('aurelia-tools');
var through2 = require('through2');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var merge = require('merge2');
var rename = require('gulp-rename');

var tsName = paths.packageName + '.ts';
var tsProjectES6 = typescript.createProject('./tsconfig.json', { typescript: tsc });
var tsProjectAMD = typescript.createProject('./tsconfig.json', { typescript: tsc, module: 'amd' });
var tsProjectCJS = typescript.createProject('./tsconfig.json', { typescript: tsc, module: 'commonjs' });
var tsProjectSystem = typescript.createProject('./tsconfig.json', { typescript: tsc, module: 'system' });

function buildFromTs(tsProject, outputPath, compileTo5) {
    var src = paths.dtsSrc.concat(paths.source);
    if (compileTo5) {
        return gulp.src(src)
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))    
        .pipe(changed(outputPath, {extension: '.js'}))
        .pipe(typescript(tsProject))
        .pipe(to5())
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(outputPath));
    } else {
        return gulp.src(src)
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))    
        .pipe(changed(outputPath, {extension: '.js'}))
        .pipe(typescript(tsProject))  
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(outputPath));
    }
}

gulp.task('build-index', function(){
  var importsToAdd = [];

  return gulp.src(paths.source)
    .pipe(tools.sortFiles('.ts'))
    .pipe(through2.obj(function(file, enc, callback) {
      file.contents = new Buffer(tools.extractImports(file.contents.toString("utf8"), importsToAdd));
      this.push(file);
      return callback();
    }))
    .pipe(concat(tsName))
    .pipe(insert.transform(function(contents) {
      return tools.createImportBlock(importsToAdd) + contents;
    }))
    .pipe(gulp.dest(paths.output + 'temp'));
});

gulp.task('build-index-definition', function() {
  var src = paths.dtsSrc.concat(paths.output + 'temp/' + tsName);
  
  return gulp.src(src)
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))    
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(typescript(tsProjectES6))
    .pipe(to5(assign({}, compilerOptions, {modules:'common'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output + 'temp'));
})

gulp.task('build-html-ts', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'ts'));
});

gulp.task('build-ts', ['build-html-ts'], function() {
    return gulp.src(paths.source)
    .pipe(gulp.dest(paths.output + 'ts'));
});

gulp.task('build-html-es6', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'es6'));
});

gulp.task('build-es6', ['build-html-es6'], function () {
    return buildFromTs(tsProjectES6, paths.output + 'es6', false);
});

gulp.task('build-html-commonjs', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'commonjs'));
});

gulp.task('build-commonjs', ['build-html-commonjs'], function () {
    return buildFromTs(tsProjectCJS, paths.output + 'commonjs', true);
});

gulp.task('build-html-amd', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'amd'));
});

gulp.task('build-amd', ['build-html-amd'], function () {
    return buildFromTs(tsProjectAMD, paths.output + 'amd', true);
});

gulp.task('build-html-system', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build-system', ['build-html-system'], function () {
    return buildFromTs(tsProjectSystem, paths.output + 'system', true);
});

gulp.task('move-dts', function(){
  return gulp.src(paths.output + 'temp/' + paths.packageName + '.d.ts')
      .pipe(rename(paths.packageName + '.d.ts'))
      .pipe(gulp.dest(paths.output + 'es6'))
      .pipe(gulp.dest(paths.output + 'commonjs'))
      .pipe(gulp.dest(paths.output + 'amd'))
      .pipe(gulp.dest(paths.output + 'system'));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    'build-index',
    'build-index-definition',
    ['build-ts', 'build-es6', 'build-commonjs', 'build-amd', 'build-system'],
    'move-dts',
    callback
  );
});
