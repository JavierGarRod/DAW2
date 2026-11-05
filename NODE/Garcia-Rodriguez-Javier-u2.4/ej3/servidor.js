// Ejercicio 3 · Libro de visitas con GET y POST
// Uso: node --watch servidor.js   (escucha en http://localhost:3000)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PUERTO = 3000;
const MAX_MENSAJE = 200; // caracteres máximos del mensaje

const HTML = 'text/html; charset=utf-8';
const JSON_UTF8 = 'application/json; charset=utf-8';
const TEXTO = 'text/plain; charset=utf-8';

// Las firmas viven solo en memoria: al reiniciar el servidor se pierden
const firmas = [];

// Ampliación: evita que el texto del usuario se interprete como HTML.
// Primero hay que cambiar el & (si no, volveríamos a cambiar los &lt; y &gt; ya creados).
function escaparHTML(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

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

function enviar(res, codigo, tipo, cuerpo) {
  res.writeHead(codigo, { 'Content-Type': tipo });
  res.end(cuerpo);
}

const servidor = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // new URL lanza una excepción con rutas mal formadas (por ejemplo "//"):
  // la controlamos para que una petición rara no tire el servidor.
  let url;
  try {
    url = new URL(req.url, 'http://localhost');
  } catch (error) {
    enviar(res, 400, TEXTO, 'Error 400: petición no válida');
    return;
  }

  // Se compara url.pathname (sin la query string) y el método
  if (req.method === 'GET' && url.pathname === '/') {
    fs.readFile(path.join(__dirname, 'recursos', 'formulario.html'), (error, contenido) => {
      if (error) {
        console.error(`No se pudo leer formulario.html: ${error.message}`);
        enviar(res, 500, TEXTO, 'Error 500: el servidor no ha podido leer el formulario.');
        return;
      }
      enviar(res, 200, HTML, contenido);
    });

  } else if (req.method === 'POST' && url.pathname === '/firmar') {
    // Declarado DENTRO de la función de la petición: cada petición tiene su propio cuerpo
    let cuerpo = '';

    req.setEncoding('utf8'); // así las tildes y la ñ no se rompen si llegan partidas entre trozos
    req.on('data', (trozo) => {
      cuerpo += trozo;
    });

    // Si el cliente corta la conexión a medias, evitamos que el error tire el servidor
    req.on('error', (error) => {
      console.error(`Error leyendo la petición: ${error.message}`);
    });

    // Hasta que no llega 'end' los datos están incompletos: toda la respuesta va aquí dentro
    req.on('end', () => {
      const datos = new URLSearchParams(cuerpo);
      const nombre = (datos.get('nombre') || '').trim();
      const mensaje = (datos.get('mensaje') || '').trim();
      const longitudMensaje = [...mensaje].length; // cuenta caracteres, no unidades UTF-16

      const errores = [];
      if (nombre === '') {
        errores.push('El nombre es obligatorio.');
      }
      if (mensaje === '') {
        errores.push('El mensaje es obligatorio.');
      } else if (longitudMensaje > MAX_MENSAJE) {
        errores.push(`El mensaje puede tener como máximo ${MAX_MENSAJE} caracteres y el tuyo tiene ${longitudMensaje}.`);
      }

      if (errores.length > 0) {
        enviar(res, 400, HTML, pagina('Error 400',
          '  <h1>No se ha podido firmar</h1>\n' +
          '  <ul>\n' +
          errores.map((error) => `    <li>${error}</li>`).join('\n') + '\n' +
          '  </ul>\n' +
          '  <p><a href="/">Volver al formulario</a></p>'));
        return;
      }

      firmas.push({ nombre, mensaje, fecha: new Date().toISOString() });

      enviar(res, 201, HTML, pagina('Gracias',
        `  <h1>Gracias por firmar, ${escaparHTML(nombre)}</h1>\n` +
        '  <p><a href="/">Volver al formulario</a> · <a href="/firmas">Ver las firmas</a></p>'));
    });

  } else if (req.method === 'GET' && url.pathname === '/firmas') {
    // /firmas?nombre=Ana → solo las firmas de ese nombre
    const filtro = url.searchParams.get('nombre');
    let resultado = firmas;

    if (filtro) {
      resultado = firmas.filter((firma) => firma.nombre === filtro);
    }

    enviar(res, 200, JSON_UTF8, JSON.stringify(resultado, null, 2));

  } else {
    enviar(res, 404, HTML, pagina('Error 404',
      '  <h1>Error 404</h1>\n' +
      '  <p>La página que buscas no existe.</p>\n' +
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
