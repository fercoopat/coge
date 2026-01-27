#!/usr/bin/env node

import minimist from "minimist";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Plop, run } from "plop";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const argv = minimist(args);

const plopfilePath = path.join(__dirname, "plopfile.js");

// Preparar Plop con el proyecto consumidor como destino
Plop.prepare(
  {
    cwd: __dirname, // carpeta del generador
    configPath: plopfilePath, // tu plopfile.js
    destBasePath: process.cwd(), // carpeta del proyecto que ejecuta pnpm gen
  },
  (env) => Plop.execute(env, run),
);
