const { execSync } = require('child_process');

function shutdown(user, password, host) {
    const command = `curl -u ${user}:${password} -k "https://${host}/get_handler?PAGE=System&OUTER_TAB=tab_shutdown&INNER_TAB=NONE&shutdown_option1=1&command=poweroff&OPERATION=set"`;
    console.log(command);
    const output = execSync(command);
    return output.toString();
}

module.exports = shutdown;
