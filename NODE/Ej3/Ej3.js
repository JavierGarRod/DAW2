// Práctica: /saludo?nombre=Ana responde "Hola Ana"
const http = require('http')
const servidor = http.createServer((req, res) => {
 const url = new URL(req.url, 'http://localhost')
 res.setHeader('Content-Type', 'text/html; charset=utf-8')
 if (url.pathname === '/saludo') {
 const nombre = url.searchParams.get('nombre') || 'desconocido'
 return res.end(`<h1>Hola ${nombre}</h1>`)
 }
 res.statusCode = 404
 res.end('<h1>Error 404</h1>')
})
servidor.listen(3000, () => console.log('En el puerto 3000'))
