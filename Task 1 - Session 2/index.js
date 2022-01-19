class Usuario {

    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.libros = libros,
            this.mascotas = mascotas
    }

    getFullName = () => {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota = mascota => {
        this.mascotas = [...this.mascotas, mascota];
    }

    countMascotas = () => {
        return this.mascotas.length;
    }

    addBook = (nombre, autor) => {
        let book = { 'nombre': nombre, 'autor': autor }
        this.libros = [...this.libros, book];
    }

    getBookNames = () => {
        return this.libros.map((item) => item.nombre)
    }
}

let u1 = new Usuario('Carlos', 'Raez', [], []);

console.log(u1.getFullName());
u1.addMascota('Doki');
u1.addMascota('Angel');
console.log(u1.countMascotas());

u1.addBook('Los miserables', 'Victor Hugo');
u1.addBook('El conde de montecristo', 'Alejandro Dumas');

console.log(u1.getBookNames());