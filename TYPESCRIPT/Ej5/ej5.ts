interface DispositivoElectronico {
    nombre: string;
    encendido: boolean;
    encender(): void;
    apagar(): void;
}

class Laptop implements DispositivoElectronico {
    nombre: string= "Laptop";
    encendido: boolean= false;
    encender(): void {
        throw new Error("Método no implementado.");
    }
    apagar(): void {
        throw new Error("Método no implementado.");
    }

    modelo: string= "MacBook Pro";
    abrirPrograma(): void {
        console.log(`Abriendo programa en ${this.modelo}`);
    };
} 

class Smartphone implements DispositivoElectronico {
    nombre: string= "Smartphone";
    encendido: boolean= false;
    encender(): void {
        throw new Error("Método no implementado.");
    };
    apagar(): void {
        throw new Error("Método no implementado.");
    };

    marca: string= "iPhone";
    llamar(): void {
        console.log(`Llamando a contacto en ${this.nombre}`);
    }
}

// Crear instancias de las clases
const miLaptop = new Laptop();
const miSmartphone = new Smartphone();

// Llamar a los métodos de las instancias
miLaptop.abrirPrograma();
miSmartphone.llamar();

// Llamar a los métodos de encendido y apagado
miLaptop.encender();
miLaptop.apagar();
miSmartphone.encender();
miSmartphone.apagar();