var http = require("http"),
    fs = require("fs"),
    server = {},
    serviceStatus = {
        '/success': '[{ "status": "Ok", "monitorname": "my-test-monitor", "response": 200, "time": 1234 }, { "status": "Ok", "monitorname": "my-test-monitor-2", "response": 200, "time": 1234 }]',
        '/warmUp': '[{ "status": "Ok", "monitorname": "my-test-monitor", "response": 200, "time": 1234 }, { "status": "Failed", "monitorname": "my-test-monitor-2", "response": 502, "time": 1234 }]',
        '/case-sensitive': '[{ "Status": "OK", "monitorname": "my-test-monitor", "response": 200, "time": 1234 }, { "Status": "Ok", "monitorname": "my-test-monitor-2", "response": 502, "time": 1234 }]'
    };

var warmUpCalled = false;

module.exports = function(grunt){
    grunt.registerTask('start-server', function(){
        server = http.createServer(function(request, response) {
            var result = serviceStatus[request.url];

            if(request.url === '/warmUp' && !warmUpCalled){
                warmUpCalled = true;
            }
            else if(request.url === '/warmUp'){
                result = serviceStatus['/success'];
            }

            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(result);
            response.end();
        }).listen(8888);
    });
};