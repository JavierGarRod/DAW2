const express = require('express');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Middleware de registro: hora, método y URL de cada petición
app.use((req, res, next) => {
  const hora = new Date().toTimeString().slice(0, 8); // p. ej. 10:15:02
  console.log(`${hora} ${req.method} ${req.url}`);
  next(); // sin next() la petición se quedaría colgada
});

// Ficheros estáticos desde public (en el HTML: /css/estilos.css, sin "public")
app.use(express.static(path.join(__dirname, 'public')));

// Rutas: envían ficheros HTML con res.sendFile (necesita ruta absoluta)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/horario', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'horario.html'));
});

// 404: tiene que ir AL FINAL, después de todas las rutas
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PUERTO, () => {
  console.log(`Biblioteca IES escuchando en http://localhost:${PUERTO}`);
});
