var saldo = 30;

while (saldo > 0 && saldo < 120) {
    var apuestaDado = parseInt(prompt("Ingrese un número del dado para apostar (1-6) o 0 para salir:"));
    var apuestaCantidad = parseInt(prompt("Ingrese la cantidad que quiere apostar:"));

    if (apuestaDado === 0) {
        alert("Has decidido salir del juego. Tu saldo final es: " + saldo + "€");
        break;
    }  


    if (apuestaDado < 1 || apuestaDado > 6) {
        alert("Número de dado inválido. Debe estar entre 1 y 6.");
        continue;
    }  

    if (apuestaCantidad > saldo) {
        alert("No tienes suficiente saldo para esa apuesta. Tu saldo actual es: " + saldo + "€");
        continue;
    }   

    let dadoLanzado = Math.floor(Math.random() * 6) + 1;
    alert("El dado ha salido: " + dadoLanzado); 

    if (apuestaDado === dadoLanzado) {
        saldo += apuestaCantidad * 10;
        alert("¡Felicidades! Has acertado. Tu nuevo saldo es: " + saldo + "€");
    }   
    else {
        saldo -= apuestaCantidad;
        alert("Lo siento, no acertaste. Tu nuevo saldo es: " + saldo + "€");
    }

}