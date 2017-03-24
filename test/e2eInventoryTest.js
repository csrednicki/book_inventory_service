var request = require('supertest');
var inMemoryRepo = require('../stockInMemory');
var app = require('../index')(inMemoryRepo);

describe('Book inventory', function () {
    it('allows to stock up the items', function () {

        request(app)
                .post('/')
                .send({
                    isbn: '123456789',
                    counter: 10
                })
                .expect({
                    isbn: '123456789',
                    counter: 10
                });

    });
});