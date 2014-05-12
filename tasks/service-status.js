module.exports = function(grunt){
    var request = require('request-sync');

    var buildUrl = function(baseUrl, monitorName){
        return baseUrl + '/' + monitorName;
    };

    var verify = function(url){
        grunt.verbose.writeln('Making request: ' + url);
        var res = request(url);
        if(res.statusCode !== 200){
            grunt.warn('status code was: ' + res.statusCode);
        }

        var body = JSON.parse(res.body);

        var status = (body.status || body.Status || "").toLowerCase();
        var monitorName = (body.monitorname || body.MonitorName);

        if(!status || status === 'failed'){
            grunt.log.error(monitorName + ': ' + status + ' (' + body.response + ')');
            grunt.fail.fatal('failed service-status check: ' + JSON.stringify(body));
        }
        grunt.log.ok(monitorName + ': ' + status + ' (' + body.response + ')');
    };

    var warmUp = function(options, callback){
        var res = {};

        var url = buildUrl(options.baseUrl, (options.monitors[0].monitorname || options.monitors[0]));

        try{
            grunt.verbose.writeln('[WarmUp] Making request: ' + url);
            res = request();
        }
        catch(err){
            grunt.verbose.writeln('[WarmUp]' + JSON.stringify(err));
        }

        if(res.statusCode){
            grunt.verbose.writeln('[WarmUp] statusCode: ' + res.statusCode);
        }

        if(res.body){
            grunt.verbose.writeln('[WarmUp] ' + res.body);
        }

        setTimeout(callback, options.waitAfterWarmUp);
    };

    var execute = function(options, done){

        options.monitors.forEach(function(m){
            verify(buildUrl(options.baseUrl, m.monitorname || m));
        });

        done();
    };

    grunt.registerMultiTask('service-status', function(){
        var done = this.async();
        var options = this.options({
            baseUrl: 'http://127.0.0.1/service-status/',
            monitors: [],
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