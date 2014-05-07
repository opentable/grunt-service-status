module.exports = function(grunt){
    var request = require('request');

    var verify = function(serviceStatus){
        for(var i = 0; i < serviceStatus.length; i++){
            var s = serviceStatus[i];
            var status = (s.status || s.Status || "").toLowerCase();

            if(!status || status === 'failed'){
                grunt.log.error(s.monitorname + ': ' + status + ' (' + s.response + ')');
                grunt.fail.fatal('failed service-status check: ' + JSON.stringify(s));
            }
            grunt.log.ok(s.monitorname + ': ' + status + ' (' + s.response + ')');
        }
    };

    var warmUp = function(options, callback){
        request(options.url, function(err, res, body){
            if(err){
                grunt.verbose.writeln('[WarmUp] ' + JSON.stringify(err));
            }
            if(res.statusCode){
                grunt.verbose.writeln('[WarmUp] statusCode: ' + res.statusCode);
            }
            if(body){
                grunt.verbose.writeln('[WarmUp] ' + body);
            }

            setTimeout(callback, options.waitAfterWarmUp);
        });
    };

    var execute = function(options, done){
        request(options.url, function(err, res, body){
            if(err){
                grunt.fail.fatal(err);
            }

            if(res.statusCode !== 200){
                grunt.warn('status code was: ' + res.statusCode);
            }

            verify(JSON.parse(body));

            done();
        });
    };

    grunt.registerMultiTask('service-status', function(){
        var done = this.async();
        var options = this.options({
            warmUp: false,
            waitAfterWarmUp: 0
        });

        grunt.verbose.writeflags(options);

        if(options.warmUp){
            warmUp(options, function(){
                execute(options, done);
            });
        }
        else{
            execute(options, done);
        }
    });
};