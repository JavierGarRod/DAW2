"use strict";
// Ejercicio 3.3 - TypeScript: modelo de la tienda
// 1. Enum de categorías
var Categoria;
(function (Categoria) {
    Categoria[Categoria["Hardware"] = 0] = "Hardware";
    Categoria[Categoria["Software"] = 1] = "Software";
    Categoria[Categoria["Servicio"] = 2] = "Servicio";
})(Categoria || (Categoria = {}));
// 3. Clase Producto
class Producto {
    nombre;
    precio;
    categoria;
    unidades;
    constructor(nombre, precio, categoria, unidades = 1) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.unidades = unidades;
    }
    calcularTotal() {
        return this.precio * this.unidades;
    }
}
// 4. Clase ProductoDigital que hereda de Producto
class ProductoDigital extends Producto {
    licencia;
    // La categoría siempre es Software, así que no se recibe
    constructor(nombre, precio, licencia) {
        super(nombre, precio, Categoria.Software);
        this.licencia = licencia;
    }
    mostrar() {
        return `${this.nombre} (${this.licencia}) - ${this.calcularTotal()} €`;
    }
}
// 5. Clase genérica Lista<T>
class Lista {
    elementos = [];
    agregar(x) {
        this.elementos.push(x);
    }
    obtener(posicion) {
        return this.elementos[posicion];
    }
    cantidad() {
        return this.elementos.length;
    }
}
// 6. Función con parámetro opcional
function aplicarDescuento(total, porcentaje) {
    if (porcentaje === undefined) {
        return total;
    }
    return total - (total * porcentaje) / 100;
}
// Programa principal
const raton = new Producto("Ratón", 15, Categoria.Hardware, 2);
const office = new ProductoDigital("Office", 99, "Anual");
const productos = new Lista();
productos.agregar(raton);
productos.agregar(office);
for (let i = 0; i < productos.cantidad(); i++) {
    const producto = productos.obtener(i);
    if (producto === undefined) {
        continue;
    }
    if (producto instanceof ProductoDigital) {
        console.log(producto.mostrar());
    }
    else {
        console.log(producto.calcularTotal());
    }
}
