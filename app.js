var express = require('express'),
routes = require('./routes');

var app = module.exports = express.createServer(),
port = process.env.PORT || 5000;

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/relay:id', routes.relay);

app.listen(port);
console.log("Listening on port %d in %s mode", app.address().port, app.settings.env);

