class Usuario{
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){ 
        console.log(`Nombre completo: ${this.nombre} ${this.apellido}`);
    }
    addMascotas(mascotaName){ 
        this.mascotas.push(mascotaName);
    }
    countMascotas(){    
        console.log(`Cantidad de mascotas: ${this.mascotas.length}`)
    }
    addBook(bookName, bookAuthor){
        this.libros.push({nombre:bookName, autor:bookAuthor})
    }
    getBookNames(){
        console.log(this.libros.map(book => book.nombre))
    }
}

const user = new Usuario("Agustín","Rodriguez");

user.getFullName()

user.addMascotas("paco")
user.addMascotas("luna")
user.addMascotas("negro")
user.countMascotas()


user.addBook("Cien años de soledad","Gabriel García Márquez")
user.addBook("Nada","Carmen Laforet")
user.addBook("Crónicas marcianas","Ray Bradbury")
user.getBookNames()
