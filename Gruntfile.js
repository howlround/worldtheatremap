/* eslint-disable */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass_globbing: {
      app: {
        files: {
          'client/scss/_base.scss': 'client/scss/base/*.scss',
          'client/scss/_components.scss': 'client/scss/components/*.scss',
          'client/scss/_pages.scss': 'client/scss/pages/*.scss',
          'client/scss/_utilities.scss': 'client/scss/utilities/*.scss',
          'client/scss/_variables.scss': 'client/scss/variables/*.scss',
        }
      }
    },

    sass: {
      app: {
        files: [{
          expand: true,
          cwd: 'client/scss',
          src: ['*.scss'],
          dest: 'client/css',
          ext: '.css',
        }]
      },
      options: {
        sourceMap: true,
        outputStyle: 'nested',
        imagePath: '../',
      }
    },

    watch: {
      sass: {
        files: ['client/scss/**/*'],
        tasks: ['sass_globbing', 'sass']
      },
      options: {
        spawn: false
      }
    }
  });

  // Loads Grunt Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass_globbing', 'sass', 'watch']);
};
