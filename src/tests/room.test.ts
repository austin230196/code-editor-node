const expect = require("node:test");
const { it, describe, beforeAll, test } = require("node:test");
const request = require("supertest");

const {app} = require("../server");


describe('getRoom', () => {
    beforeAll(() => {
        console.log('This is the get room test block');
    })
    it('check if api alive', async() => {
        const res = await request(app).get("/");
        console.log({res});
        expect(res.status).toBe(200);
    })
})
test('', async() => {
    expect(4).toTruthy()
});