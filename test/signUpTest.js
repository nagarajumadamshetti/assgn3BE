const app = require("../app");
const db = require('../models');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect, assert, } = chai;
chai.use(chaiHttp);
beforeEach(async () => {
    // await db.Users.truncate({ cascade: true });
});
describe('signup user', () => {
    it('responds with success ', async () => {
        const response = await chai.request(app).post("/signUp").send({
            "userName": "surya",
            "password": "nagaraj123",
            "email": "naga@gma.com",
            "phone": "1234567890",
            "role": "user",
            "accepted": false
        });
        console.log(response.body)
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').to.be.true;
        // expect(response.body.users).to.have.property("userName").to.be.a('string').to.have.lengthOf.within(4, 30);
        // expect(response.body.users).to.have.property('password').to.be.a('string').to.have.lengthOf.at.least(8);
        // expect(response.body.users).to.have.property('phone').to.be.a('string').to.have.lengthOf(10);
        // expect(response.body.users).to.have.property('role').to.be.a('string');
    });
});