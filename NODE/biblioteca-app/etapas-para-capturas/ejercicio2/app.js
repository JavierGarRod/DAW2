const express = require('express');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;

// Motor de plantillas EJS y carpeta de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware de registro: hora, método y URL de cada petición
app.use((req, res, next) => {
  const hora = new Date().toTimeString().slice(0, 8); // p. ej. 10:15:02
  console.log(`${hora} ${req.method} ${req.url}`);
  next();
});

// Ficheros estáticos desde public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' });
});

// El horario se crea aquí y se pasa a la vista
app.get('/horario', (req, res) => {
  const horario = [
    { dia: 'Lunes', horas: '8:30 - 14:30' },
    { dia: 'Martes', horas: '8:30 - 14:30' },
    { dia: 'Miércoles', horas: '8:30 - 14:30' },
    { dia: 'Jueves', horas: '8:30 - 14:30 y 16:00 - 19:00' },
    { dia: 'Viernes', horas: '8:30 - 13:30' }
  ];
  res.render('horario', { titulo: 'Horario', horario });
});

// 404 al final
app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página no encontrada' });
});

app.listen(PUERTO, () => {
  console.log(`Biblioteca IES escuchando en http://localhost:${PUERTO}`);
});
