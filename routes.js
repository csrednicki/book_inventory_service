module.exports = function (stockRepository) {

    return {
        hello: function (req, res) {
            res.send('Hello World!');
        },
        error: function (req, res) {
            throw new Error('forced error');
        },
        stockUp: function (req, res, next) {
            var isbn = req.body.isbn;
            var count = req.body.count;

            stockRepository.stockUp(isbn, count).then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count

                });
            }).catch(next);
        },
        getStock: function (req, res, next) {
            stockRepository.findAll().then(function (results) {
                res.json(results);
            }).catch(next);

        },
        find: function (req, res, next) {

            console.log('params', req.params);

            stockRepository.find(parseInt(req.params.isbn)).then(function (results) {

                if (results.length > 0) {
                    res.json(results);
                } else {
                    res.send('Brak rekordow');
                }

            }).catch(next);

        }
    };
};