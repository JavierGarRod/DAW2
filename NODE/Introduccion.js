console.log("Hola mundo desde Node.js");
console.log("Version de Node.js:", process.version);

const fs = require('fs');
console.log("1.Abrendo un archivo de texto...");

fs.readFile('archivo.txt', 'utf8', (err, texto) => {
    if (err) return console.error(err.message)
    console.log("3.Contenido del archivo:", texto.trim())
})
console.log("2.Perdida la lectura, no epero")