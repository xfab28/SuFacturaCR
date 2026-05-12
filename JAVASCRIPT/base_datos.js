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

//Exportar funciones
module.exports = {
    insertarDatos
};