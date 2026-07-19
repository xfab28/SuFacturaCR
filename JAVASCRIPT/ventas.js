import { 
    abrirBaseDatos,
    guardarVentas,
    vaciarVentas
} from "./indexedDB.js";

await abrirBaseDatos();

import { conectado } from "./internet.js";

const cliente = document.querySelector(".cliente");
const articulo = document.querySelector(".articulo");
const cantidad = document.querySelector(".cantidad");
const precio = document.querySelector(".precio");
const descuento = document.querySelector(".descuento");
const exento = document.querySelector(".exento");
const select_estado = document.querySelector(".select-estado");

const btnBuscarCliente = document.querySelector(".btn-buscar-cliente");
const btnBuscarCodigo = document.querySelector(".btn-buscar-codigo");
const btnAgregar = document.querySelector(".btn-agregar");
const btnLimpiar = document.querySelector(".btn-limpiar");

const iva13 = document.querySelector(".iva13");
const iva1 = document.querySelector(".iva1");
const iva2 = document.querySelector(".iva2");

const imp13 = document.querySelector(".imp13");
const imp1 = document.querySelector(".imp1");
const imp2 = document.querySelector(".imp2");

const subTotal = document.querySelector(".cant-subtotal-ventas");
const iva_13 = document.querySelector(".iva-13-calculos");
const iva_1 = document.querySelector(".iva-1-calculos");
const iva_2 = document.querySelector(".iva-2-calculos");
const descuentoCalculo = document.querySelector(".total-descuento");
const exentoCalculo = document.querySelector(".total-exento");
const totalVentas = document.querySelector(".cant-total-ventas");

const btnNuevaVenta = document.querySelector(".btn-nueva-venta");

const nombreCliente = document.querySelector(".nombre-cliente");

const datos_de_producto = document.querySelector(".datos-de-producto");

const form_ventas = document.getElementById("form-ventas");

//Si no hay precio, descuento y exento, radios desactivados

iva13.disabled = true;
iva1.disabled = true;
iva2.disabled = true;

precio.addEventListener("change", () => {
    if (precio.value.length >= 1) {
        iva13.disabled = false;
        iva1.disabled = false;
        iva2.disabled = false;
    } else if (precio.value.length == 0) {
        iva13.disabled = true;
        iva1.disabled = true;
        iva2.disabled = true;
    }
});

//Impresion de ivas
let esIVA13 = false;
let esIVA1 = false;
let esIVA2 = false;
let IVA = 0;

//Resultados
let impuestoDest = 0;
let total_Subtotal = 0;
let total_desc = 0;
let total_exe = 0;
let total_iva13 = 0;
let total_iva1 = 0;
let total_iva2 = 0;
let totalFactura = 0;

//Ingresos JSON
let totalJSON = 0

//Elegir impuesto
iva13.addEventListener("change", () => {
    if (iva13.checked) {
        imp13.style.color = "black";

        esIVA13 = true;
        esIVA1 = false;
        esIVA2 = false;
        
        iva1.disabled = true;
        iva2.disabled = true;

        let floatCant13 = parseFloat(cantidad.value);

        if (cantidad.value == "") {
            cantidad.value = 1;
            floatCant13 = 1;
        }

        if (floatCant13 == 0) {
            cantidad.value = 1;
            floatCant13++;
        } 

        let floatPrecio13 = parseFloat(precio.value);
        let floatDescuento13 = parseFloat(descuento.value);

        if (descuento.value == "") {
            descuento.value = 0;
            floatDescuento13 = 0;
        }

        let floatExento13 = parseFloat(exento.value);

        if (exento.value == "") {
            exento.value = 0;
            floatExento13 = 0;
        }

        let operacion13 = (floatCant13 * floatPrecio13) - floatDescuento13 + floatExento13;
        let impuesto_13 = operacion13 * 0.13;
        imp13.innerHTML = "₡" + impuesto_13;
        impuestoDest = impuesto_13;
    } else {
        esIVA13 = false;
        esIVA1 = false;
        esIVA2 = false;

        iva1.disabled = false;
        iva2.disabled = false;

        imp13.style.color = "#bebcbc";
        imp13.textContent = "13%";
    }
});

