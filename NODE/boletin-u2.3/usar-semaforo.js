// Ejercicio 5 (d): uso de la clase Semaforo.
// Uso: node usar-semaforo.js

const Semaforo = require('./semaforo');

const semaforo = new Semaforo(1000); // cambia de color cada segundo

// Mostramos cada cambio de color
semaforo.on('cambio', (color) => {
  console.log(`Semáforo en ${color}`);
});

// Solo la primera vez que se pone en rojo
semaforo.once('rojo', () => {
  console.log('(primer rojo: ¡frena!)');
});

// Paramos el semáforo al segundo rojo
let rojos = 0;
semaforo.on('rojo', () => {
  rojos++;
  if (rojos === 2) {
    semaforo.parar();
  }
});

semaforo.on('parado', () => {
  console.log('Semáforo apagado');
});
