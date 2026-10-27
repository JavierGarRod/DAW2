const os=require('os');
const fs=require('fs');
const path=require('path');

const ruta=path.join(__dirname,'ficha.txt');
const texto=`Usuario: ${os.userInfo().username}\nSistema: ${os.type()}\nCPUs: ${os.cpus().length}\n`;
fs.writeFileSync(ruta,texto);
console.log(fs.readFileSync(ruta,'utf-8'));