const fs = require('fs/promises')
const pc = require('picocolors')
const { media, aprobados, mejor } = require('./notas')

async function main() {
  const contenido = await fs.readFile('notas.json', 'utf8')
  const alumnos = JSON.parse(contenido)

  console.log('--- Notas de la clase ---')
  for (const alumno of alumnos) {
    const linea = `${alumno.nombre}: ${alumno.nota}`
    console.log(alumno.nota >= 5 ? pc.green(linea) : pc.red(linea))
  }

  console.log()
  console.log('Nota media:', media(alumnos).toFixed(2))
  console.log('Aprobados:', aprobados(alumnos).length)
  console.log('Mejor alumno:', mejor(alumnos).nombre)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})