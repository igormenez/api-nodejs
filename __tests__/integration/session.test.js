const request = require('supertest');
const factory = require('../factories');

const app = require('../../src/app');

const  truncate  = require('../utils/truncate')

describe('Authentication', ()=>{
    beforeEach(async () => {
        await truncate();
    });
    it('Should authenticate with valid credentials', async() => {
        const user = await factory.create('User', {
            password: '12345'
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '12345'
        })
        expect(response.status).toBe(200);
    });

    it('Should not authenticate  with invalid credentials', async ()=>{
        const user = await factory.create('User', {
            password: '12345'
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '12345555'
        })

        expect(response.status).toBe(401);
    })

    it('It should return jwt token when athinticate', async () => {
        const user = await factory.create('User', {
            password: '12345'
        })

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '12345'
        })

        expect(response.body).toHaveProperty("token");
    })

    it('It should be able to access private routes when authenticated', async()=>{
        const user = await factory.create('User', {
            password: '12345'
        })

        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer ${user.generateToken()}`)

        expect(response.status).toBe(200);

    })

    it('It shouldn`t be able to access private routes withou jwt token', async()=>{
        const response = await request(app)
        .get('/dashboard');        

        expect(response.status).toBe(401);
    })

    it('It should not be able to access private routes  with invalid jwt topken', async() =>{
        const response = await request(app)
        .get('/dashboard')
        .set('Authorization', `Bearer 123154`);

        expect(response.status).toBe(401);
    })
})