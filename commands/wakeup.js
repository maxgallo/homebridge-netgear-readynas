const execute = require('./execute');

function wakeup() {
    const log = `${new Date().toISOString()} - wake up!`;
    console.log(log);
    execute('./scripts/readynas-remote-wakeup.sh');
}

module.exports = wakeup;
