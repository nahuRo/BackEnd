const fs = require('fs')


// Sincrinicas

// readFileSync:  lectura de un archivo en forma sincrónica
// writeFileSync:  escritura de un archivo en forma sincrónica . SOBREESCRIBE
// appendFileSync:  actualización de un archivo en forma sincrónica. AGRAGA
// unlinkSync:  borrado de un archivo en forma sincrónica
// mkdirSync:  creación de una carpeta

const array = [{id:1},{id:2}]
fs.writeFileSync('./prueba.txt', JSON.stringify(array))

console.log(fs.readFileSync('./prueba.txt','utf-8'))



// Asincronicas

// readFile: lectura de un archivo en forma asincrónica
// writeFile: escritura de un archivo en forma asincrónica
// appendFile: actualización de un archivo en forma asincrónica
// unlink: borrado de un archivo en forma asincrónica
// mkdir: creación de una carpeta

fs.readFile('./prueba.txt','utf-8', (error, resolve) => {
    error ? console.log('Hubo un error') : console.log(resolve)
})