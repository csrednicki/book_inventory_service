var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (stockRepository) {
    var routes = require('./routes')(stockRepository);
    var utils = require('./utils');
    var app = express();
    
    app.use(utils.logRequest);
    app.use(utils.auth);
    app.use(bodyParser.json());

    // GET
    app.get('/', routes.hello);
    app.get('/error', routes.error);
    app.get('/stock', routes.getStock);
    app.get('/stock/:isbn', routes.find);
    
    // POST
    app.post('/stock', routes.stockUp);

    app.use(utils.clientError);
    app.use(utils.serverError);
    
    return app;
    
};
