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
                    baseUrl: 'http://127.0.0.1:8888/success',
                    monitors:[
                        { monitorname: 'my-test-monitor'   },
                        { monitorname: 'my-test-monitor-2' }
                    ]
                }
            },
            'warmUp': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/warmUp',
                    monitors:[
                        { monitorname: 'my-test-monitor'   },
                        { monitorname: 'my-test-monitor-2' }
                    ],
                    warmUp: true
                }
            },
            'warmUp-with-wait': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/warmUp',
                    monitors:[
                        { monitorname: 'my-test-monitor'   },
                        { monitorname: 'my-test-monitor-2' }
                    ],
                    warmUp: true,
                    waitAfterWarmUp: 1000
                }
            },
            'case-sensitive': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/case-sensitive',
                    monitors:[
                        { monitorname: 'my-test-monitor'   },
                        { monitorname: 'my-test-monitor-2' }
                    ],
                    warmUp: false
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('test', ['jshint', 'start-server', 'service-status', 'kill-server']);
    grunt.registerTask('default', ['test']);
    grunt.loadTasks('tasks');
    grunt.loadTasks('tests/tasks');
};