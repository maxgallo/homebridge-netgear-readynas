const spawn = require('child_process').spawn;
const express = require('express');


function execute(bashScript) {

	//const ls = spawn('ls', ['-lh', '/usr']);

	const command = spawn(bashScript);

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


function shutdownNAS() {
	const log = `${new Date().toISOString()} - shutdown!`;
	console.log(log);
	execute('./scripts/readynas-remote-shutdown.sh');
}

function wakeUpNAS() {
	const log = `${new Date().toISOString()} - wake up!`;
	console.log(log);
	execute('./scripts/readynas-remote-wakeup.sh');
}

var app = express();

app.get('/up', function (req, res) {
    wakeUpNAS();
    res.send('Waking up...');
});

app.get('/down', function (req, res) {
    shutdownNAS();
    res.send('Shutting down...');
});

app.listen(30000, function () {
  console.log('Example app listening on port 3000!')
})

