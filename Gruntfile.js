/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jasmine : {
            options : {
                helpers : 'spec/javascripts/helpers/*.js',
                specs : 'spec/javascripts/**/*.spec.js',
                vendor : [
                    'public/javascripts/jquery.js',
                    'public/javascripts/underscore.js',
                    'public/javascripts/backbone.js'
                ]
            },
            selectable : {
                src : ['src/backbone.selectable.js', 'src/backbone.multiselectable.js']
            }
        },

        jshint: {
            options: {
                jshintrc : '.jshintrc'
            },
            selectable : [ 'src/*.js' ]
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jshint', 'jasmine:selectable']);


    // Default task.
    grunt.registerTask('default', ['jshint', 'jasmine:selectable']);

};