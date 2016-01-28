var child_process = require('child_process');

function run(cmdline) {
  child_process.execSync(cmdline, {stdio: ['ignore', 1, 2]});
}

process.chdir('/var/p5.js');

run("npm install");

process.chdir('/var/p5.js/p5-website-bridge');

run("npm install");

var child = child_process.spawn('node', ['watch.js'], {
  stdio: ['ignore', 1, 2]
});

child.on('close', function(code) {
  process.exit(code);
});

process.on('SIGTERM', function() {
  // Forward the SIGTERM to the child so Docker exits quickly.
  child.kill('SIGTERM');
});
