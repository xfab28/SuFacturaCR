//Seleccionamos elementos
const numeroCedula = document.querySelector(".numero-cedula");
const contrasenaInicio =  document.querySelector(".contrasena-inicio");
const mensajeAlerta = document.querySelector(".mensaje-alerta");
const btnInicio = document.querySelector(".btn-inicio");
const direccionamiento = document.querySelector(".direccionamiento");

//Acceder al localStorage
let datos = JSON.parse(localStorage.getItem("usuario"));

//Validacion
btnInicio.addEventListener("click", (e) => {
    e.preventDefault();

    if (numeroCedula.value == datos.cedulaLocal && contrasenaInicio.value == datos.contrasenaLocal) {
        mensajeAlerta.classList.add("mensaje-alerta-verde");
        mensajeAlerta.classList.remove("mensaje-alerta-rojo");
        mensajeAlerta.innerHTML = "Inicio de sesion realizado con exito";

        setTimeout(() => {
            window.location.href = "../HTML/carga.html";
        }, 2000);

    } else {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");
        mensajeAlerta.innerHTML = "Numero de cédula o contraseña incorrectos";
    }
});

direccionamiento.addEventListener("click", () => {
    window.location.href = "../HTML/registro.html";
});