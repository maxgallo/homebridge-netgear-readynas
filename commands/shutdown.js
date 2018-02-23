const execute = require('./execute');

function shutdown() {
    const log = `${new Date().toISOString()} - shutdown!`;
    console.log(log);
    execute('./scripts/readynas-remote-shutdown.sh');
}

module.exports = shutdown;
