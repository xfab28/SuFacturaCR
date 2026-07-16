const DataBase = require('better-sqlite3');

//Conectamos
function conectar() {
    const db = new DataBase('./DB/base_datos.db');
    return db;
}

//Creamos tablas
function crear_tablas() {
    const db = conectar();
    db.exec(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre      TEXT NOT NULL,
            apellidos   TEXT NOT NULL,
            cedula      INTEGER,
            correo      TEXT NOT NULL,
            contrasenia TEXT NOT NULL
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS facturas_aprobadas (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente         TEXT NOT NULL,
            descripcion     TEXT NOT NULL,
            tipo_iva        TEXT NOT NULL,
            cant_impuestos  INTEGER,
            monto           INTEGER,
            fecha           TEXT NOT NULL,
            hora            TEXT NOT NULL
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS facturas_temporales (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente         TEXT NOT NULL,
            descripcion     TEXT NOT NULL,
            tipo_iva        TEXT NOT NULL,
            cant_impuestos  INTEGER,
            monto           INTEGER,
            fecha           TEXT NOT NULL,
            hora            TEXT NOT NULL
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS productos (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            producto    TEXT NOT NULL,
            cantidad    INTEGER,
            precio      INTEGER,
            descripcion TEXT NOT NULL
        )
    `);
    db.exec(`
        CREATE TABLE IF NOT EXISTS clientes (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            contacto TEXT NOT NULL,
            empresa  TEXT NOT NULL,
            cedula   INTEGER,
            correo   TEXT NOT NULL,
            telefono INTEGER
        )
    `);

    console.log('Tabla creada');
}

//Insertar datos
function insertarDatos(nombre, apellidos, cedula, correo, contrasenia) {
    const db = conectar();
    const insertar = db.prepare(`
        INSERT INTO usuarios (nombre, apellidos, cedula, correo, contrasenia)
        VALUES (?, ?, ?, ?, ?)    
    `);
    insertar.run(nombre, apellidos, cedula, correo, contrasenia);
}

function insertarProductos(producto, cantidad, precio, descripcion) {
    const db = conectar();
    const insertar = db.prepare(`
        INSERT INTO productos (producto, cantidad, precio, descripcion)
        VALUES (?, ?, ?, ?)    
    `);
    insertar.run(producto, cantidad, precio, descripcion);
}

function insertarClientes(contacto, empresa, cedula, correo, telefono) {
    const db = conectar();
    const insertar = db.prepare(`
        INSERT INTO clientes (contacto, empresa, cedula, correo, telefono)
        VALUES (?, ?, ?, ?, ?)    
    `);
    insertar.run(contacto, empresa, cedula, correo, telefono);
}

function borrarTodo() {
    const db = conectar();
    db.exec(`
        DELETE FROM usuarios
    `);
}

//Pedir datos
function obtenerProductos() {
    const db = conectar();
    const consulta = db.prepare(`
        SELECT * FROM productos    
    `);

    return consulta.all();
}

function obtenerClientes() {
    const db = conectar();
    const consulta = db.prepare(`
        SELECT * FROM clientes
    `);

    return consulta.all();
}

//Eliminar datos
function eliminarProducto(id) {
    const db = conectar();
    const eliminar = db.prepare(`
        DELETE FROM productos WHERE id = ?
    `);

    eliminar.run(id);
}

function eliminarCliente(id) {
    const db = conectar();
    const eliminar = db.prepare(`
        DELETE FROM clientes WHERE id = ?
    `);

    eliminar.run(id);
}

//Exportar funciones
module.exports = {
    insertarDatos,
    insertarProductos,
    insertarClientes,
    obtenerProductos,
    obtenerClientes,
    eliminarProducto,
    eliminarCliente
};