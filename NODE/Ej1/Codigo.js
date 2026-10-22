const fs = require('fs');

async function leerArchivo() {
    try{
        const textoA = await fs.promises.readFile('a.txt', 'utf8');
        const textoB = await fs.promises.readFile('b.txt', 'utf8');
        const textoC = await fs.promises.readFile('c.txt', 'utf8');

        const texto= textoA + textoB + textoC;
        await fs.writeFile('texto.txt', texto);
        
        console.log("Archivo creado con exito");
    }
    catch(err){
        console.error("Error: " + err.message);
    }
}

leerArchivo()