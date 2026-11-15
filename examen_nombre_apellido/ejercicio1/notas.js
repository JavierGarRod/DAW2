// Ejercicio 1.3 - Notas de un módulo (JavaScript, sin DOM)

// 1. Pide las notas con prompt y devuelve solo las válidas (números entre 0 y 10)
function pedirNotas() {
  const entrada = prompt("Introduce las notas separadas por comas (ej: 7.5,4,9,x,6,12):");
  const validas = [];

  if (entrada === null) {
    return validas; // el usuario canceló el prompt
  }

  const partes = entrada.split(",");
  for (const parte of partes) {
    const texto = parte.trim();
    const nota = Number(texto);

    if (texto !== "" && !isNaN(nota) && nota >= 0 && nota <= 10) {
      validas.push(nota);
    } else {
      console.log("Nota no válida: " + texto);
    }
  }

  return validas;
}

// 2. Recibe el array y devuelve la media
function calcularMedia(notas) {
  if (notas.length === 0) {
    return 0;
  }
  let suma = 0;
  for (const nota of notas) {
    suma += nota;
  }
  return suma / notas.length;
}

// 3. Devuelve el texto de la nota usando un switch sobre la parte entera
function calificacion(nota) {
  switch (Math.floor(nota)) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return "Insuficiente";
    case 5:
      return "Suficiente";
    case 6:
      return "Bien";
    case 7:
    case 8:
      return "Notable";
    case 9:
    case 10:
      return "Sobresaliente";
    default:
      return "Nota fuera de rango";
  }
}

// 4. Programa principal
const notas = pedirNotas();

if (notas.length === 0) {
  alert("No hay ninguna nota válida");
} else {
  const media = calcularMedia(notas);
  const aprobados = notas.filter(function (n) {
    return n >= 5;
  }).length;

  alert(
    "Media: " + media.toFixed(2) + " - " + calificacion(media) + "\n" +
    "Aprobados: " + aprobados + " de " + notas.length
  );
}
