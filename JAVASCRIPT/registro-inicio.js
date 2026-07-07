const registroIr = document.querySelector(".registro-ir");
const inicioIr = document.querySelector(".inicio-ir");
const desactivado = document.querySelector(".desactivado");
const registro = document.querySelector(".registro");
const inicioSesion = document.querySelector(".inicio-sesion");
const irRegistro = document.querySelector(".ir-registro");
const irInicio = document.querySelector(".ir-inicio");
const direccionamiento_regis = document.querySelector(".direccionamiento-regis");
const direccionamient_inicio = document.querySelector(".direccionamiento-inicio");

registroIr.addEventListener("click", () => {
    desactivado.classList.add("desactivado-inicio");
    desactivado.classList.remove("desactivado-registro");

    registro.classList.add("registro-animacion");
    setTimeout(() => {
        registro.classList.remove("registro-animacion");
    }, 2000);

    irRegistro.classList.add("ir-registro-animacion");
    setTimeout(() => {
        irRegistro.classList.remove("ir-registro-animacion");
    });
});

inicioIr.addEventListener("click", () => {
    desactivado.classList.add("desactivado-registro");
    desactivado.classList.remove("desactivado-inicio");

    inicioSesion.classList.add("inicio-sesion-animacion");
    setTimeout(() => {
        inicioSesion.classList.remove("inicio-sesion-animacion");
    }, 2000);

    irInicio.classList.add("ir-inicio-animacion");
    setTimeout(() => {
        irInicio.classList.add("ir-inicio-animacion");
    });
});

direccionamiento_regis.addEventListener("click", () => {
    inicioSesion.classList.add("desaparecer-formulario");
    registro.classList.add("aparecer-formulario");
});

direccionamient_inicio.addEventListener("click", () => {
    inicioSesion.classList.remove("desaparecer-formulario");
    registro.classList.remove("aparecer-formulario");
});