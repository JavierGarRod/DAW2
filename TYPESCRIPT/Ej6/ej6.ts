class Almacen<cosas> {
    private elementos: cosas[] = [];

    // Método para agregar un elemento
    agregarElemento(elemento: cosas): void {
        this.elementos.push(elemento);
    }

    // Método para obtener un elemento por su posición
    obtenerElemento(posicion: number): cosas | undefined {
        return this.elementos[posicion];
    }

    // Método para listar todos los elementos
    listarElementos(): cosas[] {
        return [...this.elementos];
    }
}

// Interfaz para definir los objetos Producto
interface Producto {
    nombre: string;
    precio: number;
}

// Almacén de números
const almacenNumeros = new Almacen<number>();
almacenNumeros.agregarElemento(10);
almacenNumeros.agregarElemento(20);
almacenNumeros.agregarElemento(30);

console.log("Almacén de números:");
console.log(almacenNumeros.listarElementos());
console.log("Elemento en posición 1:", almacenNumeros.obtenerElemento(1));

// Almacén de cadenas
const almacenCadenas = new Almacen<string>();
almacenCadenas.agregarElemento("Hola");
almacenCadenas.agregarElemento("Betis");
almacenCadenas.agregarElemento("Pepe");

console.log("\nAlmacén de cadenas:");
console.log(almacenCadenas.listarElementos());
console.log("Elemento en posición 0:", almacenCadenas.obtenerElemento(0));

// Almacén de objetos
const almacenProductos = new Almacen<Producto>();
almacenProductos.agregarElemento({ nombre: "Teclado", precio: 25 });
almacenProductos.agregarElemento({ nombre: "Ratón", precio: 15 });

console.log("\nAlmacén de productos:");
console.log(almacenProductos.listarElementos());
console.log("Producto en posición 1:", almacenProductos.obtenerElemento(1));