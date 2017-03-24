module.exports = function (stockRepository) {

    return {
        hello(req, res) {
            res.send('Hello World!');
        },
        error(req, res) {
            throw new Error('forced error');
        },
        stockUp(req, res, next) {
            var isbn = req.body.isbn;
            var count = req.body.count;

            stockRepository.stockUp(isbn, count).then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count

                });
            }).catch(next);
        },
        getStock(req, res, next) {
            
            stockRepository.findAll().then(function (results) {

                res.format({
                  html: function(){
                    res.send('<p>Stan inwentarza: '+results.length+'</p>');
                  },

                  json: function(){
                    res.send(results);
                  }
                });
                
            }).catch(next);

        },
        find(req, res, next) {

            console.log('params', req.params);

            stockRepository.find(parseInt(req.params.isbn)).then(function (results) {

                if (results.length > 0) {
                    result = results;
                } else {
                    result = null;
                }

                res.format({
                  html: function(){
                    res.send('<p>HTML</p>');
                  },

                  json: function(){
                    res.send(result);
                  }
                });

            }).catch(next);

        }
    };
};