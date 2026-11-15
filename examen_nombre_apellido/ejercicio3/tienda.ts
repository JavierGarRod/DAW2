// Ejercicio 3.3 - TypeScript: modelo de la tienda

// 1. Enum de categorías
enum Categoria {
  Hardware,
  Software,
  Servicio
}

// 2. Interfaz Facturable
interface Facturable {
  calcularTotal(): number;
}

// 3. Clase Producto
class Producto implements Facturable {
  public nombre: string;
  private precio: number;
  private categoria: Categoria;
  private unidades: number;

  constructor(nombre: string, precio: number, categoria: Categoria, unidades: number = 1) {
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.unidades = unidades;
  }

  calcularTotal(): number {
    return this.precio * this.unidades;
  }
}

// 4. Clase ProductoDigital que hereda de Producto
class ProductoDigital extends Producto {
  private licencia: string;

  // La categoría siempre es Software, así que no se recibe
  constructor(nombre: string, precio: number, licencia: string) {
    super(nombre, precio, Categoria.Software);
    this.licencia = licencia;
  }

  mostrar(): string {
    return `${this.nombre} (${this.licencia}) - ${this.calcularTotal()} €`;
  }
}

// 5. Clase genérica Lista<T>
class Lista<T> {
  private elementos: T[] = [];

  agregar(x: T): void {
    this.elementos.push(x);
  }

  obtener(posicion: number): T | undefined {
    return this.elementos[posicion];
  }

  cantidad(): number {
    return this.elementos.length;
  }
}

// 6. Función con parámetro opcional
function aplicarDescuento(total: number, porcentaje?: number): number {
  if (porcentaje === undefined) {
    return total;
  }
  return total - (total * porcentaje) / 100;
}

// Programa principal
const raton: Producto = new Producto("Ratón", 15, Categoria.Hardware, 2);
const office: ProductoDigital = new ProductoDigital("Office", 99, "Anual");

const productos: Lista<Producto> = new Lista<Producto>();
productos.agregar(raton);
productos.agregar(office);

for (let i = 0; i < productos.cantidad(); i++) {
  const producto = productos.obtener(i);
  if (producto === undefined) {
    continue;
  }
  if (producto instanceof ProductoDigital) {
    console.log(producto.mostrar());
  } else {
    console.log(producto.calcularTotal());
  }
}
