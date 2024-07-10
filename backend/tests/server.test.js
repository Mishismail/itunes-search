// tests/server.test.js
import request from 'supertest';
import { expect } from 'chai';
import nock from 'nock';
import app from '../server.js';

const ITUNES_API_URL = 'https://itunes.apple.com';

describe('GET /api/search', () => {
  it('should return search results', async () => {
    // Mock the iTunes API response
    nock(ITUNES_API_URL)
      .get('/search')
      .query({ term: 'test', media: 'music' })
      .reply(200, {
        results: [{ trackId: 1, trackName: 'Test Song' }]
      });

    const response = await request(app)
      .get('/api/search')
      .query({ searchTerm: 'test', mediaType: 'music' });

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    expect(response.body[0]).to.have.property('trackName', 'Test Song');
  });
});

describe('Favourites API', () => {
  it('should add a new favourite', async () => {
    const newItem = { id: 1, trackName: 'Test Track' };
    const response = await request(app)
      .post('/api/favourites')
      .send(newItem);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(newItem);
  });

  it('should return all favourites', async () => {
    const response = await request(app).get('/api/favourites');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should remove a favourite', async () => {
    const itemId = 1;
    const response = await request(app).delete(`/api/favourites/${itemId}`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Item removed from favorites');
  });

  it('should return 404 if favourite not found', async () => {
    const itemId = 999;
    const response = await request(app).delete(`/api/favourites/${itemId}`);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Item not found in favorites');
  });
});

