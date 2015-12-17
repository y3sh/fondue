var http = require("http");
var https = require("https");
var bodyParser = require('body-parser');
var express = require('express');
var util = require('./util/util');
var app = express();
var crossOriginMiddleware = require("./middleware/crossOriginMiddleware");

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(crossOriginMiddleware);

http.createServer(app).listen(9000, function () {
  console.log('Express server listening on port ' + 9000);
}) && https.createServer({
  cert: util.getLocalCert(),
  key: util.getLocalKey()
}, app).listen(9001, function () {
  console.log('Express server listening on port ' + 9001);
});

require("./routes/api")(app);