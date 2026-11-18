// Ejercicio 2: temporizador de cocina.
// Uso: node temporizador.js 10 Sacar la pizza

// a) Segundos y mensaje (que puede tener varias palabras) desde process.argv
const argSegundos = process.argv[2];
const mensaje = process.argv.slice(3).join(' ') || '¡Tiempo!';

// b) Validación: entero mayor que 0
if (!/^\d+$/.test(argSegundos || '') || Number(argSegundos) <= 0) {
  console.error('Uso: node temporizador.js <segundos> [mensaje]');
  console.error('  <segundos> debe ser un número entero mayor que 0.');
  console.error('  Ejemplo: node temporizador.js 10 Sacar la pizza');
  process.exit(1);
}

const segundos = Number(argSegundos);
let restantes = segundos;

console.time('Duración total');

// d) Aviso de la mitad del tiempo
setTimeout(() => {
  console.log('¡Ya vas por la mitad!');
}, (segundos * 1000) / 2);

// c) Cuenta atrás cada segundo
const intervalo = setInterval(() => {
  restantes--;
  console.log(`Quedan ${restantes} s`);

  if (restantes === 0) {
    clearInterval(intervalo);
    console.log(mensaje);
    console.timeEnd('Duración total');
  }
}, 1000);
