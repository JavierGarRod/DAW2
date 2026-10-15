class Employee {
    private nombre: string;
    private apellido: string;
    private edad: number;
    private fechaInicio: Date;
    private fechaFin: Date | null;
    private profesion: string;  

    constructor(nombre: string, apellido: string, edad: number, fechaInicio: Date, fechaFin: Date | null, profesion: string) {
        this.nombre = nombre;
        this.apellido = apellido;   
        this.edad = edad;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.profesion = profesion;
    }

    // Métodos get
    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getEdad(): number {
        return this.edad;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date | null {
        return this.fechaFin;
    }

    public getProfesion(): string {
        return this.profesion;
    }

    // Métodos set
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public setEdad(edad: number): void {
        this.edad = edad;
    }

    public setFechaInicio(fechaInicio: Date): void {
        this.fechaInicio = fechaInicio;
    }

    public setFechaFin(fechaFin: Date | null): void {
        this.fechaFin = fechaFin;
    }

    public setProfesion(profesion: string): void {
        this.profesion = profesion;
    }
}


const empleado1 = new Employee("Juan", "Pérez", 30, new Date("2020-01-01"), new Date("2023-01-01"), "Ingeniero");
const empleado2 = new Employee("María", "Gómez", 25, new Date("2021-06-15"), null, "Diseñadora");