iva1.addEventListener("change", () => {
    if (iva1.checked) {
        imp1.style.color = "black";

        iva13.disabled = true;
        iva2.disabled = true;

        esIVA13 = false;
        esIVA1 = true;
        esIVA2 = false;

        let floatCant1 = parseFloat(cantidad.value);

        if (cantidad.value == "") {
            cantidad.value = 1;
            floatCant1 = 1;
        }

        if (floatCant1 == 0) {
            cantidad.value = 1;
            floatCant1++;
        } 

        let floatPrecio1 = parseFloat(precio.value);
        let floatDescuento1 = parseFloat(descuento.value);

        if (descuento.value == "") {
            descuento.value = 0;
            floatDescuento1 = 0;
        }

        let floatExento1 = parseFloat(exento.value);

        if (exento.value == "") {
            exento.value = 0;
            floatExento1 = 0;
        }

        let operacion1 = (floatCant1 * floatPrecio1) - floatDescuento1 + floatExento1;
        let impuesto_1 = operacion1 * 0.01;
        imp1.innerHTML = "₡" + impuesto_1;
        impuestoDest = impuesto_1;
    } else {
        esIVA13 = false;
        esIVA1 = false;
        esIVA2 = false;

        iva13.disabled = false;
        iva2.disabled = false;

        imp1.style.color = "#bebcbc";
        imp1.textContent = "1%";
    }
});

iva2.addEventListener("change", () => {
    if (iva2.checked) {
        imp2.style.color = "black";

        esIVA13 = false;
        esIVA1 = false;
        esIVA2 = true;

        iva13.disabled = true;
        iva1.disabled = true;

        let floatCant2 = parseFloat(cantidad.value);

        if (cantidad.value == "") {
            cantidad.value = 1;
            floatCant2 = 1;
        }

        if (floatCant2 == 0) {
            cantidad.value = 1;
            floatCant2++;
        } 

        let floatPrecio2 = parseFloat(precio.value);
        let floatDescuento2 = parseFloat(descuento.value);

        if (descuento.value == "") {
            descuento.value = 0;
            floatDescuento2 = 0;
        }

        let floatExento2 = parseFloat(exento.value);

        if (exento.value == "") {
            exento.value = 0;
            floatExento2 = 0;
        }

        let operacion2 = (floatCant2 * floatPrecio2) - floatDescuento2 + floatExento2;
        let impuesto_2 = operacion2 * 0.02;
        imp2.innerHTML = "₡" + impuesto_2;
        impuestoDest = impuesto_2;
    } else {
        esIVA13 = false;
        esIVA1 = false;
        esIVA2 = false;

        iva13.disabled = false;
        iva1.disabled = false;

        imp2.style.color = "#bebcbc";
        imp2.textContent = "2%";
    }
});

//Agregar productos
btnAgregar.addEventListener("click", () => {
    nombreCliente.textContent = cliente.value;
    cliente.disabled = true;

    const productos_insertados = document.createElement("div");
    productos_insertados.classList.add("productos-insertados");

    let subtotal_float = parseFloat(cantidad.value) * parseFloat(precio.value);

    if (esIVA13 == true && esIVA1 == false && esIVA2 == false) {
        total_iva13 += impuestoDest;
        IVA = "13%";
    } else if (esIVA13 == false && esIVA1 == true && esIVA2 == false) {
        total_iva1 += impuestoDest;
        IVA = "1%";
    } else if (esIVA13 == false && esIVA1 == false && esIVA2 == true) {
        total_iva2 += impuestoDest;
        IVA = "2%";
    }

    let datos = [cantidad.value, articulo.value, precio.value, descuento.value, subtotal_float, IVA, impuestoDest];
    
    for (let i = 0; i < datos.length; i++) {
        const p = document.createElement("p");
        p.textContent = datos[i];
        productos_insertados.appendChild(p);
    }

    datos_de_producto.appendChild(productos_insertados);

    //Descuento
    let descFloat = parseFloat(descuento.value);
    total_desc += descFloat;
    descuentoCalculo.innerHTML = "₡" + total_desc; 

    //Exento
    let exentoFloat = parseFloat(exento.value);
    total_exe += exentoFloat;
    exentoCalculo.innerHTML = "₡" + total_exe;

    //IVAS
    iva_13.innerHTML = "₡" + total_iva13;   
    iva_1.innerHTML = "₡" + total_iva1;     
    iva_2.innerHTML = "₡" + total_iva2;
    

    //Subtotal
    let gravado13 = total_iva13 / 0.13;
    let gravado1 = total_iva1 / 0.01;
    let gravado2 = total_iva2 / 0.02;
    total_Subtotal = gravado13 + gravado1 + gravado2;
    subTotal.innerHTML = "₡" + total_Subtotal;

    //Total
    totalFactura = total_Subtotal + total_iva13 + total_iva1 + total_iva2 + total_exe;
    totalVentas.innerHTML = "₡" + totalFactura;

    //Guardamos al JSON
    totalJSON = totalFactura;
    
});

