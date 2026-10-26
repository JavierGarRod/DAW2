const fs = require('fs')
console.log('A')
setTimeout(() => console.log('B'), 0)
fs.readFile('no-existe.txt', 'utf8', (err, datos) => {
  if (err) return console.error('Error:', err.message)
  console.log('C')
})
const texto = fs.readFileSync(__filename, 'utf8')
console.log('D', texto.length > 0)