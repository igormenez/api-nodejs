const {User} = require('../../src/app/models');

const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

describe('User', () => {
    beforeEach(async () =>{
        await truncate();
    });

    it('should encrypt user password', async () => {
        const user = await User.create({name: 'Igor', email:'igor@igor.com', password: '123456'});

        const comparHash = await bcrypt.compare('123456', user.password_hash)

        expect(comparHash).toBe(true)
    })
}); 