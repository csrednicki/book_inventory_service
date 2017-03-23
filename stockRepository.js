var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

var connectionPromise = MongoClient.connect(url, {bufferMaxEntries: 0});
var collectionPromise = connectionPromise.then(function (db) {
    return db.collection('books');
});

module.exports = {
    stockUp: function (isbn, count) {
        return collectionPromise.then(function (collection) {
            return collection.updateOne({isbn: isbn},
                {isbn: isbn, count: count}, {upsert: true});
        })
    },
    findAll: function () {
        return collectionPromise.then(function (collection) {
            return collection.find({}).toArray();
        });
    },
    find: function (params) {
        return collectionPromise.then(function (collection) {
            return collection.find({isbn: params}).limit(1).toArray();
        });
    }
};