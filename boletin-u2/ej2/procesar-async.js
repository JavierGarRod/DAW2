const fs = require('fs/promises')

async function main() {
  try {
    const datos = await fs.readFile('config.json', 'utf8')
    const config = JSON.parse(datos)
    const texto = await fs.readFile(config.entrada, 'utf8')
    const lineas = texto.trim().split('\n').length
    const informe = `Fichero: ${config.entrada}\nLíneas: ${lineas}\n`
    await fs.writeFile(config.salida, informe)
    console.log('Informe creado en', config.salida)
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()