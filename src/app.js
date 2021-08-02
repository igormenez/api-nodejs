require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express');
const bodyParser = require('body-parser')

class AppController {
    constructor(){
        this.express = express();

        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(require('./routes'));
    }
    routes(){
        this.express.use(require('./routes'));
    }
}

module.exports = new AppController().express; 