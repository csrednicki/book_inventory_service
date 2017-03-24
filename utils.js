module.exports = {

    logRequest: function(req, res, next) {
        console.log('incoming request at ', new Date());
        next();
    },

    auth: function (req, res, next) {
        console.log('you can pass my auth');
        next();
    },

    clientError: function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    serverError: function (err, req, res, next) {
        var status = err.status || 500;
        res.status(status);
        console.error(err.stack);
        res.send('Oh no: ' + status);
    }

};