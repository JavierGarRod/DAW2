// Ejercicio 3: caracteres y bytes.
// Uso: node bytes.js hola
//      node bytes.js "5 €"

// a) El texto llega por la terminal (si hay varias palabras sin comillas, se unen)
const texto = process.argv.slice(2).join(' ');

if (texto === '') {
  console.error('Uso: node bytes.js <texto>');
  process.exit(1);
}

console.log('Texto:      ', texto);
console.log('Caracteres: ', texto.length);              // unidades UTF-16 del string
console.log('Bytes:      ', Buffer.byteLength(texto));  // bytes en UTF-8 (codificación por defecto)
console.log('Buffer:     ', Buffer.from(texto));

// c) El abecedario en mayúsculas con un Buffer de 26 bytes ("A" = 65)
const abecedario = Buffer.alloc(26);
for (let i = 0; i < abecedario.length; i++) {
  abecedario[i] = 65 + i;
}

console.log('\nAbecedario:', abecedario.toString());
console.log('Buffer:    ', abecedario);
