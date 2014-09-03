module.exports = function(grunt){
    var request = require('request'),
        async = require('async');

    var buildUrl = function(baseUrl, monitorName){
        return baseUrl + '/' + monitorName;
    };

    var verify = function(url, done){
        grunt.verbose.writeln('Making request: ' + url);
        var res = request({
            url: url,
            headers: {
                'user-agent': 'grunt-service-status'
            }
        }, function(err, res, body){
            if(err){
                done(err);
            }

            if(res.statusCode !== 200){
                grunt.warn('status code was: ' + res.statusCode);
            }

            var result = JSON.parse(body);

            var status = (result.status || result.Status || "").toLowerCase();
            var monitorName = (result.monitorname || result.MonitorName);

            if(!status || status === 'failed'){
                grunt.log.error(monitorName + ': ' + status + ' (' + result.response + ')');
                return done(new Error('failed service-status check: ' + JSON.stringify(result)));
            }

            grunt.log.ok(monitorName + ': ' + status + ' (' + result.response + ')');
            done();
        });
    };

    var warmUp = function(options, done){
        var res = {};

        var url = options.warmUpUrl || options.baseUrl;

        grunt.verbose.writeln('[WarmUp] Making request: ' + url);
        res = request({
            url: url,
            headers: {
                'user-agent': 'grunt-service-status'
            }
        }, function(err, res, body){
            if(err){
                grunt.verbose.writeln('[WarmUp]' + JSON.stringify(err));
            }

            if(res.statusCode){
                grunt.verbose.writeln('[WarmUp] statusCode: ' + res.statusCode);
            }

            if(body){
                grunt.verbose.writeln('[WarmUp] ' + body);
            }

            done();
        });
    };

    var warmUps = function(options, done){
        var ws = [];
        for(var i=0; i<options.warmUps; i++){
            ws.push(warmUp);
        }

        async.eachSeries(ws, function(w, cb){
            w(options, cb);
        }, function(err){
            if(err){
              grunt.fail.fatal(err);
            }

            done();
        });
    };

    var monitors = function(options, done){

        async.eachSeries(options.monitors, function(m, cb){
            verify(buildUrl(options.baseUrl, m.monitorname || m), cb);
        }, function(err){
            if(err){
              grunt.fail.fatal(err);
            }
            done();
        });
    };

    grunt.registerMultiTask('service-status', function(){
        var done = this.async();
        var options = this.options({
            baseUrl: 'http://127.0.0.1/service-status/',
            monitors: [],
            warmUps: 0,
            waitAfterWarmUp: 0
        });

        grunt.verbose.writeflags(options);

        warmUps(options, function(){
            setTimeout(function(){
                monitors(options, done);
            }, options.waitAfterWarmUp);
        });
    });
};
