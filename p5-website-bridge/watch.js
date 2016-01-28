var child_process = require('child_process');
var watch = require('node-watch');

var P5_DIR = '/var/p5.js';
var P5_YUIDOC_THEME_DIR = P5_DIR + '/docs/yuidoc-p5-theme';
var P5_YUIDOC_THEME_SRC_DIR = P5_DIR + '/docs/yuidoc-p5-theme-src';
var P5_SRC_DIR = P5_DIR + '/src';
var P5_ADDONS_DIR = P5_DIR + '/lib/addons';
var WEBSITE_DIR = '/var/www/html';
var WEBSITE_JS_DIR = WEBSITE_DIR + '/js';
var WEBSITE_REFERENCE_DIR = WEBSITE_DIR + '/reference';

function run(cmdline) {
  console.log("Running " + JSON.stringify(cmdline) + "...");
  try {
    child_process.execSync(cmdline, {
      cwd: P5_DIR,
      stdio: ['ignore', 1, 2]
    });
    console.log("Command succeeded.");
  } catch (e) {
    console.log("Command failed with exit code " + e.status + ".");
  }
}

function rebuild_docs() {
  console.log("Rebuilding p5 docs...");
  run('grunt yuidoc:prod');

  console.log("Copying p5 docs to website...");
  run('rm -rf ' + WEBSITE_REFERENCE_DIR);
  run('cp -R docs/reference ' + WEBSITE_REFERENCE_DIR);
}

function rebuild_src() {
  console.log("Rebuilding p5 source...");
  run('grunt browserify');

  console.log("Copying p5 to website...");
  run('cp lib/p5.js ' + WEBSITE_JS_DIR + '/p5.min.js');
}

function copy_addons() {
  console.log("Copying p5 addons to website...");
  run('cp ' + P5_ADDONS_DIR + '/p5.sound.js ' + WEBSITE_JS_DIR);
  run('cp ' + P5_ADDONS_DIR + '/p5.dom.js ' + WEBSITE_JS_DIR);
}

function rebuild_yuidoc_theme() {
  console.log("Rebuilding p5 yuidoc theme...");
  run('grunt requirejs:yuidoc_theme');
}

function init() {
  rebuild_src();
  rebuild_yuidoc_theme();
  rebuild_docs();
  copy_addons();
}

function watch_everything() {
  console.log("Waiting for source files to change...");

  watch(P5_ADDONS_DIR, function() {
    copy_addons();
    rebuild_docs();
  });

  watch(P5_SRC_DIR, function() {
    rebuild_src();
    rebuild_docs();
  });

  watch(P5_YUIDOC_THEME_DIR, function() {
    rebuild_docs();
  });

  watch(P5_YUIDOC_THEME_SRC_DIR, function() {
    rebuild_yuidoc_theme();
    rebuild_docs();
  });
}

init();
watch_everything();
