const request = require('supertest');
const app = require('./main.js');

describe('Routes', () => {
  test('GET / should return status 200 and status message with metrics path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body.metrics_path).toBe('/metrics');
  });

  test('GET /metrics should return metrics', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/text\/plain/); // Assuming metrics are returned as plaintext
  });

  test('GET /healthz should return status 200 and status message', async () => {
    const response = await request(app).get('/healthz');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
