//test

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var stockRepository = require('./stockRepository');

function logRequest(req, res, next) {
    console.log('incoming request at ', new Date());
    next();
}


function auth(req, res, next) {
    console.log('you can pass my auth');
    next();
}

app.use(logRequest);
app.use(auth);
app.use(bodyParser.json());



app.get('/', function (req, res) {
// Use connect method to connect to the server

    res.send('Hello World!');


});

app.get('/error', function (req, res) {
    throw new Error('forced error');
});

app.post('/stock', function (req, res, next) {
    var isbn = req.body.isbn;
    var count = req.body.count;

    stockRepository.stockUp(isbn, count).then(function () {
        res.json({
            isbn: req.body.isbn,
            count: req.body.count

        });
    }).catch(next);


});

app.get('/stock', function (req, res, next) {
    stockRepository.findAll().then(function (results) {
        res.json(results);
    }).catch(next);

});

app.get('/stock/:isbn', function (req, res, next) {
    
    console.log('params', req.params);
    
    stockRepository.find(parseInt(req.params.isbn)).then(function(results) {
        
        if(results.length > 0) {
            res.json(results);
        } else {
            res.send('Brak rekordow');
        }
        
    }).catch(next);
    
});


app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    console.error(err.stack);
    res.send('Oh no: ' + status);
}

module.exports = app;