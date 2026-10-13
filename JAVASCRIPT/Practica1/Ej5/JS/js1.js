var marca = prompt("Ingrese la marca del ordenador: ");
var modelo = prompt("Ingrese el modelo del ordenador: ");
var precio = 1000;
var descuento;

if (marca.toUpperCase() === "MSI" && modelo.toUpperCase() === "PRESTIGE") {
    descuento = 0.05;
}
else if (marca.toUpperCase() === "HP" && modelo.toUpperCase() === "PAVILION") {
    descuento = 0.10;
}

var precioFinal = precio - (precio * descuento);

document.write("<br>El precio final del ordenador " + marca + " " + modelo + " es: $" + precioFinal.toFixed(2));