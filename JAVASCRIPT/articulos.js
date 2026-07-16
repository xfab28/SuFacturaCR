const secciones = document.querySelector('.secciones');
const articulos = document.querySelector('.articulos-slash');
const compras = document.querySelector('.compras-slash');
const content = document.querySelector('.content');
const agregar = document.querySelector('.agregar');
const borrar = document.querySelector('.borrar');
const elementos = document.querySelector('.elementos');

const productoInput = document.querySelector(".producto-input");
const cantidadInput = document.querySelector(".cantidad-input");
const precioInput = document.querySelector(".precio-input");
const descripcionInput = document.querySelector(".descripcion-input"); 
const agregarBtn = document.querySelector(".agregar-btn");
const limpiarBtn = document.querySelector(".limpiar-btn");

const formulario = document.querySelector(".form-productos");

function cargarProductos() {
    elementos.innerHTML = "";

    fetch("/productos")
    .then(res => res.json())
    .then(productos => {
        productos.forEach(producto => {
            
            const elemento = document.createElement("div");
            elemento.classList.add("elemento");

            let indice = producto.id;
            elemento.dataset.id = indice;

            let lista_datos = [producto.producto, producto.cantidad, producto.precio, producto.descripcion];

            for (let i = 0; i < lista_datos.length; i++) {
                const p = document.createElement("p");
                p.textContent = lista_datos[i];
                elemento.appendChild(p);
            }

            elementos.appendChild(elemento);

        });
    });
}

window.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
});

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
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const producto = productoInput.value;
    const cantidad = cantidadInput.value;
    const precio = precioInput.value;
    const descripcion = descripcionInput.value;

    try {
        const respuesta = await fetch('/productos', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                producto,
                cantidad,
                precio,
                descripcion
            })
        });

        if (respuesta.ok) {
            cargarProductos();
        } else {
            alert("Error al ingresar producto");
        }
    } catch (error) {
        alert("Error del servidor");
    }
});

//Limpiar espacios
limpiarBtn.addEventListener("click", () => {
    productoInput.value = "";
    cantidadInput.value = "";
    precioInput.value = "";
    descripcionInput.value = "";
});

//Borrar un elemento
async function eliminarProducto(id) {
    const respuesta = await fetch(`/productos/${id}`, {
        method: "DELETE"
    });

    if (respuesta.ok) {
        cargarProductos();
    } else {
        alert("Error al eliminar");
    }
}

let id = 0;

elementos.addEventListener("click", (e) => {
    const producto = e.target.closest(".elemento");

    if (!producto) return;

    console.log(`Cliente seleccionado: ${producto.dataset.id}`);

    id = producto.dataset.id;
});

borrar.addEventListener("click", () => {
    if (!id) {
        alert("Seleccione un producto");
        return;
    }

    eliminarProducto(id);
});