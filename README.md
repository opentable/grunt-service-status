# grunt-service-status
[![Build Status](https://travis-ci.org/opentable/grunt-service-status.png?branch=master)](https://travis-ci.org/opentable/grunt-service-status) [![NPM version](https://badge.fury.io/js/grunt-service-status.png)](http://badge.fury.io/js/grunt-service-status) ![Dependencies](https://david-dm.org/opentable/grunt-service-status.png)

Verify the service-status monitor

installation:

```npm install --save grunt-service-status```

usage:

```
grunt.initConfig({
  'service-status':{
    'myservice': {
      options: {
        baseUrl: 'http://my.service.com/service-status',
        monitors: ['my-test-monitor', 'my-test-monitor-2'],
        warmUps: 2,
        waitAfterWarmUp: 2000
      }
    },
    'myservice-alt': {
      options: {
        baseUrl: 'http://my.service.com/service-status',
        monitors: [
          { monitorname: 'my-test-monitor'   },
          { monitorname: 'my-test-monitor-2' }
        ]
      }
    }
  }
});

options:

`baseUrl`: the service-status root url
`monitors`: either a list of monitor names to hit, or a list of objects with a monitorname property
`warmUps`: the number of times to hit the root url before starting the verify step (default 0)
`waitAfterWarmUp`: number of milliseconds to wait after the warm-ups (default 0)
