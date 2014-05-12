var cp = require("child_process");

module.exports = function(grunt){
    grunt.registerTask('start-server', function(){
        var done = this.async();
        var p = cp.fork('./tests/dummyServer.js');

        p.on('exit', function(){
            console.log('server exited');
        });

        setTimeout(done, 500);
    });
};