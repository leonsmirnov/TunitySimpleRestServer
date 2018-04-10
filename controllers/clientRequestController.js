
var reqMap = new Map();
var prevIp = 'none';
var requestCounter = '0';

// reqMap.set('1.1.1.1', {'prevCount':10 , 'totalCount':10, 'statsCount':10});
// reqMap.set('1.1.1.2', {'prevCount':20 , 'totalCount':20, 'statsCount':20});

// var clientReqPbj = {
//     'prevCount':'0',
//     'totalCount':'0',
//     'statsCount':'0'
// }

exports.prevIpAddr = function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    var currIp = req.ip;
    requestCounter++;

    var currObj = reqMap.get(currIp);
    if(currObj === undefined ){
        currObj = {'prevCount':1 , 'totalCount':0, 'statsCount':0};
    } else {
        currObj.prevCount++;
    }
    reqMap.set(currIp, currObj );
    console.log(currObj);
    var ans = prevIp;
    prevIp = currIp;
    res.send('The IP address of previous client is: ' + ans);
}

exports.getRequestCount = function(req, res){
    var currIp = req.ip;
    var currObj = reqMap.get(currIp);
    if(currObj === undefined ){
        currObj = {'prevCount':0 , 'totalCount':1, 'statsCount':0};
    } else {
        currObj.totalCount++;
    }
    reqMap.set(currIp, currObj );
    console.log(currObj);
    res.send('Number of /prev requests served so far is: ' + requestCounter);
}

exports.serverStats = function(req, res){
    var currIp = req.ip;
    var currObj = reqMap.get(currIp);
    if(currObj === undefined ){
        currObj = {'prevCount':0 , 'totalCount':0, 'statsCount':1};
    } else {
        currObj.statsCount++;
    }
    reqMap.set(currIp, currObj );
    console.log(currObj);

    var ans  ='';
    var keys = reqMap.keys();
    for(var key of reqMap.keys()){
        ans += key + ' ' +  JSON.stringify(reqMap.get(key));
    }
    res.send(ans);
}