const select_filtrado = document.querySelector(".select-filtrado");

const facturaciones_venta = document.querySelector(".facturaciones-venta");
const facturaciones_compra = document.querySelector(".facturaciones-compra");

const facturacion_venta = document.querySelector(".facturacion-venta");
const facturacion_compra = document.querySelector(".facturacion-compra");

const datos_emision = document.querySelector(".datos-emision");

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
facturacion_venta.addEventListener("click", () => {
    facturaciones_venta.classList.toggle("cambio-medida");
    datos_emision.classList.toggle("cambio-medida");
});

facturacion_compra.addEventListener("click", () => {
    facturaciones_compra.classList.toggle("cambio-medida");
    datos_emision.classList.toggle("cambio-medida");
});