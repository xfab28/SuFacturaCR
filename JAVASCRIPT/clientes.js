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

//Eventos

//Agregar clientes
let j = 0;
agregar_input.addEventListener("click", (e) => {
    e.preventDefault();

    const cliente_regis = document.createElement("div");
    cliente_regis.classList.add("cliente-regis");

    j++;

    cliente_regis.dataset.indice = j;

    let datos = [j, contacto_cliente.value, empresa_cliente.value, cedula_cliente.value, correo_cliente.value, telefono_cliente.value];
    
    for (let i = 0; i < datos.length; i++) {
        const p = document.createElement("p");
        p.textContent = datos[i];
        cliente_regis.appendChild(p);
    }

    clientes_registrados.appendChild(cliente_regis);

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
let clienteSelec = null;

clientes_registrados.addEventListener("click", (e) => {

    const cliente = e.target.closest(".cliente-regis");

    if (cliente) {
        mensaje_seleccionado.textContent = `Cliente seleccionado: ${cliente.dataset.indice}`;
        clienteSelec = cliente;
    }
});

borrar_cliente.addEventListener("click", () => {
    if (clienteSelec) {
        mensaje_seleccionado.textContent = "";
        clienteSelec.remove();
        clienteSelec = null;
    }
});