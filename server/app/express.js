import  config from './config'

//Middleware default
const   express = require('express');
const   bodyParser = require('body-parser');
const   compression = require('compression');
const   helmet = require('helmet');
const   path = require('path');

//Middleware custom
const   history = require('connect-history-api-fallback');

//Init
export default (app) => {
    //Init Default
    app.use(compression({ threshold: 0 }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: 15778476,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
    app.use('/', express.static(path.join(__dirname, '../../client')));

    //Init Custom
    app.use(history());
};