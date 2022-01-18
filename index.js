process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception:');
    console.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:');
    console.error(err);
    process.exit(1);
});
const container = require('./di/index');
const server = require('./server');

server(container).then((app) => {
    console.log(`Server started succesfully..., running on port: ${container.cradle.baseConfig.port}.`);
    app.on('close', () => {
        // Do something like close db connection
    });
});