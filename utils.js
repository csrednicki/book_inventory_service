module.exports = {

    logRequest(req, res, next) {
        console.log('incoming request at ', new Date());
        next();
    },

    auth(req, res, next) {
        console.log('you can pass my auth');
        next();
    },

    clientError(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    },

    serverError(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);
        console.error(err.stack);
        res.send('Oh no: ' + status);
    }

};