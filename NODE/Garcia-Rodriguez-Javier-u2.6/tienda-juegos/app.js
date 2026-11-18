const express = require('express')
const app = express()
const PORT = 3000

// Motor de plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

// Ficheros estáticos
app.use(express.static(__dirname + '/public'))

// Rutas: prefijo + fichero de rutas
// URL final = prefijo de app.use + ruta del router
app.use('/', require('./routes/web'))
app.use('/juegos', require('./routes/juegos'))
app.use('/plataformas', require('./routes/plataformas'))

// 404: siempre la última
app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página no encontrada' })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
