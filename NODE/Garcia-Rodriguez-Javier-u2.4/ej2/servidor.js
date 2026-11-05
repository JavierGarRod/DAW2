// Ejercicio 2 · Una web servida desde ficheros
// Uso: node --watch servidor.js   (escucha en http://localhost:3000)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO = 3000;

// Content-Type según la extensión del fichero
const tipos = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
};

// Qué fichero y qué código corresponden a cada ruta
const rutas = {
  '/': { fichero: 'index.html', codigo: 200 },
  '/contacto': { fichero: 'contacto.html', codigo: 200 },
  '/estilos.css': { fichero: 'estilos.css', codigo: 200 }
};

// Para cualquier otra ruta
const noEncontrada = { fichero: '404.html', codigo: 404 };

const servidor = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // 1) Decidimos qué fichero y qué código toca (sin leer nada todavía)
  const ruta = req.url.split('?')[0]; // quitamos la query string (?x=1)
  const { fichero, codigo } = rutas[ruta] || noEncontrada;

  // 2) Una única lectura de fichero para todas las rutas
  const rutaFichero = path.join(__dirname, 'paginas', fichero);

  fs.readFile(rutaFichero, (error, contenido) => {
    if (error) {
      // El fichero no existe o no se puede leer: respondemos 500 y seguimos vivos
      console.error(`No se pudo leer ${fichero}: ${error.message}`);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error 500: el servidor no ha podido leer el fichero.');
      return;
    }

    const tipo = tipos[path.extname(fichero)] || 'application/octet-stream';
    res.writeHead(codigo, { 'Content-Type': tipo });
    res.end(contenido);
  });
});

// Si el puerto está ocupado avisamos con un mensaje claro en vez de un error largo
servidor.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`El puerto ${PUERTO} ya está en uso. ¿Tienes otro servidor encendido?`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});

servidor.listen(PUERTO, () => {
  console.log(`Servidor en http://localhost:${PUERTO}`);
});
