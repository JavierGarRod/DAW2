var nombres = prompt("Ingrese una lista de nombres separados por coma:");
var listaNombres = nombres.split(",");
var i=listaNombres.length-1;

for (var i in listaNombres) {
    document.write("<p>Hola, " + listaNombres[i] + "!</p>");
}

document.write("<p>El último nombre de la lista es: " + listaNombres[i] + "</p>");
document.write("<p>El primer nombre de la lista es: " + listaNombres[0] + "</p>");
document.write("<p>El número de nombres en la lista es: " + listaNombres.length + "</p>");

console.log(listaNombres.sort()); // lista ordenada alfabéticamente
console.log(listaNombres.reverse()); // lista ordenada alfabéticamente al revés