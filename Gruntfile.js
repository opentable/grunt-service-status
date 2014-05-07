module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        'service-status': {
            'success': {
                options: {
                    url: 'http://127.0.0.1:8888/success'
                }
            },
            'warmUp': {
                options: {
                    url: 'http://127.0.0.1:8888/warmUp',
                    warmUp: true
                }
            },
            'warmUp-with-wait': {
                options: {
                    url: 'http://127.0.0.1:8888/warmUp',
                    warmUp: true,
                    waitAfterWarmUp: 1000
                }
            },
            'case-sensitive': {
                options: {
                    url: 'http://127.0.0.1:8888/case-sensitive',
                    warmUp: false
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint', 'start-server', 'service-status']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};