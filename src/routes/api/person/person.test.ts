import request from 'supertest'
import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import app from '../../../app.js'

const personEndpoint = '/api/person';
const personSearchEndpoint = `${personEndpoint}/search`;
const artistEndpoint = '/api/artist';

describe('Test Person routes', () => {
    it(`GET ${personSearchEndpoint} query parameter invalid values should fail`, async () => {
        let response = await request(app).get(personSearchEndpoint);
        expect(response.status).toBe(500);
        response = await request(app).get(personSearchEndpoint).query({ query: null });
        expect(response.status).toBe(500);
        response = await request(app).get(personSearchEndpoint).query({ query: '' });
        expect(response.status).toBe(500);
        response = await request(app).get(personSearchEndpoint).query({ query: '   ' });
        expect(response.status).toBe(500);
    });
    it(`GET ${personSearchEndpoint} with query "ed" should return 4 results and scored appropriately`, async () => {
        const response = await request(app).get(personSearchEndpoint).query({ query: 'ed' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        let names: string[] = response.body.map((r: any) => r.name);
        expect(names[0]).toBe('Eddy Verde');
        expect(names[1]).toBe('Greta Heissenberger');
        expect(names[2]).toBe('Doug Akridge');
        expect(names[3]).toBe('Jason Leo');
        expect(response.body[0].score).toBe(6);
        expect(response.body[1].score).toBe(3);
        expect(response.body[2].score).toBe(2);
        expect(response.body[3].score).toBe(2);
    });
    it(`GET ${personSearchEndpoint} with query " the" should return 4 results and scored appropriately`, async () => {
        const response = await request(app).get(personSearchEndpoint).query({ query: ' the' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        let names: string[] = response.body.map((r: any) => r.name);
        expect(names[0]).toBe('Jason Leo');
        expect(names[1]).toBe('Eddy Verde');
        expect(names[2]).toBe('Greta Heissenberger');
        expect(names[3]).toBe('Justin Coker');
        expect(response.body[0].score).toBe(3);
        expect(response.body[1].score).toBe(1);
        expect(response.body[2].score).toBe(1);
        expect(response.body[3].score).toBe(1);
    });
    it(`GET ${personSearchEndpoint} with query "rock" should return results`, async () => {
        const response = await request(app).get(personSearchEndpoint).query({ query: 'rock' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        expect(response.body.every((result: any) => result.score === 1)).toBe(true);
    });
    it(`GET ${personSearchEndpoint} with query "beethoven" should return no results`, async () => {
        const response = await request(app).get(personSearchEndpoint).query({ query: 'beethoven' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });
    it(`add beethoven, then GET ${personSearchEndpoint} with query "beethoven" should return results appropriately scored`, async () => {
        let response = await request(app).post(artistEndpoint).send({ name: 'Beethoven', genre: 'Classical' });
        expect(response.status).toBe(201);
        response = await request(app).get(personSearchEndpoint).query({ query: 'beethoven' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].score).toBe(2);
    });
});