var fs = require('fs');

var putil = require('./process-util');

var HOST_UID = fs.statSync('/var/p5.js').uid;
var HOST_USER = process.env.HOST_USER || 'code_executor_user';

if (HOST_UID !== process.getuid()) {
  if (!putil.successSync('id -u ' + HOST_USER)) {
    console.log("Configuring uid " + HOST_UID + " as user " +
                HOST_USER + "...");
    process.env['HOME'] = '/home/' + HOST_USER;
    putil.runSync(
      'groupadd code_executor_group && ' +
      'useradd -d ' + process.env['HOME'] + ' -m ' + HOST_USER + ' ' +
      '-g code_executor_group -u ' + HOST_UID
    );
    process.setuid(HOST_UID);
  }
}

putil.spawnAndBindLifetimeTo(process.argv[2], process.argv.slice(3));
