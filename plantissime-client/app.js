var connect = require('connect');
var serveStatic = require('serve-static');

// Serve up public/ftp folder
var serve = serveStatic(__dirname, {
  'index': ['index.html'],
  'setHeaders': setHeaders
});

// Set header to force download 
function setHeaders(res, path) {
  res.setHeader('Access-Control-Allow-Origin', '*');
}

connect().use(serve).listen(8080);