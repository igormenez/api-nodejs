const request = require('supertest');
const { User } = require('../../src/app/models');

const app = require('../../src/app');

const  truncate  = require('../utils/truncate')

describe('Authentication', ()=>{
    beforeEach(async () => {
        await truncate();
    });
    it('Should authenticate with valid credentials', async() => {
        const user = await User.create({
            name: 'Igor',
            email: 'igor@igor.com',
            password: '12345' 
        });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '12345'
        })
        expect(response.status).toBe(200);
    });

    it('Should not authenticate  with invalid credentials', async ()=>{
        const user = await User.create({
            name: 'Igor',
            email: 'igor@igor.com',
            password: '12345' 
        });

        const response = await request(app)
        .post('/sessions')
        .send({
            email: user.email,
            password: '12345555'
        })

        expect(response.status).toBe(401);
    })
})