const { expect, assert } = require("chai");
let request = require("supertest");
let app = require('../src/app');

describe('Server', () => {
    describe('UP Route', () => {
        it('should be running', async () => {
            let res = await request(app).get("/");
            assert.strictEqual(res.status, 200, 'Status is not 200');
            assert.strictEqual(res.body.message, "Server Up!", 'Server Message Changed');
        })
    })
    describe('Video APIs', () => {
        it.skip('GET /api/v1/video', async () => {
            let res = await request(app).get("/api/v1/video");
            assert.strictEqual(res.status, 200, 'Status is  200');
        })
    })
    describe('Ingest APIs', () => {
        it.skip('POST /api/v1/ingest', async () => {
            let res = await request(app).get("/api/v1/ingest");
            assert.strictEqual(res.status, 200, 'Status is  200');
        })
    })
})
