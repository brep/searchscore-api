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
    it('GET / should return "Hello World!"', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});