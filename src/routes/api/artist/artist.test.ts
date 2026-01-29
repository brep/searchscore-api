import request from 'supertest'
import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import app from '../../../app.js'

const artistEndpoint = '/api/artist';

describe('Test Artist routes', () => {
    it(`POST ${artistEndpoint} should fail with invalid values`, async () => {
        let response = await request(app).post(artistEndpoint);
        expect(response.status).toBe(500);
        response = await request(app).post(artistEndpoint).send('test');
        expect(response.status).toBe(500);
        response = await request(app).post(artistEndpoint).send({ });
        expect(response.status).toBe(500);
        response = await request(app).post(artistEndpoint).send({ name: 1234, genre: 5678 });
        expect(response.status).toBe(500);
        response = await request(app).post(artistEndpoint).send({ name: 'test', genre: 5678 });
        expect(response.status).toBe(500);
        response = await request(app).post(artistEndpoint).send({ name: 1234, genre: 'test' });
        expect(response.status).toBe(500);
    });
    it(`POST ${artistEndpoint} should succeed with valid values`, async () => {
        let response = await request(app).post(artistEndpoint).send({ name: 'Pendulum', genre: 'Rock' });
        expect(response.status).toBe(201);
    });
    it(`POST ${artistEndpoint} should fail with duplicate`, async () => {
        let response = await request(app).post(artistEndpoint).send({ name: 'Sublime', genre: 'Ska' });
        expect(response.status).toBe(409);
    });
});