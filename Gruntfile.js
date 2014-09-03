module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                'tests/**/*.js'
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
                        'my-test-monitor',
                        'my-test-monitor-2'
                    ]
                }
            },
            'warmUp': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/warmUp',
                    monitors:[
                        'my-test-monitor',
                        'my-test-monitor-2'
                    ],
                    warmUps: 3
                }
            },
            'warmUp-with-alternate-url': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/warmUp',
                    warmUpUrl: 'http://127.0.0.1:8888/altWarmUp',
                    monitors:[
                        'my-test-monitor',
                        'my-test-monitor-2'
                    ],
                    warmUps: 1
                }
            },
            'warmUp-with-wait': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/warmUp',
                    monitors:[
                        'my-test-monitor',
                        'my-test-monitor-2'
                    ],
                    warmUps: 1,
                    waitAfterWarmUp: 1000
                }
            },
            'case-sensitive': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/case-sensitive',
                    monitors:[
                        'my-test-monitor',
                        'my-test-monitor-2'
                    ]
                }
            },
            'monitor-object': {
                options: {
                    baseUrl: 'http://127.0.0.1:8888/success',
                    monitors:[
                        { monitorname: 'my-test-monitor'   },
                        { monitorname: 'my-test-monitor-2' }
                    ]
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
