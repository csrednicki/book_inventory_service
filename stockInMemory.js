module.exports = function() {
    var items = [];

    return {
        _items(state) {
            items = state;
        },
        stockUp(isbn, count) {
            var updated = false;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    item.count = count;
                    updated = true;
                }
            });
            if(!updated) {
                items.push({"isbn": isbn, "count": count});
            }
            return Promise.resolve();
        },
        findAll() {
            return Promise.resolve(items);
        },
        getCount(isbn) {
            var foundItemCount = null;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    foundItemCount = item.count;
                }
            });
            return Promise.resolve(foundItemCount);
        }
    };
};