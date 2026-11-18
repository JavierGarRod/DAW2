const express = require('express');
const path = require('path');

const app = express();
const PUERTO = process.env.PORT || 3000;

// ---------------------------------------------------------------
// Ejercicio 2: motor de plantillas EJS y carpeta de vistas
// ---------------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------------------------------------------------------------
// Ejercicio 3: datos del catálogo
// ---------------------------------------------------------------
const libros = [
  { titulo: 'El Quijote', autor: 'Miguel de Cervantes', anio: 1605, disponible: true },
  { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, disponible: false },
  { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', anio: 2001, disponible: true },
  { titulo: 'Clean Code', autor: 'Robert C. Martin', anio: 2008, disponible: false },
  { titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', anio: 2007, disponible: true }
];

// ---------------------------------------------------------------
// Ejercicio 1: middleware de registro (hora, método y URL)
// Va el primero para que registre TODAS las peticiones.
// ---------------------------------------------------------------
app.use((req, res, next) => {
  const hora = new Date().toTimeString().slice(0, 8); // p. ej. 10:15:02
  console.log(`${hora} ${req.method} ${req.url}`);
  next(); // sin next() la petición se quedaría colgada
});

// Ejercicio 1: ficheros estáticos desde public
// (por eso en el HTML se escribe /css/estilos.css, sin "public")
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------
// Rutas
// ---------------------------------------------------------------
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' });
});

// Ejercicio 2: el horario se crea aquí y se pasa a la vista
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

// Ejercicio 3: catálogo completo
app.get('/libros', (req, res) => {
  res.render('libros', { titulo: 'Catálogo de libros', libros });
});

// Ejercicio 3: solo los disponibles, reutilizando la misma vista
app.get('/libros/disponibles', (req, res) => {
  const disponibles = libros.filter(libro => libro.disponible);
  res.render('libros', { titulo: 'Libros disponibles', libros: disponibles });
});

// ---------------------------------------------------------------
// Ejercicio 1: 404. Tiene que ir AL FINAL, después de todas las rutas.
// ---------------------------------------------------------------
app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página no encontrada' });
});

app.listen(PUERTO, () => {
  console.log(`Biblioteca IES escuchando en http://localhost:${PUERTO}`);
});
