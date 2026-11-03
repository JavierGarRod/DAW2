// Ejercicio 5 (a, b, c): clase Semaforo basada en EventEmitter.

const EventEmitter = require('events');

const COLORES = ['verde', 'ámbar', 'rojo'];

class Semaforo extends EventEmitter {
  // a) Recibe cada cuántos milisegundos cambia de color y empieza en verde
  constructor(milisegundos) {
    super();
    this.indice = 0;
    this.color = COLORES[this.indice];

    // b) Cada cambio: verde → ámbar → rojo → verde…
    this.temporizador = setInterval(() => {
      this.indice = (this.indice + 1) % COLORES.length;
      this.color = COLORES[this.indice];

      this.emit('cambio', this.color);

      if (this.color === 'rojo') {
        this.emit('rojo');
      }
    }, milisegundos);
  }

  // c) Detiene el semáforo y avisa con 'parado'
  parar() {
    clearInterval(this.temporizador);
    this.emit('parado');
  }
}

module.exports = Semaforo;
