var http = require("http"),
    fs = require("fs"),
    serviceStatus = {
        'success': {
            'my-test-monitor': '{ "status": "Ok", "monitorname": "my-test-monitor", "response": 200, "time": 1234 }',
            'my-test-monitor-2': '{ "status": "Ok", "monitorname": "my-test-monitor-2", "response": 200, "time": 1234 }'
        },
        'warmUp': {
            'my-test-monitor': '{ "status": "Ok", "monitorname": "my-test-monitor", "response": 200, "time": 1234 }',
            'my-test-monitor-2': '{ "status": "Failed", "monitorname": "my-test-monitor-2", "response": 502, "time": 1234 }'
        },
        'case-sensitive': {
            'my-test-monitor': '{ "Status": "OK", "MonitorName": "my-test-monitor", "response": 200, "time": 1234 }',
            'my-test-monitor-2': '{ "Status": "Ok", "monitorname": "my-test-monitor-2", "response": 200, "time": 1234 }'
        }
    };

var warmUpCalled = false;

var server = http.createServer(function(request, response) {

    if(request.url === '/kill'){
        response.end();
        process.exit(0);
    }

    var bits = request.url.split('/');
    var result = serviceStatus[bits[1]][bits[2]];

    if(bits[1] === 'warmUp' && !warmUpCalled){
        warmUpCalled = true;
    }
    else if(bits[1] === 'warmUp'){
        result = serviceStatus.success[bits[2]];
    }

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(result);
    response.end();
}).listen(8888);
