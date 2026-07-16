const express = require('express'); //API que nos permitira pasar los datos del html al sql
const app = express(); //Servidor

const base_datos = require('./base_datos'); //Conectamos con los modulos de las bases de datos

app.use(express.urlencoded({ extended: true})); //Sirve para leer los datos enviados desde el formulario
app.use(express.json());
app.use(express.static('.')); 

//Ingresar datos
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

app.post('/productos', (req, res) => {
    const producto = req.body.producto;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;

    base_datos.insertarProductos(producto, cantidad, precio, descripcion);

    res.send('Guardado');
});

app.post('/contactos', (req, res) => {
    const contacto = req.body.contacto;
    const empresa = req.body.empresa;
    const cedula = req.body.cedula;
    const correo = req.body.correo;
    const telefono = req.body.telefono;

    base_datos.insertarClientes(contacto, empresa, cedula, correo, telefono);

    res.send('Guardado');
});

//Pedir datos
app.get("/productos", (req, res) => {
    const productos = base_datos.obtenerProductos();

    res.json(productos);
});

app.get("/contactos", (req, res) => {
    const contactos = base_datos.obtenerClientes();

    res.json(contactos);
});

//Eliminar datos
app.delete("/productos/:id", (req, res) => {
    const id = req.params.id;
    
    base_datos.eliminarProducto(id);

    res.send("Eliminado");
});

app.delete("/contactos/:id", (req, res) => {
    const id = req.params.id;
    
    base_datos.eliminarCliente(id);

    res.send("Eliminado");
});

app.listen(3000);