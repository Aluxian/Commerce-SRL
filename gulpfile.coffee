gulp = require 'gulp'
mergeStream = require 'merge-stream'
$ = require('gulp-load-plugins')()
live = false

gulp.task 'live', ->
  live = true

gulp.task 'html', ->
  move_app = gulp.src 'app/views/**/*.html'
    .pipe gulp.dest 'public/'

  move_index = gulp.src 'app/index.html'
    .pipe gulp.dest 'public/'

  mergeStream move_app, move_index

gulp.task 'sass', ->
  gulp.src 'assets/styles/**/app.sass'
    .pipe $.sass({
      indentedSyntax: true
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets/'
        'bower_components/bootstrap-social/'
        'bower_components/font-awesome/scss/'
      ]
    }).on 'error', $.sass.logError
    .pipe $.autoprefixer()
    .pipe $.if live, $.cssmin()
    .pipe gulp.dest 'public/'

gulp.task 'images', ->
  gulp.src 'assets/images/**'
    .pipe gulp.dest 'public/images/'

gulp.task 'copy', ->
  js = gulp.src [
    'bower_components/modernizr/modernizr.js'
  ]
    .pipe $.if live, $.uglify()
    .pipe gulp.dest 'public/'

  fonts = gulp.src [
    'bower_components/font-awesome/fonts/**.*'
  ]
    .pipe gulp.dest 'public/fonts/'

  favicons = gulp.src [
    'assets/images/favicons/**'
  ]
    .pipe gulp.dest 'public/'

  mergeStream js, fonts, favicons

gulp.task 'css-vendor', ->
  gulp.src [
    'bower_components/angular-chart.js/dist/angular-chart.css'
    'bower_components/fakeloader/fakeLoader.css'
  ]
    .pipe $.concat 'vendor.css'
    .pipe $.if live, $.cssmin()
    .pipe gulp.dest 'public/'

gulp.task 'js-vendor', ->
  gulp.src [
    'bower_components/jquery/dist/jquery.js'
    'bower_components/Chart.js/Chart.js'
    'bower_components/underscore/underscore.js'
    'bower_components/angular/angular.js'
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/firebase/firebase.js'
    'bower_components/angularfire/dist/angularfire.js'
    'bower_components/angular-bootstrap/ui-bootstrap.js'
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    'bower_components/angular-chart.js/angular-chart.js'
    'bower_components/fakeloader/fakeLoader.js'
  ]
    .pipe $.concat 'vendor.js'
    .pipe $.if live, $.uglify()
    .pipe gulp.dest 'public/'

gulp.task 'js-app', ->
  gulp.src 'app/**/*.js'
    .pipe $.concat 'app.js'
    .pipe $.if live, $.uglify()
    .pipe gulp.dest 'public/'

gulp.task 'build', ['html', 'sass', 'images', 'copy', 'css-vendor', 'js-vendor', 'js-app']
gulp.task 'watch', ['build'], ->
  gulp.watch 'app/views/**/*.html', ['html']
  gulp.watch 'app/index.html', ['html']
  gulp.watch 'assets/styles/**/*.sass', ['sass']
  gulp.watch 'assets/images/**', ['images']
  gulp.watch 'app/**/*.js', ['js-app']
  gulp.watch 'gulpfile.js', ['build']

gulp.task 'default', ['watch']
