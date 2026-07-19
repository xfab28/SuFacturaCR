import { 
    abrirBaseDatos,
    guardarCompras,
    vaciarCompras 
} from "./indexedDB";

await abrirBaseDatos();

import { conectado } from "./internet";

const cliente = document.querySelector('.cliente');
const desc_compra = document.querySelector('.desc-compra');
const cantidad = document.querySelector('.cantidad');
const precio = document.querySelector('.precio');
const descuento = document.querySelector('.descuento');
const exento = document.querySelector('.exento');
const select_estado = document.querySelector('.select-estado');

const iva13 = document.querySelector('.iva13');
const iva1 = document.querySelector('.iva1');
const iva2 = document.querySelector('.iva2');

const imp13 = document.querySelector('.imp13');
const imp1 = document.querySelector('.imp1');
const imp2 = document.querySelector('.imp2');

const btn_agregar = document.querySelector('.btn-agregar');
const btn_limpiar = document.querySelector('.btn-limpiar');

const nombre_cliente = document.querySelector('.nombre-cliente');

const registro_compras = document.querySelector('.registro-compras');

const cant_subtotal_compras = document.querySelector('.cant-subtotal-compras');
const iva_13_calculos = document.querySelector('.iva-13-calculos');
const iva_1_calculos = document.querySelector('.iva-1-calculos');
const iva_2_calculos = document.querySelector('.iva-2-calculos');
const total_descuento = document.querySelector('.total-descuento');
const total_exento = document.querySelector('.total-exento');
const cant_total_compras = document.querySelector('.cant-total-compras');

const btn_nueva_venta = document.querySelector('.btn-nueva-venta');

const form_compras = document.getElementById('form-compras');

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

//Compras JSON
let totalJSON = 0

//Elegir impuesto
iva13.addEventListener("click", () => {
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
        imp13.textContent = "₡" + impuesto_13;
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

iva1.addEventListener("click", () => {
    if (iva1.checked) {
        imp1.style.color = "black";

        esIVA13 = false;
        esIVA1 = true;
        esIVA2 = false;

        iva13.disabled = true;
        iva2.disabled = true;

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
        let impuesto_1 = operacion1 * 0.1;
        imp1.textContent = "₡" + impuesto_1;
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

iva2.addEventListener("click", () => {
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
        let impuesto_2 = operacion2 * 0.2;
        imp2.textContent = "₡" + impuesto_2;
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
btn_agregar.addEventListener("click", () => {
    nombre_cliente.textContent = cliente.value;
    cliente.disabled = true;

    const informacion_compras = document.createElement('div');
    informacion_compras.classList.add("informacion-compras");

    let subtotal = parseFloat(cantidad.value) * parseFloat(precio.value);
    
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

    let datos = [cantidad.value, desc_compra.value, precio.value, descuento.value, subtotal, IVA, impuestoDest];

    for (let i = 0; i < datos.length; i++) {
        const p = document.createElement('p');
        p.textContent = datos[i];
        informacion_compras.appendChild(p);
    }

    registro_compras.appendChild(informacion_compras);

    //Subtotal
    let gravado13 = total_iva13 / 0.13;
    let gravado1 = total_iva1 / 0.01;
    let gravado2 = total_iva2 / 0.02;
    total_Subtotal = gravado13 + gravado1 + gravado2;
    cant_subtotal_compras.textContent = "₡" + total_Subtotal;

    //IVAS
    iva_13_calculos.textContent = total_iva13;
    iva_1_calculos.textContent = total_iva1;
    iva_2_calculos.textContent = total_iva2;

    //Descuento
    let descFloat = parseFloat(descuento.value);
    total_desc += descFloat;
    total_descuento.textContent = "₡" + total_desc; 

    //Exento
    let exentoFloat = parseFloat(exento.value);
    total_exe += exentoFloat;
    total_exento.textContent = "₡" + total_exe;

    //Total
    totalFactura = total_Subtotal + total_iva13 + total_iva1 + total_iva2 + total_exe;
    cant_total_compras.textContent = "₡" + totalFactura;
});

//Limpiar espacios
btn_limpiar.addEventListener("click", () => {
    cliente.value = "";
    desc_compra.value = "";
    cantidad.value = "";
    precio.value = "";
    descuento.value = "";
    exento.value = "";
    imp13.innerHTML = "13%";
    imp1.innerHTML = "1%";
    imp2.innerHTML = "2%";

    iva13.disabled = false;
    iva1.disabled = false;
    iva2.disabled = false;

    iva13.checked = false;
    iva1.checked = false;
    iva2.checked = false;

    imp13.style.color = "#bebcbc";
    imp1.style.color = "#bebcbc";
    imp2.style.color = "#bebcbc";
});

//Nueva venta

//Ir a inicio
form_compras.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ahora = new Date();

    const contacto = cliente.value;
    const fecha = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()}`;
    const descripcion = desc_compra.value;
    const monto = totalFactura;
    const estado = select_estado.value;

    try {
        if (conectado) {
            const respuesta = await fetch("/compras", {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    contacto: contacto,
                    fecha: fecha,
                    descripcion: descripcion,
                    monto: monto,
                    estado: estado
                })
            });

            if (respuesta.ok) {
                console.log("Se agrego la compra");
            } 
        } else {
            console.log("Guardando datos localmente");
            await guardarCompras(contacto, fecha, descripcion, monto, estado); 
        }

    } catch (error) {
        console.log("Guardando datos localmente");
        await guardarCompras(contacto, fecha, descripcion, monto, estado);
    }
});