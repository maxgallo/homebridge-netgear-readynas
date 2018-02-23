const { execSync } = require('child_process');

function wakeup(mac) {
    const command = `wakeonlan ${mac}`;
    const output = execSync(command);
    return output.toString();
}

module.exports = wakeup;
