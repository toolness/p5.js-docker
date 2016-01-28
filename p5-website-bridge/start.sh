#! /bin/bash

set -ex && \
  cd /var/p5.js && \
  npm install && \
  cd /var/p5.js/p5-website-bridge && \
  npm install && \
  node watch.js
