1. Código bloqueante y no bloqueante
a) Orden de ejecución
Respuesta: El orden habitual es A, D y, después, B y C; el orden relativo entre B y C puede variar según el momento en que termine la lectura del archivo. En una ejecución típica, suele verse A, D, B, C, pero no debe considerarse garantizado el orden entre los dos callbacks.
Primero se ejecuta console.log('A') en la pila de llamadas. setTimeout(..., 0) programa el callback para una fase posterior del event loop, no lo ejecuta inmediatamente. fs.readFile(...) inicia una lectura asíncrona y deja su callback pendiente. Después, readFileSync bloquea la ejecución hasta terminar la lectura; entonces se muestra D. Cuando el código síncrono termina, el event loop permite ejecutar los callbacks pendientes. El tiempo de finalización de la lectura y las fases del event loop determinan el orden relativo de B y C.

b) Bloqueante y no bloqueante
Respuesta: fs.readFileSync es bloqueante: no permite continuar hasta que la lectura termina. setTimeout y fs.readFile son no bloqueantes en este ejemplo: programan trabajo y permiten que el código síncrono continúe mientras esperan.

c) Archivo inexistente y gestión del error
const fs = require('fs')
 
console.log('A')
setTimeout(() => console.log('B'), 0)
fs.readFile('no-existe.txt', 'utf8', (err, datos) => {
  if (err) {
    console.error('Error de lectura:', err.message)
    return
  }
  console.log('C')
})
const texto = fs.readFileSync(__filename, 'utf8')
console.log('D', texto.length > 0)

Respuesta: La lectura recibe un error porque el archivo no existe; se muestra el mensaje de error y no se ejecuta el console.log('C'). El programa no se detiene por ese error, porque se gestiona dentro del callback. La lectura síncrona de __filename sigue funcionando.

d) process.version y document.title

console.log(process.version)
console.log(document.title)

Respuesta: process.version muestra la versión de Node.js, por ejemplo vXX.X.X. document.title provoca normalmente un ReferenceError porque document pertenece al entorno del navegador y no está definido en Node.js. Node.js proporciona APIs propias, como process y fs, mientras que el navegador ofrece objetos del DOM, como document.

2. Callbacks, promesas y async/await
Preparación de archivos

// config.json
{
  "entrada": "alumnos.txt",
  "salida": "informe.txt"
}
 
// alumnos.txt (ejemplo: un nombre por línea)
Ana
Luis
Marta
Pablo

a) ¿Por qué es callback hell?
Respuesta: Se habla de callback hell porque las operaciones asíncronas quedan anidadas unas dentro de otras, aumentando la indentación y dificultando la lectura y el mantenimiento. Cada operación debe esperar el resultado anterior: primero se lee config.json para conocer el nombre del archivo de entrada; después se lee ese archivo para contar sus líneas; por último, se escribe el informe.
Versión original con callbacks: procesar.js

const fs = require('fs')
 
fs.readFile('config.json', 'utf8', (err, datos) => {
  if (err) return console.error('Error:', err.message)
  const config = JSON.parse(datos)
 
  fs.readFile(config.entrada, 'utf8', (err, texto) => {
    if (err) return console.error('Error:', err.message)
    const lineas = texto.trim().split('\n').length
    const informe = `Fichero: ${config.entrada}\nLíneas: ${lineas}\n`
 
    fs.writeFile(config.salida, informe, (err) => {
      if (err) return console.error('Error:', err.message)
      console.log('Informe creado en', config.salida)
    })
  })
})

b) Versión con .then() y un único .catch(): procesar-then.js

const fs = require('fs/promises')
 
fs.readFile('config.json', 'utf8')
  .then(datos => {
    const config = JSON.parse(datos)
    return fs.readFile(config.entrada, 'utf8')
      .then(texto => ({ config, texto }))
  })
  .then(({ config, texto }) => {
    const lineas = texto.trim() ? texto.trim().split(/\r?\n/).length : 0
    const informe = `Fichero: ${config.entrada}\nLíneas: ${lineas}\n`
    return fs.writeFile(config.salida, informe)
      .then(() => config.salida)
  })
  .then(salida => console.log('Informe creado en', salida))
  .catch(err => console.error('Error:', err.message))

c) Versión con async/await: procesar-async.js

const fs = require('fs/promises')
 
async function procesar() {
  try {
    const datos = await fs.readFile('config.json', 'utf8')
    const config = JSON.parse(datos)
    const texto = await fs.readFile(config.entrada, 'utf8')
    const lineas = texto.trim() ? texto.trim().split(/\r?\n/).length : 0
    const informe = `Fichero: ${config.entrada}\nLíneas: ${lineas}\n`
 
    await fs.writeFile(config.salida, informe)
    console.log('Informe creado en', config.salida)
  } catch (err) {
    console.error('Error:', err.message)
  }
}
 
