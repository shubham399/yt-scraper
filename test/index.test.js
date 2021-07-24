const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
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
        it('POST /api/v1/ingest with Empty body', async () => {
            let res = await request(app).post("/api/v1/ingest");
            assert.strictEqual(res.status, 400, 'Status is  400');
            expect(res.body).to.deep.equalInAnyOrder({ "error": true, "message": "query is mandatory" });
        })
        it('POST /api/v1/ingest', async () => {
            let res = await request(app).post("/api/v1/ingest").send({ "query": "test" });
            assert.strictEqual(res.status, 202, 'Status is  202');
            expect(res.body).to.deep.equalInAnyOrder({ "message": "Request Accepted." });
        })
    })
})
