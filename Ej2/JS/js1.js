var letrasDNI = [
  'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 
  'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'
];
var DNI = prompt("Introduce tu número de DNI (sin letra):");

if(DNI>1 && DNI<99999999 && DNI.length==8){
    resto = DNI % 23;

    alert("Hola su DNI completo es: " + DNI + "-" + letrasDNI[resto]);
    document.write("<h1>Hola su DNI completo es: " + DNI + "-" + letrasDNI[resto] + "</h1>");
}
else{
    alert("El DNI introducido no es válido");
    document.write("<h1>Hola su DNI no es válido</h1>");
}

