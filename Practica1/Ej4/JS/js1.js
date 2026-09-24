var mediaNota=prompt("Ingrese la media de la nota: ");
var notaExamen=prompt("Ingrese la nota del examen: ");
var notaActitud=prompt("Ingrese la nota de actitud: ");

var notaFinal= (mediaNota*0.55) + (notaExamen*0.30) + (notaActitud*0.15);
if (notaFinal>=5){
    alert("El alumno ha aprobado con una nota final de: " + notaFinal);
}
else{
    alert("El alumno ha suspendido con una nota final de: " + notaFinal);
}

document.write("<br>El alumno ha " + (notaFinal>=5 ? "aprobado" : "suspendido") + " con una nota final de: " + notaFinal);