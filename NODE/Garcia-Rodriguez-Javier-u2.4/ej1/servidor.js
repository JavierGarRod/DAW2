// Ejercicio 1 · Rutas y códigos de estado
// Uso: node --watch servidor.js   (escucha en http://localhost:3000)

const http = require('http');

const PUERTO = 3000;

const NOMBRE = 'Javier García Rodríguez';
const SOBRE_MI =
  'Estudio programación y estoy aprendiendo a crear servidores web con Node.js. ' +
  'Este año me toca pelearme con rutas, códigos de estado y peticiones.';
const AFICIONES = ['Crossfit', 'Semana Santa', 'Jugar a videojuegos'];

// Envuelve el contenido en una página HTML completa
function pagina(titulo, contenido) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${titulo}</title>
</head>
<body>
${contenido}
</body>
</html>`;
}

// Diccionario de rutas. Cada valor es una FUNCIÓN que construye la página en el
// momento de la petición: así /hora calcula la hora de nuevo cada vez.
// (Si guardáramos directamente el texto, la hora se calcularía una sola vez, al arrancar.)
const rutas = {
  '/': () => pagina('Inicio',
    '  <h1>Inicio</h1>\n' +
    '  <ul>\n' +
    '    <li><a href="/sobre-mi">Sobre mí</a></li>\n' +
    '    <li><a href="/aficiones">Aficiones</a></li>\n' +
    '    <li><a href="/hora">Hora</a></li>\n' +
    '  </ul>'),

  '/sobre-mi': () => pagina('Sobre mí',
    `  <h1>${NOMBRE}</h1>\n` +
    `  <p>${SOBRE_MI}</p>\n` +
    '  <p><a href="/">Volver al inicio</a></p>'),

  '/aficiones': () => pagina('Aficiones',
    '  <h1>Aficiones</h1>\n' +
    '  <ul>\n' +
    AFICIONES.map((aficion) => `    <li>${aficion}</li>`).join('\n') + '\n' +
    '  </ul>\n' +
    '  <p><a href="/">Volver al inicio</a></p>'),

  '/hora': () => pagina('Hora',
    `  <h1>Son las ${new Date().toLocaleTimeString('es-ES')}</h1>\n` +
    '  <p><a href="/">Volver al inicio</a></p>')
};

const servidor = http.createServer((req, res) => {
  // Registro de cada petición en la terminal: método y URL
  console.log(req.method, req.url);

  // Quitamos la query string (?x=1) para comparar solo la ruta
  const ruta = req.url.split('?')[0];
  const generarPagina = rutas[ruta];

  if (generarPagina) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(generarPagina());
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pagina('Error 404',
      '  <h1>Error 404: la ruta no existe</h1>\n' +
      '  <p><a href="/">Volver al inicio</a></p>'));
  }
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
