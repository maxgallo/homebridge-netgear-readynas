const { execSync } = require('child_process');

function execute(bashScript) {
    const command = execSync(bashScript);

    command.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    command.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    command.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = execute;
