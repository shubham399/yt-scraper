const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const fs = require("fs");
chai.use(deepEqualInAnyOrder);
const { expect, assert } = require("chai");
let request = require("supertest");
let app = require('../src/app');
const db = require("../src/models");

describe('Server', () => {
    before(async () => {
        await db.sequelize.sync({ force: true })
        await db.Video.create({ id: "id1", title: "hello", "description": "test", "metaData": null })
        await db.Video.create({ id: "id2", title: "my", "description": "name", "metaData": null })
        await db.Video.create({ id: "id3", title: "welcome", "description": "world", "metaData": null })
    })
    after(() => {
        console.log("Removing", process.env.DATABASE_URL.split("://")[1])
        fs.unlinkSync(process.env.DATABASE_URL.split("://")[1]);
    })
    describe('UP Route', () => {
        it('should be running', async () => {
            let res = await request(app).get("/");
            assert.strictEqual(res.status, 200, 'Status is not 200');
            assert.strictEqual(res.body.message, "Server Up!", 'Server Message Changed');
        })
    })
    describe('Video APIs', () => {
        it('GET /api/v1/video', async () => {
            let res = await request(app).get("/api/v1/video");
            assert.strictEqual(res.status, 200, 'Status is  200');
            expect(res.body).to.deep.equalInAnyOrder({ total: 3, offset: 0, limit: 10, videos: [{ id: "id1", title: "hello", "description": "test", "metaData": null }, { id: "id2", title: "my", "description": "name", "metaData": null }, { id: "id3", title: "welcome", "description": "world", "metaData": null }] });
        })
        it('GET /api/v1/video with query', async () => {
            let res = await request(app).get("/api/v1/video?search=hel");
            assert.strictEqual(res.status, 200, 'Status is  200');
            expect(res.body).to.deep.equalInAnyOrder({ total: 1, offset: 0, limit: 10, videos: [{ id: "id1", title: "hello", description: "test", "metaData": null }] });
        })
        it('GET /api/v1/video with query of description', async () => {
            let res = await request(app).get("/api/v1/video?search=est");
            assert.strictEqual(res.status, 200, 'Status is  200');
            expect(res.body).to.deep.equalInAnyOrder({ total: 1, offset: 0, limit: 10, videos: [{ id: "id2", title: "my", "description": "name", "metaData": null }] });
        })
    })
    describe('Ingest APIs', () => {
        it('POST /api/v1/ingest with Empty body', async () => {
            let res = await request(app).post("/api/v1/ingest");
            assert.strictEqual(res.status, 400, 'Status is  400');
            expect(res.body).to.deep.equalInAnyOrder({ "error": true, "message": "query is mandatory" });
        })
        it('POST /api/v1/ingest without Time', async () => {
            let res = await request(app).post("/api/v1/ingest").send({ "query": "test" });
            assert.strictEqual(res.status, 202, 'Status is  202');
            expect(res.body).to.deep.equalInAnyOrder({ "message": "Request Accepted." });
        })
        it('POST /api/v1/ingest with valid Time', async () => {
            let res = await request(app).post("/api/v1/ingest").send({ "query": "test", "publishedAfter": new Date().toISOString() });
            assert.strictEqual(res.status, 202, 'Status is  202');
            expect(res.body).to.deep.equalInAnyOrder({ "message": "Request Accepted." });
        })
        it('POST /api/v1/ingest', async () => {
            let res = await request(app).post("/api/v1/ingest").send({ "query": "test", "publishedAfter": "not a date" });
            assert.strictEqual(res.status, 400, 'Status is  400');
            expect(res.body).to.deep.equalInAnyOrder({ error: true, "message": "publishedAfter is not a valid date" });
        })
    })
})
