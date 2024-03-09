const request = require('supertest');
const app = require('./main'); 

describe('GET /', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('GET /metrics', () => {
    it('responds with status 200', async () => {
        const response = await request(app).get('/metrics');
        expect(response.status).toBe(200);
    });
});
