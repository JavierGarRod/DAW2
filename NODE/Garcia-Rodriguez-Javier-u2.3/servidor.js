// Ejercicio 6: servidor web con varias rutas, solo con el módulo http.
// Uso: node servidor.js            (puerto 3000)
//      PORT=4000 node servidor.js  (otro puerto)

const http = require('http');
const os = require('os');
const crypto = require('crypto');

// a) Puerto desde la variable de entorno PORT, o 3000 por defecto
const PORT = process.env.PORT || 3000;

function responder(res, codigo, tipo, cuerpo) {
  // d) Content-Type adecuado en cada respuesta
  res.writeHead(codigo, { 'Content-Type': tipo });
  res.end(cuerpo);
}

const servidor = http.createServer((req, res) => {
  // b) Método y ruta de cada petición
  console.log(req.method, req.url);

  // Quitamos la query string (?x=1) para comparar solo la ruta
  const ruta = new URL(req.url, 'http://localhost').pathname;

  // c) Respuesta según la ruta
  if (ruta === '/') {
    responder(res, 200, 'text/html; charset=utf-8',
      '<!DOCTYPE html>' +
      '<html lang="es"><head><meta charset="utf-8"><title>Servidor de 2º DAM</title></head>' +
      '<body>' +
      '<h1>Servidor de 2º DAM</h1>' +
      '<p>Prueba las rutas <a href="/info">/info</a> y <a href="/dado">/dado</a>.</p>' +
      '</body></html>');
  } else if (ruta === '/info') {
    const info = {
      sistemaOperativo: os.type(),
      cpus: os.cpus().length,
      versionNode: process.version
    };
    responder(res, 200, 'application/json', JSON.stringify(info));
  } else if (ruta === '/dado') {
    const dado = crypto.randomInt(1, 7); // el límite superior es exclusivo: 1..6
    responder(res, 200, 'text/html; charset=utf-8',
      '<!DOCTYPE html>' +
      '<html lang="es"><head><meta charset="utf-8"><title>Dado</title></head>' +
      `<body><h1>Has sacado un ${dado}</h1></body></html>`);
  } else {
    responder(res, 404, 'text/html; charset=utf-8', '404 - Página no encontrada');
  }
});

servidor.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
