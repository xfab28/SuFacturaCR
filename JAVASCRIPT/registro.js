//Seleccionamos elementos
const nombre = document.querySelector(".nombre");
const apellidos = document.querySelector(".apellidos");
const cedula = document.querySelector(".cedula");
const correo = document.querySelector(".correo");
const contrasena = document.querySelector(".contrasena");
const mensajeAlerta = document.querySelector(".mensaje-alerta");
const btnRegistro = document.querySelector(".btn-registro");

//Validaciones
btnRegistro.addEventListener("click", async (e) => {
    e.preventDefault();

    if (nombre.value.length > 40 || nombre.value.length < 5) {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");       
        mensajeAlerta.innerHTML = "Nombre invalido";

        setTimeout(() => {
            mensajeAlerta.innerHTML = "";
        }, 3000);
        
    } else if (apellidos.value.length > 40 || apellidos.value.length < 5) {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");
        mensajeAlerta.innerHTML = "Apellidos invalidos";

        setTimeout(() => {
            mensajeAlerta.innerHTML = "";
        }, 3000);

    } else if (cedula.value.length > 9 || cedula.value.length < 4) {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");
        mensajeAlerta.innerHTML = "Cedula invalida";

        setTimeout(() => {
            mensajeAlerta.innerHTML = "";
        }, 3000);

    } else if (correo.value.indexOf("@") == -1 || correo.value.indexOf(".") == -1) {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");
        mensajeAlerta.innerHTML = "Correo invalido";

        setTimeout(() => {
            mensajeAlerta.innerHTML = "";
        }, 3000);
              
    } else if (contrasena.value.length > 20 || contrasena.value.length < 5) {
        mensajeAlerta.classList.add("mensaje-alerta-rojo");
        mensajeAlerta.classList.remove("mensaje-alerta-verde");
        mensajeAlerta.innerHTML = "Contraseña invalida";

        setTimeout(() => {
            mensajeAlerta.innerHTML = "";
        }, 3000);

    } else {
        let nombreLocal = nombre.value;
        let apellidosLocal = apellidos.value;
        let cedulaLocal = cedula.value;
        let correoLocal = correo.value;
        let contrasenaLocal = contrasena.value;

        localStorage.setItem("usuario", JSON.stringify({
                nombreLocal, 
                apellidosLocal, 
                cedulaLocal, 
                correoLocal, 
                contrasenaLocal
            })
        );

        try {
            //Enviar datos al servidor
            const respuesta = await fetch('/registrar', {
                method: 'post',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    nombre: nombreLocal,
                    apellidos: apellidosLocal,
                    cedula: cedulaLocal,
                    correo: correoLocal,
                    contrasena: contrasenaLocal
                })
            });

            if (respuesta.ok) {
                mensajeAlerta.classList.add("mensaje-alerta-verde");
                mensajeAlerta.classList.remove("mensaje-alerta-rojo");
                mensajeAlerta.innerHTML = "Registro realizado correctamente";

                setTimeout(() => {
                    window.location.href = "HTML/carga.html";
                }, 2000);

            } else {
                mensajeAlerta.classList.add("mensaje-alerta-rojo");
                mensajeAlerta.innerHTML = "Error al registrar";
            }
            
        } catch (error) {
            console.log(error);
            mensajeAlerta.classList.add("mensaje-alerta-rojo");
            mensajeAlerta.innerHTML = "Error del servidor";
        }
    }
});