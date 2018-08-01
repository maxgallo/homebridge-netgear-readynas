const { execSync } = require('child_process');

function shutdown(user, password, host, version) {
    var command, output;

    if ((version || 0) < 6) {
        command = `curl -u "${user}:${password}" -k "https://${host}/get_handler?PAGE=System&OUTER_TAB=tab_shutdown&INNER_TAB=NONE&shutdown_option1=1&command=poweroff&OPERATION=set"`;
    }
    else {
        command = `curl -u "${user}:${password}" -k "https://${host}/admin/csrf.html"`;

        output = execSync(command);
        var matches = output.toString().match(/csrfInsert\(\"csrfpId\", \"([^\"])*/m);
        var csrf = matches[0].replace(/csrfInsert\(\"csrfpId\", \"/, '');

        command = `curl -u "${user}:${password}" -k "https://${host}/dbbroker?shutdown=1" -H "csrfpId: ${csrf}"`;
    }

    console.log(command);
    output = execSync(command);
    return output.toString();
}

module.exports = shutdown;
