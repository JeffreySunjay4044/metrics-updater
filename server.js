const express = require('express');
const router = require('./api/router');
const cron = require('node-cron');

let exit = false

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down job');
    exit = true;
});




const server = (container) => {


    async function start() {
        const scrapMetrics = container.resolve('scrapMetrics');
        while (!exit) {
            await scrapMetrics.scrapeUrls();
        }

        console.log('Job stopped successfully');
    }

    cron.schedule('*/1 * * * *', function(){
        console.log('The answer to life, the universe, and everything!');
        start()
    });

    // Start Express app server
    return new Promise((resolve, reject) => {
        let port;
        try {
            port = container.resolve('baseConfig').port;
        } catch (err) {
            console.log(err);
        }
        console.log('port ', port);

        if (!port) {
            console.log('Port not found, Please check baseConfig.js');
            reject(new Error('/port/'));
            return;
        }

        const app = express();
        app.use('/', router);
        const appServer = app.listen(port, () => {
            return resolve(appServer);
        });

        appServer.keepAliveTimeout = 120000;
    });
};

module.exports = server;
