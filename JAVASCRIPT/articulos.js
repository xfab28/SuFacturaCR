const secciones = document.querySelector('.secciones');
const articulos = document.querySelector('.articulos');
const compras = document.querySelector('.compras');
const content = document.querySelector('.content');
const agregar = document.querySelector('.agregar');
const elementos = document.querySelector('.elementos');

const productoInput = document.querySelector(".producto-input");
const cantidadInput = document.querySelector(".cantidad-input");
const precioInput = document.querySelector(".precio-input");
const descripcionInput = document.querySelector(".descripcion-input"); 
const agregarBtn = document.querySelector(".agregar-btn");
const limpiarBtn = document.querySelector(".limpiar-btn");

function quitarDisplay(tiempo) {
    setTimeout(() => {
        content.classList.remove("barra-ocultar");
    }, tiempo);
}

//Secciones de la página
articulos.addEventListener("click", () => {
    secciones.classList.remove("seleccion-compras");
    secciones.classList.add("seleccion-articulos");
    
    content.classList.remove("compras-info")
    content.classList.add("articulos-cuadro");
    quitarDisplay(1000);
});

compras.addEventListener("click", () => {
    secciones.classList.remove("seleccion-articulos");
    secciones.classList.add("seleccion-compras");

    content.classList.add("barra-ocultar");
    content.classList.remove("articulos-cuadro");
    content.classList.add("compras-info");
});

quitarDisplay(1000);

//Barra para agregar productos

agregar.addEventListener("click", () => {
    content.classList.toggle("barra-agregar-oculta");
});

//Agregar productos
agregarBtn.addEventListener("click", () => {
    const elemento = document.createElement("div");
    const p_producto = document.createElement("p");
    const p_cantidad = document.createElement("p");
    const p_precio = document.createElement("p");
    const p_descripcion = document.createElement("p");

    if (cantidadInput.value <= 5) {
        p_cantidad.style.color = "red";
    }

    p_producto.textContent = productoInput.value;
    p_cantidad.textContent = cantidadInput.value;
    p_precio.textContent = precioInput.value;
    p_descripcion.textContent = descripcionInput.value;
    elemento.classList.add("elemento");

    elemento.appendChild(p_producto);
    elemento.appendChild(p_cantidad);
    elemento.appendChild(p_precio);
    elemento.appendChild(p_descripcion);
    elementos.appendChild(elemento);
});

//Limpiar espacios
limpiarBtn.addEventListener("click", () => {
    productoInput.value = "";
    cantidadInput.value = "";
    precioInput.value = "";
    descripcionInput.value = "";
});