//Boton eliminar
const borrar_cliente = document.querySelector(".borrar-cliente");

//Barra busqueda
const buscar_clientes = document.querySelector(".buscar-clientes");

//Div
const mensaje_seleccionado = document.querySelector(".mensaje-seleccionado");
const clientes_registrados = document.querySelector(".clientes-registrados");

//Inputs
const contacto_cliente = document.querySelector(".contacto-cliente");
const empresa_cliente = document.querySelector(".empresa-cliente");
const cedula_cliente = document.querySelector(".cedula-cliente");
const correo_cliente = document.querySelector(".correo-cliente");
const telefono_cliente = document.querySelector(".telefono-cliente");

//Botones
const agregar_input = document.querySelector(".agregar-input");
const limpiar_input = document.querySelector(".limpiar-input");

//formulario
const formulario = document.querySelector(".form-clientes");

//funcion
function cargarClientes() {
    clientes_registrados.innerHTML = "";

    fetch("/contactos") 
    .then(res => res.json())
    .then(clientes => {
        clientes.forEach(cliente => {
            const cliente_regis = document.createElement("div");
            cliente_regis.classList.add("cliente-regis");

            let datos = [cliente.id, cliente.contacto, cliente.empresa, cliente.cedula, cliente.correo, cliente.telefono];

            for (let i = 0; i < datos.length; i++) {
                const p = document.createElement("p");
                p.textContent = datos[i];
                cliente_regis.appendChild(p);
            }

            clientes_registrados.appendChild(cliente_regis);
        });
    });
    
}

//Eventos
window.addEventListener("DOMContentLoaded", () => {
    cargarClientes();
});

//Agregar clientes
formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contacto = contacto_cliente.value;
    const empresa = empresa_cliente.value;
    const cedula = cedula_cliente.value;
    const correo = correo_cliente.value;
    const telefono = telefono_cliente.value;

    try {
        const respuesta = await fetch("/contactos", {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                contacto,
                empresa,
                cedula,
                correo,
                telefono
            })
        });

        if (respuesta.ok) {
            cargarClientes();
        } else {
            alert("Error al ingresar cliente");
        }
    } catch (error) {
        alert("Error del servidor");
    }
});

//Limpiar campos
limpiar_input.addEventListener("click", (e) => {
    e.preventDefault();

    let datos = [contacto_cliente, empresa_cliente, cedula_cliente, correo_cliente, telefono_cliente];

    for (let i = 0; i < datos.length; i++) {
        datos[i].value = "";
    }

});

//Barra de busqueda
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".buscar-clientes")) {
        document.querySelectorAll(".cliente-regis").forEach(cliente => {
            cliente.textContent.toLowerCase().includes(e.target.value)
            ? cliente.classList.remove("filtro")
            : cliente.classList.add("filtro")
        });
    }
});

//Eliminar cliente
async function eliminarCliente(id) {
    const respuesta = await fetch(`/contactos/${id}`, {
        method: "DELETE"
    });

    if (respuesta.ok) {
        cargarClientes();
        mensaje_seleccionado.textContent = "";
    } else {
        console.log(respuesta.status);
        alert("Error al borrar");
    }
}

let id = 0;

clientes_registrados.addEventListener("click", (e) => {

    const cliente = e.target.closest(".cliente-regis");

    if (!cliente) return;
    
    mensaje_seleccionado.textContent = `Cliente seleccionado: ${cliente.children[0].textContent}`;
    

    id = cliente.children[0].textContent;
});

borrar_cliente.addEventListener("click", () => {
    if (!id) {
        alert("Seleccione un cliente")
        return;
    }

    eliminarCliente(id);
});