const _ = require('lodash');
const fs = require('fs');
const express = require('express');

const CheckFile = (filename) => {
    let isJavascript = _.endsWith(filename, '.js');
    if(isJavascript == true) return _.trim(filename, '.js');
    return false;
};

export default {
    Route: (app) => {
        return new Promise((resolve, reject) => {
            fs.readdir(`./server/routes`, (err, files) => {
                if(err) return reject('Not Found "routes" Folder');
                if(files.length < 1) return reject('"Route" Folder is Empty');
                files.forEach((filename) => {
                    let endFile = CheckFile(filename);
                    let api = express.Router();
                    if(endFile == false) return reject(`"${filename}" is not ".js" Format in "routes" Folder`);
                    if(endFile == 'index') return require('../routes')(app);
                    app.use(`/${endFile}`, api);
                    require(`../routes/${endFile}`)(api);
                });
                resolve();
            });
        });
    },
    Socket: (io) => {
        return new Promise((resolve, reject) => {
            fs.readdir(`./server/sockets`, (err, files) => {
                if(err) return reject('Not Found "sockets" Folder');
                files.forEach((filename) => {
                    let endFile = CheckFile(filename);
                    if(endFile == false) return reject(`"${filename}" is not ".js" Format in "sockets" Folder'`);
                    if(endFile == 'index') return io.of('/').on('connect', (socket) => require(`../sockets`)(io, socket));
                    io.of('/'+endFile).on('connect', (socket) => require(`../sockets/${endFile}`)(io, socket));
                });
                resolve();
            });
        });
    },
    Model: (mongoose) => {
        return new Promise((resolve, reject) => {
            fs.readdir(`./server/models`, (err, files) => {
                if(err) return reject('Not Found "models" Folder');
                files.forEach((filename) => {
                    let endFile = CheckFile(filename);
                    if(endFile == false) return reject(`"${filename}" is not ".js" Format in "models" Folder`);
                    mongoose.model(endFile, require(`../models/${endFile}`));
                });
                resolve();
            });
        });
    },
}