module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
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
        imagePath: "../",
      }
    },

    watch: {
      sass: {
        files: ['scss/{,*/}*.{scss,sass}'],
        tasks: ['sass']
      },
      options: {
        spawn: false
      }
    }
  });

  // Loads Grunt Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);
};
