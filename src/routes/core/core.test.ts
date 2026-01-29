import request from 'supertest'
import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import app from '../../index.js'

describe('Core Routes', () => {
    beforeAll(async () => {
        // TODO
    });
    beforeEach(async () => {
        // TODO
    });
    it('GET /api/search query parameter invalid value', async () => {
        let response = await request(app).get('/api/search');
        expect(response.status).toBe(500);
        response = await request(app).get('/api/search').query({ query: null });
        expect(response.status).toBe(500);
        response = await request(app).get('/api/search').query({ query: '' });
        expect(response.status).toBe(500);
        response = await request(app).get('/api/search').query({ query: '   ' });
        expect(response.status).toBe(500);
    });
    it('GET /api/search with query "ed" should return 4 results', async () => {
        const response = await request(app).get('/api/search').query({ query: 'ed' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        let names: string[] = response.body.map((r: any) => r.name);
        expect(names[0]).toBe('Eddy Verde');
        expect(names[1]).toBe('Greta Heissenberger');
        expect(names[2]).toBe('Doug Akridge');
        expect(names[3]).toBe('Jason Leo');
    });
    it('GET /api/search with query "the" should return 4 results', async () => {
        const response = await request(app).get('/api/search').query({ query: 'the' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(4);
        let names: string[] = response.body.map((r: any) => r.name);
        expect(names[0]).toBe('Jason Leo');
        expect(names[1]).toBe('Eddy Verde');
        expect(names[2]).toBe('Greta Heissenberger');
        expect(names[3]).toBe('Justin Coker');
    });
    it('GET /api/search with query "beethoven" should return no results', async () => {
        const response = await request(app).get('/api/search').query({ query: 'beethoven' });
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    });
});