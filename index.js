#!/usr/bin/env node

import minimist from "minimist";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Plop, run } from "plop";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const argv = minimist(args);

const plopfilePath = path.join(__dirname, "plopfile.js");

// Preparar Plop con el proyecto consumidor como cwd
Plop.prepare(
  {
    cwd: process.cwd(), // <-- ahora es el proyecto que ejecuta pnpm gen
    configPath: plopfilePath, // plopfile.js dentro del generador
    destBasePath: process.cwd(), // <-- ruta donde se generará el código
  },
  (env) => Plop.execute(env, run),
);
