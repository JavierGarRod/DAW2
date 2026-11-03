// Ejercicio 1c: cuenta cuántos ficheros hay de cada extensión en una carpeta.
// Uso: node extensiones.js [ruta-de-la-carpeta]
// Si no se indica ruta, se usa la carpeta del propio script.

const fs = require('fs');
const path = require('path');

const carpeta = process.argv[2] || __dirname;

let entradas;
try {
  // withFileTypes devuelve objetos Dirent: así distinguimos ficheros de subcarpetas
  entradas = fs.readdirSync(carpeta, { withFileTypes: true });
} catch (error) {
  console.error(`No se puede leer la carpeta "${carpeta}": ${error.message}`);
  process.exit(1);
}

const conteo = {};

for (const entrada of entradas) {
  if (!entrada.isFile()) continue; // solo contamos ficheros, no carpetas

  const extension = path.extname(entrada.name).toLowerCase() || '(sin extensión)';
  conteo[extension] = (conteo[extension] || 0) + 1;
}

// console.table muestra cada clave del objeto como una fila
const tabla = {};
for (const [extension, cantidad] of Object.entries(conteo)) {
  tabla[extension] = { ficheros: cantidad };
}

console.table(tabla);
