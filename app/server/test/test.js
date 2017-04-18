var request = require('supertest');

request = request('http://localhost:3000/api/v1');

describe('GET /posts', function() {
    it('respond with json', function(done) {
        request
            .get('/posts')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /posts', function() {
    it('respond with json', function(done) {
        request
            .get('/posts')
            .query({ page: '1', limit: '5' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});