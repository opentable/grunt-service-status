var request = require('request');

module.exports = function(grunt){
    grunt.registerTask('kill-server', function(){
        var done = this.async();
        request('http://127.0.0.1:8888/kill', function(err, res, body){
            done();
        });
    });
};
