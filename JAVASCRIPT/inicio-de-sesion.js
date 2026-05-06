//Seleccionamos elementos
const numeroCedula = document.querySelector(".numero-cedula");
const contrasenaInicio =  document.querySelector(".contrasena-inicio");
const mensajeAlertaInicio = document.querySelector(".mensaje-alerta-inicio");
const btnInicio = document.querySelector(".btn-inicio");

//Acceder al localStorage
let datos = JSON.parse(localStorage.getItem("usuario"));

//Validacion
btnInicio.addEventListener("click", (e) => {
    e.preventDefault();

    if (numeroCedula.value == datos.cedulaLocal && contrasenaInicio.value == datos.contrasenaLocal) {
        mensajeAlertaInicio.classList.add("mensaje-alerta-verde-inicio");
        mensajeAlertaInicio.classList.remove("mensaje-alerta-rojo-inicio");
        mensajeAlertaInicio.innerHTML = "Inicio de sesion realizado con exito";

        setTimeout(() => {
            window.location.href = "./HTML/carga.html";
        }, 2000);

    } else {
        mensajeAlertaInicio.classList.add("mensaje-alerta-rojo-inicio");
        mensajeAlertaInicio.classList.remove("mensaje-alerta-verde-inicio");
        mensajeAlertaInicio.innerHTML = "Numero de cédula o contraseña incorrectos";
    }
});