const app = require("../app");
const db = require('../models');
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect, assert, } = chai;
chai.use(chaiHttp);
beforeEach(async () => {
    // await db.Users.truncate({ cascade: true });
});
describe('admin user signup requests', () => {
    it('responds with success ', async () => {
        const response = await chai.request(app).get("/admin/userList");
        console.log(response.body.users)
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').to.be.true;
    });
});