// routes/juegos.js -> catálogo de juegos
const express = require('express')
const router = express.Router()

const arrayJuegos = [
  { id: 'j01', titulo: 'Mario Kart 8 Deluxe', plataforma: 'Switch', precio: 49.99 },
  { id: 'j02', titulo: 'Minecraft', plataforma: 'PC', precio: 26.95 },
  { id: 'j03', titulo: 'EA Sports FC 26', plataforma: 'PS5', precio: 69.99 },
  { id: 'j04', titulo: 'Stardew Valley', plataforma: 'PC', precio: 13.99 },
  { id: 'j05', titulo: 'Zelda: Tears of the Kingdom', plataforma: 'Switch', precio: 59.99 }
]

// Prefijo '/juegos' + ruta '/' -> URL final: /juegos
// (no se escribe '/juegos' aquí: ya lo pone el prefijo de app.use)
router.get('/', (req, res) => {
  res.render('juegos', { titulo: 'Juegos', arrayJuegos })
})

// Prefijo '/juegos' + ruta '/baratos' -> URL final: /juegos/baratos
router.get('/baratos', (req, res) => {
  const baratos = arrayJuegos.filter(juego => juego.precio < 30)
  // La vista espera la variable arrayJuegos, así que le pasamos la lista filtrada con ese nombre
  res.render('juegos', { titulo: 'Juegos de menos de 30 €', arrayJuegos: baratos })
})

module.exports = router
