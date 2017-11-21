#!/usr/bin/env node
'use strict';
/**
 * NPM (version 3, at least) unfortunately has a bug where the `prepack`, and
 * `prepublishOnly` lifecycle hooks don't execute as expected.
 *
 * To work around this this script explicitly cleans and builds prior to the
 * `publish` action being executed.
 */
const cp = require('child_process');
const path = require('path');

// Whenever we incoke `cp.exec` or `cp.execSync` these args set the correct
// working directory and ensure that stdout / sterr are streamed to the
// current TTY
const execArgs = { cwd: path.resolve(__dirname, '..'), stdio: 'inherit' };

cp.execSync('npm run prepare', execArgs);
cp.exec('npm publish');
