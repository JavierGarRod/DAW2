 class Animal {
    protected nombre: string;
    protected edad: number;
    protected tipo: string;

    constructor(nombre: string, edad: number, tipo: string) {
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
    }

    // Métodos get
    public getNombre(): string {
        return this.nombre;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getTipo(): string {
        return this.tipo;
    }

    // Métodos set
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setEdad(edad: number): void {
        this.edad = edad;
    }

    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }

    // Método hacerRuido
    public hacerRuido(): void {
        console.log(`${this.nombre} hace un sonido.`);
    }
}

class Perro extends Animal {
    constructor(nombre: string, edad: number) {
        super(nombre, edad, "Perro");
    }

    // Sobrescribir el método hacerRuido
    public hacerRuido(): void {
        console.log(`${this.nombre} ladra.`);
    }
}

class Gato extends Animal {
    constructor(nombre: string, edad: number) {
        super(nombre, edad, "Gato");
    }
    // Sobrescribir el método hacerRuido
    public hacerRuido(): void {
        console.log(`${this.nombre} maúlla.`);
    }
}

// Crear instancias de Perro y Gato
const miPerro = new Perro("Rex", 3);
const miGato = new Gato("Mittens", 2);