procesar()

d) Eliminar o renombrar alumnos.txt
Respuesta: En la versión con callbacks hay que comprobar el error en cada callback de operación asíncrona: en la lectura de config.json, en la lectura de alumnos.txt y en la escritura del informe. En la versión con promesas, un único .catch() al final puede recoger los rechazos de la cadena. En la versión async/await, un único try/catch alrededor de las operaciones puede capturar los errores que se produzcan dentro del bloque.
Si alumnos.txt no existe, las tres versiones informan del error de lectura y no generan el informe. En el código con callbacks, el error se muestra en el callback de la segunda lectura; en las otras versiones, lo captura el manejador común.

e) Esperar un segundo antes de escribir

const fs = require('fs/promises')
 
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
 
async function procesar() {
  try {
    const datos = await fs.readFile('config.json', 'utf8')
    const config = JSON.parse(datos)
    const texto = await fs.readFile(config.entrada, 'utf8')
    const lineas = texto.trim() ? texto.trim().split(/\r?\n/).length : 0
    const informe = `Fichero: ${config.entrada}\nLíneas: ${lineas}\n`
 
    await esperar(1000)
    await fs.writeFile(config.salida, informe)
    console.log('Informe creado en', config.salida)
  } catch (err) {
    console.error('Error:', err.message)
  }
}
 
procesar()

Explicación: esperar(ms) devuelve una promesa que se resuelve cuando termina el temporizador. await esperar(1000) pausa esa función async durante un segundo sin bloquear el hilo principal de Node.js.

3. Proyecto con módulos y npm
3.1 y 3.2) Inicializar el proyecto y crear notas.json

mkdir notas-app
cd notas-app
npm init -y
[
  { "nombre": "Ana", "nota": 7.5 },
  { "nombre": "Luis", "nota": 4.2 },
  { "nombre": "Marta", "nota": 8.8 },
  { "nombre": "Pablo", "nota": 5.0 },
  { "nombre": "Lucía", "nota": 9.1 }
]

3.3) Módulo notas.js

function media(lista) {
  if (lista.length === 0) return 0
  return lista.reduce((suma, alumno) => suma + alumno.nota, 0) / lista.length
}
 
function aprobados(lista) {
  return lista.filter(alumno => alumno.nota >= 5)
}
 
function mejor(lista) {
  if (lista.length === 0) return null
  return lista.reduce((mejorAlumno, alumno) =>
    alumno.nota > mejorAlumno.nota ? alumno : mejorAlumno
  )
}
 
module.exports = { media, aprobados, mejor }

3.4 y 3.5) app.js: leer datos, mostrar resumen y colorear

const fs = require('fs/promises')
const pc = require('picocolors')
const { media, aprobados, mejor } = require('./notas')
 
async function main() {
  try {
    const datos = await fs.readFile('notas.json', 'utf8')
    const lista = JSON.parse(datos)
    const listaAprobados = aprobados(lista)
    const alumnoMejor = mejor(lista)
 
    console.log(`Nota media: ${media(lista).toFixed(2)}`)
    console.log(`Número de aprobados: ${listaAprobados.length}`)
    console.log(`Mejor alumno: ${alumnoMejor ? alumnoMejor.nombre : 'Ninguno'}`)
    console.log('\nNotas de la clase:')
 
    for (const alumno of lista) {
      const linea = `${alumno.nombre}: ${alumno.nota}`
      console.log(alumno.nota >= 5 ? pc.green(linea) : pc.red(linea))
    }
  } catch (err) {
    console.error('Error:', err.message)
  }
}
 
main()
npm install picocolors

3.6) Scripts start y dev
En package.json, dentro de la propiedad scripts, deja una configuración equivalente a esta (conservando las demás propiedades del archivo):

"scripts": {
  "start": "node app.js",
  "dev": "node --watch app.js"
}
npm start
npm run dev

¿Qué ocurre con npm run dev? Node.js ejecuta app.js y vigila los cambios del archivo. Al guardar una modificación en app.js, el proceso se reinicia automáticamente. La opción --watch vigila principalmente el archivo de entrada y los archivos que Node.js tiene registrados como dependencias; si se modifica solo notas.json, el comportamiento puede depender de la versión y de si ese archivo está vigilado.

3.7) .gitignore, npm install y archivos de dependencias

# .gitignore
node_modules
.env
# Desde la carpeta notas-app:
rm -rf node_modules
npm install
npm start

package.json: Contiene los metadatos del proyecto, los scripts y las dependencias declaradas, por ejemplo picocolors.
package-lock.json: Registra las versiones concretas resueltas de las dependencias y parte de su árbol, para que las instalaciones sean más reproducibles. npm install puede reconstruir node_modules usando estos archivos.