//Limpiar inputs
btnLimpiar.addEventListener("click", () => {
    cliente.value = "";
    articulo.value = "";
    cantidad.value = "";
    precio.value = "";
    descuento.value = "";
    exento.value = "";
    imp13.innerHTML = "13%";
    imp1.innerHTML = "1%";
    imp2.innerHTML = "2%";

    iva13.disabled = true;
    iva1.disabled = true;
    iva2.disabled = true;

    iva13.checked = false;
    iva1.checked = false;
    iva2.checked = false;

    imp13.style.color = "#bebcbc";
    imp1.style.color = "#bebcbc";
    imp2.style.color = "#bebcbc";
});

//Reiniciar todo
btnNuevaVenta.addEventListener("click", () => {
    //Limpiamos inputs
    cliente.value = "";
    codigo.value = "";
    articulo.value = "";
    cantidad.value = "";
    precio.value = "";
    descuento.value = "";
    exento.value = "";
    imp13.innerHTML = "13%";
    imp1.innerHTML = "1%";
    imp2.innerHTML = "2%";

    iva13.disabled = true;
    iva1.disabled = true;
    iva2.disabled = true;

    iva13.checked = false;
    iva1.checked = false;
    iva2.checked = false;

    imp13.style.color = "#bebcbc";
    imp1.style.color = "#bebcbc";
    imp2.style.color = "#bebcbc";

    //Limpiamos lista
    const elementosRemover = document.querySelectorAll(".div-info");

    elementosRemover.forEach(el => {
        el.querySelectorAll("p").forEach(p => p.remove());
    });

    const elementosRemoverIVA = document.querySelectorAll(".div-info-imp");
    
    elementosRemoverIVA.forEach(iva => {
        iva.querySelectorAll("p").forEach(p => p.remove());
    });

    //Limpiamos calculos
    descuentoCalculo.innerHTML = "₡0,00";
    exentoCalculo.innerHTML = "₡0,00";
    iva_13.innerHTML = "₡0,00";
    iva_1.innerHTML = "₡0,00";
    iva_2.innerHTML = "₡0,00";
    subTotal.innerHTML = "₡0,00";
    totalVentas.innerHTML = "₡0,00";

    //Limpiamos nombre cliente
    cliente.disabled = false;
    nombreCliente.innerHTML = "";

    //Insertamos al JSON
    let acumulado = Number(localStorage.getItem("montoIngresos")) || 0;
    

    function insertarIngresos(cantidad) {

        acumulado += cantidad;

        localStorage.setItem("montoIngresos", acumulado);
    }

    insertarIngresos(totalJSON);
});

//Guardar datos
form_ventas.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ahora = new Date();

    const contacto = cliente.value;
    const fecha = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()}`;
    const descripcion = articulo.value;
    const total = totalFactura;
    const estado = select_estado.value;

    try {
        if (conectado) {
            const respuesta = await fetch("/ventas", {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    contacto: contacto,
                    fecha: fecha,
                    descripcion: descripcion,
                    monto: total,
                    estado: estado
                })      
            });

            if (respuesta.ok) {
                console.log("Se agrego la factura");
            } 
        } else {
            console.log("Guardando localmente");
            await guardarVentas(contacto, fecha, descripcion, total, estado);     
        }
    } catch (error) {
        console.log("Guardando localmente");
        await guardarVentas(contacto, fecha, descripcion, total, estado);
    }
});