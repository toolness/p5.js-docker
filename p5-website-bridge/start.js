var putil = require('./process-util');

process.chdir('/var/p5.js');

putil.runSync("npm install");

process.chdir('/var/p5.js/p5-website-bridge');

putil.runSync("npm install");

putil.spawnAndBindLifetimeTo('node', ['watch.js']);
