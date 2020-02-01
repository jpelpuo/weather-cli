#!/usr/bin/env node

console.log(process.argv)
require = require("esm")(module)
require('./src/cli').cli(process.argv)