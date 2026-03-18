const request = require('supertest');
const { app, things, places, emotions } = require('./index');

describe('GET /api/health', () => {
  it('returns { status: "ok" }', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/prompt', () => {
  it('returns an object with Thing, Place, and Emotion keys', async () => {
    const res = await request(app).get('/api/prompt');
    expect(res.status).toBe(200);
    expect(typeof res.body.Thing).toBe('string');
    expect(typeof res.body.Place).toBe('string');
    expect(typeof res.body.Emotion).toBe('string');
    expect(res.body.Thing.length).toBeGreaterThan(0);
    expect(res.body.Place.length).toBeGreaterThan(0);
    expect(res.body.Emotion.length).toBeGreaterThan(0);
  });

  it('returns values from the known word lists', async () => {
    const res = await request(app).get('/api/prompt');
    expect(things).toContain(res.body.Thing);
    expect(places).toContain(res.body.Place);
    expect(emotions).toContain(res.body.Emotion);
  });
});
