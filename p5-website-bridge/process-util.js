var child_process = require('child_process');

exports.successSync = function(cmdline) {
  try {
    child_process.execSync(cmdline, {
      stdio: ['ignore', 'ignore', 'ignore']
    });
    return true;
  } catch (e) {
    return false;
  }
}

exports.runSync = function(cmdline, options) {
  child_process.execSync(cmdline, {stdio: [0, 1, 2]});
}

exports.spawnAndBindLifetimeTo = function(command, args) {
  var child = child_process.spawn(command, args, {
    stdio: [0, 1, 2]
  });

  child.on('close', function(code) {
    process.exit(code);
  });

  process.on('SIGTERM', function() {
    // Forward the SIGTERM to the child so Docker exits quickly.
    child.kill('SIGTERM');
  });
}
