const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');

  if (url.pathname === '/saludo') {
    const nombre = url.searchParams.get('nombre') || "desconocido";
    return res.end(`<h1>Hola, ${nombre}!</h1>`);

  }
  else{
    res.writeHead(404);
    res.end();
  }
    
});

server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
