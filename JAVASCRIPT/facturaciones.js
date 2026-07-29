import { 
    abrirBaseDatos,
    guardarVentas,
    guardarCompras,
    vaciarVentas,
    vaciarCompras,
    obtenerVentas,
    obtenerCompras
} from "./indexedDB.js";

await abrirBaseDatos();

import { conectado } from "./internet.js";

import { mensaje } from "./mensaje.js";

//Sincronizar datos
async function sincronizarDatos() {
    const ventas = await obtenerVentas();
    const compras = await obtenerCompras();
    
    ventas.forEach(venta => {
        fetch("/ventas", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                contacto: venta.contacto,
                fecha: venta.fecha,
                descripcion: venta.descripcion,
                monto: venta.monto,
                estado: venta.estado
            })
        });
    });

    compras.forEach(compra => {
        fetch("/compras", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                contacto: compra.contacto,
                fecha: compra.fecha,
                descripcion: compra.descripcion,
                monto: compra.monto,
                estado: compra.estado
            })
        });
    });

    await vaciarVentas();
    await vaciarCompras();
};

const select_filtrado = document.querySelector(".select-filtrado");

const facturaciones_venta = document.querySelector(".facturaciones-venta");
const facturaciones_compra = document.querySelector(".facturaciones-compra");

const datos_emision = document.querySelector(".datos-emision");

//SQLite
function cargarVentas() {
    facturaciones_venta.innerHTML = "";

    fetch("/ventas")
    .then(res => res.json())
    .then(ventas => {
        ventas.forEach(venta => {
            const facturacion_venta = document.createElement("div");
            facturacion_venta.classList.add("facturacion-venta");

            let datos = [venta.id, venta.contacto, venta.fecha, venta.descripcion, venta.monto, venta.estado];

            for (let i = 0; i < datos.length; i++) {
                const p = document.createElement("p");
                p.textContent = datos[i];
                facturacion_venta.appendChild(p);
            }

            facturaciones_venta.appendChild(facturacion_venta);
        });
    });
};

function cargarCompras() {
    facturaciones_compra.innerHTML = "";

    fetch("/compras")
    .then(res => res.json())
    .then(compras => {
        compras.forEach(compra => {
            const facturacion_compra = document.createElement("div");
            facturacion_compra.classList.add("facturacion-compra");

            let datos = [compra.id, compra.contacto, compra.fecha, compra.descripcion, compra.monto, compra.estado];

            for (let i = 0; i < datos.length; i++) {
                const p = document.createElement("p");
                p.textContent = datos[i];
                facturacion_compra.appendChild(p);
            }

            facturaciones_compra.appendChild(facturacion_compra);
        });
    });
};

//IndexedDB
async function ventasIndexed() {
    facturaciones_venta.innerHTML = "";

    const ventas = await obtenerVentas();

    ventas.forEach(venta => {
        const facturacion_venta = document.createElement("div");
        facturacion_venta.classList.add("facturacion-venta");

        let datos = [venta.id, venta.contacto, venta.fecha, venta.descripcion, venta.monto, venta.estado];

        for (let i = 0; i < datos.length; i++) {
            const p = document.createElement("p");
            p.textContent = datos[i];
            facturacion_venta.appendChild(p);
        }

        facturaciones_venta.appendChild(facturacion_venta);
    });
};

async function comprasIndexed() {
    facturaciones_compra.innerHTML = "";

    const compras = await obtenerCompras();

    compras.forEach(compra => {
        const facturacion_compra = document.createElement("div");
        facturacion_compra.classList.add("facturacion-compra");

        let datos = [compra.id, compra.contacto, compra.fecha, compra.descripcion, compra.monto, compra.estado];

        for (let i = 0; i < datos.length; i++) {
            const p = document.createElement("p");
            p.textContent = datos[i];
            facturacion_compra.appendChild(p);
        }

        facturaciones_compra.appendChild(facturacion_compra);
    });
};


function cargarDatos() {
    cargarVentas();
    cargarCompras();
}

cargarDatos();

//Sincronizar datos cuando vuelva internet
window.addEventListener("online", () => {
    cargarDatos();
    sincronizarDatos();
});

window.addEventListener("offline", () => {
    ventasIndexed();
    comprasIndexed();
});

//Filtrar por opcion
select_filtrado.addEventListener("change", () => {
    if (select_filtrado.value == "1") {
        facturaciones_venta.classList.remove("ocultar-facturaciones");
        facturaciones_compra.classList.add("ocultar-facturaciones");
        facturaciones_venta.classList.remove("cambio-medida");
        datos_emision.classList.remove("cambio-medida");
    } else if (select_filtrado.value == "2") {
        facturaciones_venta.classList.add("ocultar-facturaciones");
        facturaciones_compra.classList.remove("ocultar-facturaciones"); 
        facturaciones_compra.classList.remove("cambio-medida");
        datos_emision.classList.remove("cambio-medida");
    }
});

//Mostrar datos de factura
facturaciones_venta.addEventListener("click", () => {
    facturaciones_venta.classList.toggle("cambio-medida");
    datos_emision.classList.toggle("cambio-medida");
});

facturaciones_compra.addEventListener("click", () => {
    facturaciones_compra.classList.toggle("cambio-medida");
    datos_emision.classList.toggle("cambio-medida");
});