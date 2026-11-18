// routes/web.js -> páginas generales
const express = require('express')
const router = express.Router()

// Prefijo '/' en app.js -> URL final: /
router.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio' })
})

// Prefijo '/' en app.js -> URL final: /contacto
router.get('/contacto', (req, res) => {
  res.render('contacto', { titulo: 'Contacto' })
})

module.exports = router
