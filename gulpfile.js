'use strict';

var gulp = require('gulp');
var syrup = require('syrup');

syrup.gulp.init(
  gulp,
  {
    compressJs: process.env.NODE_ENV === 'production',
    compressCss: process.env.NODE_ENV === 'production'
  },
  {
    '%TITLE%': 'Hierplane',
    '%API_URL%': 'http://localhost:8080'
  },
  {
    html: 'src/index.html',
    allLess: 'src/**/*.less',
    less: 'src/main.less',
    jsLint: ['src/**/*.js', 'src/**/*.jsx'],
    js: 'src/main.jsx',
    assets: 'src/assets/**/*',
    build: 'dist'
  }
);
