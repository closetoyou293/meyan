import  config from './config'
import  dir from './dir'
import  express from './express'

const   app = require('express')();
const   server = require('http').createServer(app);
const   io = require('socket.io')(server);
const   mongoose = require('mongoose');
const   chalk = require('chalk');
const   async = require('async');

//Cluster
const CPUs = () => {
    const   cluster = require( "cluster" );
    const   cpus = require( "os" ).cpus().length;
    if (cluster.isMaster) {
        console.log(chalk.yellow("[CPU]"), "Master process is Ready");
        for (let i = 0; i < cpus ; i++) {
            cluster.fork();
            console.log(chalk.yellow(`[Core - ${i}]`), "Ready");
        }
        return cluster.on('disconnect', (worker) => {
            if (!worker.exitedAfterDisconnect) return cluster.fork();
        });
    } else {
        HTTP()
    }
};

//Server
const HTTP = () => {
    server.listen(process.env.PORT || config.port, () => {
        process.stdout.write('\x1Bc');
        console.log(chalk.yellow('[Server]'), `is running`, chalk.blue(`http://localhost:${config.port}`));
    });
}

//Main
export default (type = '') => {
    async.parallel({
        Routes: (callback) => {
            dir.Route(app)
            .then(res => {
                express(app)
                callback(null)
            })
            .catch(err => callback(err))
        },
        Sockets: (callback) => {
            dir.Socket(io)
            .then(res => callback(null))
            .catch(err => callback(err))
        },
        Models: (callback) => {
            dir.Model(mongoose)
            .then(res => callback(null))
            .catch(err => callback(err))
        },
        Mongodb: (callback) => {
            mongoose.Promise = require("bluebird");
            mongoose.connect(config.mongodb, { useNewUrlParser: true })
            .then((connection) => {
                global.db = connection.models
                callback(null)
            })
            .catch(err => callback('Cannot connect data, please check your MongoDB'));
        },
    }, (err, results) => {
        if(err) {
            console.log(chalk.red('[Error] ') + err);
            return process.exit(1);
        }
        if(type == 'CPUs') return CPUs();
        HTTP();
    });
};
