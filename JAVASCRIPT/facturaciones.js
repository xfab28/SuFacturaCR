const select_filtrado = document.querySelector(".select-filtrado");

const facturaciones_venta = document.querySelector(".facturaciones-venta");
const facturaciones_compra = document.querySelector(".facturaciones-compra");

const datos_emision = document.querySelector(".datos-emision");

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
}

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
}

window.addEventListener("DOMContentLoaded", () => {
    cargarVentas();
    cargarCompras();
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