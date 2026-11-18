// Ejercicio 4: copiar un fichero pasando todo el texto a mayúsculas.
// Uso: node mayusculas.js  (y después escribir el nombre del fichero)

const fs = require('fs');
const path = require('path');

// a) Preguntamos con stdout.write y leemos la respuesta con stdin.once('data')
process.stdout.write('¿Qué fichero quieres copiar? ');

process.stdin.once('data', (entrada) => {
  const origen = entrada.toString().trim();
  const destino = path.join(path.dirname(origen), `MAYUS-${path.basename(origen)}`);

  let bytesLeidos = 0;
  let escritura;

  // b) Lectura por trozos en utf8
  const lectura = fs.createReadStream(origen, 'utf8');

  // El fichero de destino se crea solo cuando el origen se ha abierto bien,
  // así no queda un fichero vacío si el origen no existe.
  lectura.on('open', () => {
    escritura = fs.createWriteStream(destino);

    // c) Cuando termina la escritura mostramos el resultado y salimos
    escritura.on('finish', () => {
      console.log(`Creado ${destino} (${bytesLeidos} bytes)`);
      process.exit();
    });
  });

  lectura.on('data', (trozo) => {
    bytesLeidos += Buffer.byteLength(trozo); // bytes en utf8 del trozo leído
    escritura.write(trozo.toUpperCase());
  });

  // Al acabar de leer, cerramos la escritura (eso dispara 'finish')
  lectura.on('end', () => {
    escritura.end();
  });

  // d) Si el fichero no existe (u otro fallo de lectura): error y código 1
  lectura.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
});
