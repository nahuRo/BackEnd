const fs = require('fs')

class Contenedor {
    constructor(name, products){
        this.name = name
        this.products = products
    }
    async save(object){
        try {
            this.products.push(object)
            await fs.promises.writeFile(`./2/${this.name}`, JSON.stringify(this.products)) // cambiar ubicacion a  ./
            return console.log(`${this.products.indexOf(object) + 1}º producto agregado correctamente`)
        } catch (error) {
            console.log(`Hubo un error en - save: ${error}`)
        }
    }
    async getById(id){
        try {
            const objetos = JSON.parse(await fs.promises.readFile(`./2/${this.name}`, 'utf-8'))
            return  objetos.map((obj, ind) => ind == id ? console.log(obj) : null)
        } catch (error) {
            console.log(`Hubo un error en - getById: ${error}`)
        }
    }
    async getAll(){
        try {
            return console.log(JSON.parse(await fs.promises.readFile(`./2/${this.name}`, 'utf-8')))  
        } catch (error) {
            console.log(`Hubo un error en - getAll: ${error}`)
        }
    }
    async deleteById(id){
        try {
            const objetos = JSON.parse(await fs.promises.readFile(`./2/${this.name}`, 'utf-8'))
            console.log(`objeto -> ${objetos[id].tittle}  Eliminado`)
            objetos.splice(id, 1)
            await fs.promises.writeFile(`./2/${this.name}`, JSON.stringify(objetos))
        } catch (error) {
            console.log(`Hubo un error en - deleteById: ${error}`)
        }
    }
    async deleteAll(){
        try {
            await fs.promises.writeFile(`./2/${this.name}`, '')
        } catch (error) {
            console.log(`Hubo un error en - deleteAll: ${error}`)
        }
    }

}

const productos = [
    {
        tittle: 'nombre1',
        price: 1000,
        thumbnail: 'sss'
    },
    {
        tittle: 'nombre2',
        price: 1000,
        thumbnail: 'sss'
    },
    {
        tittle: 'nombre3',
        price: 1000,
        thumbnail: 'sss'
    }
]


const Test = new Contenedor('prueba2.txt', productos);


const objeto = {
    tittle: 'nombre4',
    price: 1000,
    thumbnail: 'sss'
}

// Test.save(objeto)
// Test.getById(3)
// Test.getAll()
// Test.deleteById(0)
// Test.deleteAll()

