function contarPalabras(texto: string): number {
    // Dividir el texto en palabras utilizando el espacio como delimitador
    const palabras = texto.trim().split(/\s+/);
    // Devolver la cantidad de palabras
    return palabras.length;
}

function getAvenger(nombre: string, poder?: string, arma: string = "arco"): string {
    if (poder) {
        return `${nombre} tiene el poder de ${poder} y su arma es un ${arma}.`;
    } else {
        return `${nombre} no tiene un poder especial y su arma es un ${arma}.`;
    }
}

// Ejemplos de invocación de la función contarPalabras
console.log(contarPalabras("Hola, ¿cómo estás?")); // Salida: 3
console.log(contarPalabras("Este es un ejemplo de texto con varias palabras.")); // Salida: 9
console.log(contarPalabras("   Espacios   en blanco   al inicio y al final   ")); // Salida: 7
