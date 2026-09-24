var numero = prompt("Ingrese un número para mostrar en los encabezados:");

for (var i = 1; i <= numero; i++) {
    var encabezado = document.createElement(`h${i}`);
    encabezado.textContent = `Encabezado de nivel ${i}`;
    document.body.appendChild(encabezado);
}
