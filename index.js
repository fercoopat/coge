#!/usr/bin/env node

const path = require("path");
const { NodePlopAPI } = require("plop");

async function main() {
  try {
    // Carpeta del generador (donde están los templates y plopfile)
    const generatorRoot = __dirname;

    // Plopfile del generador
    const plopfilePath = path.join(generatorRoot, "plopfile.js");

    // Crear instancia de Plop
    const plop = new NodePlopAPI(plopfilePath);

    // Ejecutar CLI interactivo
    await plop.run({
      destBasePath: process.cwd(), // <-- Aquí se asegura que los archivos se generen en el proyecto consumidor
    });
  } catch (err) {
    console.error("Error ejecutando el generador:", err);
    process.exit(1);
  }
}

main();
