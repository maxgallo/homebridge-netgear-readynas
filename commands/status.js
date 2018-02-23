const { execSync } = require('child_process');

function status() {
    const output = execSync('./scripts/readynas-remote-status.sh');
    const statusBoolean = output.toString().indexOf('on') !== -1 ? true : false;
    return statusBoolean;
}

module.exports = status;
