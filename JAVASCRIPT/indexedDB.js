let db;

export function abrirBaseDatos() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open("FacturaDB", 2);

        request.onupgradeneeded = (e) => {

            db = e.target.result;

            db.createObjectStore("facturasVentas", {
                keyPath: "id",
                autoIncrement: true
            });

            db.createObjectStore("facturasCompras", {
                keyPath: "id",
                autoIncrement: true
            });

        };


        request.onsuccess = (e) => {

            db = e.target.result;

            resolve(db);

        };


        request.onerror = (e) => {

            reject(e);

        };

    });

};

//Ventas
export function guardarVentas(contacto, fecha, descripcion, monto, estado) {
    return new Promise((resolve, reject) => {
        
        const transaction = db.transaction("facturasVentas", "readwrite");

        const store = transaction.objectStore("facturasVentas");

        const request = store.add({
            contacto,
            fecha,
            descripcion,
            monto,
            estado
        });

        request.onsuccess = () => {
            resolve("Venta guardada");
        };

        request.onerror = (e) => {
            reject(e);
        }
     
    });
};

export function vaciarVentas() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("facturasVentas", "readwrite");

        const store = transaction.objectStore("facturasVentas");

        const request = store.clear();
        
        request.onsuccess = () => {
            resolve("Tabla vaciada");
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};

export function obtenerVentas() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("facturasVentas", "readonly");

        const store = transaction.objectStore("facturasVentas");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};

//Compras
export function guardarCompras(contacto, fecha, descripcion, monto, estado) {
    return new Promise((resolve, reject) => {
        
        const transaction = db.transaction("facturasCompras", "readwrite");

        const store = transaction.objectStore("facturasCompras");

        const request = store.add({
            contacto,
            fecha,
            descripcion,
            monto,
            estado
        });

        request.onsuccess = () => {
            resolve("Venta guardada");
        };

        request.onerror = (e) => {
            reject(e);
        }
     
    });
};

export function vaciarCompras() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("facturasCompras", "readwrite");

        const store = transaction.objectStore("facturasCompras");

        const request = store.clear();
        
        request.onsuccess = () => {
            resolve("Tabla vaciada");
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};

export function obtenerCompras() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("facturasCompras", "readonly");

        const store = transaction.objectStore("facturasCompras");

        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (e) => {
            reject(e);
        };
    });
};