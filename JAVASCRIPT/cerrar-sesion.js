//Boton cerrar sesión
const cerrarSesion = document.querySelector(".cerrar-sesion");

cerrarSesion.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const confirmar = document.createElement("div");
    confirmar.classList.add("confirmar");

    const h3 = document.createElement("h3");
    h3.innerHTML = "¿Seguro que quieres cerrar sesión?";

    const botones = document.createElement("div");
    botones.classList.add("botones");

    const aceptar = document.createElement("button");
    aceptar.innerHTML = "Aceptar";
    aceptar.classList.add("aceptar");
    aceptar.onclick = function cerrarSesion() {
        confirmar.removeChild(botones);
        h3.innerHTML = "Cerrando...";
        setTimeout(() => {
            window.location.href = "../HTML/inicio-de-sesion.html";
        }, 3000);
    }

    const rechazar = document.createElement("button");
    rechazar.innerHTML = "Cancelar";
    rechazar.classList.add("cancelar");
    rechazar.onclick = function cancelarCierre() {
        overlay.style.display = "none";
    }

    overlay.style.display = "block";
    botones.appendChild(aceptar);
    botones.appendChild(rechazar);
    confirmar.appendChild(h3);
    confirmar.appendChild(botones);
    overlay.appendChild(confirmar);
    document.body.appendChild(overlay);
});