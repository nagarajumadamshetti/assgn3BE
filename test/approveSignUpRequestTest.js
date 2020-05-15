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
        const response = await chai.request(app).put("/admin/userRequests/accept").send({
            id:59,
            accepted:true
        });
        console.log(response.body)
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('success').to.be.true;
        
    });
});