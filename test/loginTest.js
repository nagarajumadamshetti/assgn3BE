const app = require("../app");
const db = require('../models');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect, assert, } = chai;
chai.use(chaiHttp);
beforeEach(async () => {
    // await db.Users.truncate({ cascade: true });
});
describe('login user', () => {
    it('responds with success ', async () => {
        const response = await chai.request(app).post("/login").send({
            "userName": "nagasai",
            "password": "nagaraj123",
            
        });
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTgsInVzZXJOYW1lIjoibmFnYXNhaSIsImlhdCI6MTU4ODk0OTUwMCwiZXhwIjoxNTg4OTUzMTAwfQ.24-TuTqyiIWOpWboB5wh_dZtRwMlrSRrj5w2mcoPsh8'
        console.log(response.body)
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').to.be.true;
        expect(response.body).to.have.property("uSuccess").to.be.true;
        expect(response.body).to.have.property("pSuccess").to.be.true;
        expect(response.body).to.have.property("uSuccess").to.be.true;
        expect(response.body).to.have.property('token').to.be.a('string');
    });
});