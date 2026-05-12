const express = require('express'); //API que nos permitira pasar lso datos del html al sql
const app = express(); //Servidor

const base_datos = require('./base_datos'); //Conectamos con los modulos de las bases de datos

app.use(express.urlencoded({ extended: true})); //Sirve para leer los datos enviados desde el formulario
app.use(express.json());
app.use(express.static('.')); 

app.post('/registrar', (req, res) => { //cuando alguien envíe datos a /registrar usando POST, ejecuta esta función
    //Obtenemos datos del formulario
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const cedula = req.body.cedula;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;

    //Los enviamos
    base_datos.insertarDatos(nombre, apellidos, cedula, correo, contrasena);

    //Enviamos respuesta
    res.send('Guardado');
});

app.listen(3000);