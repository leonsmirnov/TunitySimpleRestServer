
var express = require('express');
var app = express();
var port = 3000;
var reqRouter = require('./routes/clientRequest');

app.use('/', reqRouter);

app.listen(port, function(){
    console.log('Listening on port ' + port);
});