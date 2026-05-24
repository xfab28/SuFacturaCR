const ingresar_clientes = document.querySelector(".ingresar-clientes");
const agregar_cliente = document.querySelector(".agregar-cliente");
let activo = false;

//Aparecer barra
agregar_cliente.addEventListener("click", () => {
    if (ingresar_clientes.classList.contains("ingresar-clientes-null")) {
        ingresar_clientes.classList.remove("desaparecer-ingresar-clientes");
        ingresar_clientes.classList.remove("ingresar-clientes-null");
        ingresar_clientes.classList.add("aparecer-ingresar-clientes")
    } else {
        ingresar_clientes.classList.remove("aparecer-ingresar-clientes");
        ingresar_clientes.classList.add("desaparecer-ingresar-clientes");
        setTimeout(() => {
            ingresar_clientes.classList.add("ingresar-clientes-null");
        }, 800);
    }
});

