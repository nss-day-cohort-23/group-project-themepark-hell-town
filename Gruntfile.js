module.exports = function(grunt){
  grunt.initConfig({
    jshint: {
      files: ['scripts/**/*.js'],
      options: {
        predef: ['document', 'console', 'alert', '$'],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          'css/main.css': 'sass/style.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['scripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass']
      },
      hbs: {
        files: ['templates/**/*.hbs']
      }
    },
    browserify: {
      'dist/bundle.js': ['scripts/main.js'],
      options: {
        transform: ['hbsfy'],
      }
    }
  });
  require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ['jshint', 'sass', 'browserify', 'watch']);
}