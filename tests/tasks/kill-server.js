var request = require('request-sync');

module.exports = function(grunt){
    grunt.registerTask('kill-server', function(){
        request('http://127.0.0.1:8888/kill', function(){

        });
    });
};
