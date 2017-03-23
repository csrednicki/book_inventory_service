//test

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

var connPromise = MongoClient.connect(url);
var collectionPromise = connPromise.then(function (db) {
    return db.collection('books');
});

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

    collectionPromise.then(function (collection) {

        collection.updateOne({
            isbn: isbn
        }, {
            isbn: isbn,
            count: count
        }, {
            upsert: true
        });

    }).then(function () {
        res.json({
            isbn: req.body.isbn,
            count: req.body.count

        });

    });


});

app.get('/stock', function (req, res, next) {
    collectionPromise.then(function (collection) {
        return collection.find({}).toArray();
    }).then(function(results) {
        res.send(results);
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

module.exports = app