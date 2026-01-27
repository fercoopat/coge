#!/usr/bin/env node

const path = require("path");
const { Plop, run } = require("plop");

const destPath = process.cwd();

Plop.prepare(
  {
    cwd: __dirname, // generator root directory
    configPath: path.join(__dirname, "plopfile.js"),
    destBasePath: destPath, // consumer project directory
  },
  (env) => {
    return Plop.execute(env, run);
  },
);
