# grunt-service-status
[![Build Status](https://travis-ci.org/andyroyle/grunt-service-status.png?branch=master)](https://travis-ci.org/andyroyle/grunt-service-status) [![NPM version](https://badge.fury.io/js/grunt-service-status.png)](http://badge.fury.io/js/grunt-service-status) ![Dependencies](https://david-dm.org/andyroyle/grunt-service-status.png)

Verify the service-status monitor

installation:

```npm install --save grunt-service-status```

usage:

```
grunt.initConfig({
  'service-status':{
    'myservice': {
        options: {
          url: 'http://my.service.com/service-status'
          warmUp: true,
          waitAfterWarmUp: 2000
        }
    }
  }
});
