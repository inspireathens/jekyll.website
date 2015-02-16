var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/_site')).listen(3030);