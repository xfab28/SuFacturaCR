const menu_container = document.getElementById("menu-container");
const side_bar = document.getElementById("side-bar");
const direcciones = document.querySelectorAll(".direcciones");

menu_container.addEventListener("click", () => {
    side_bar.classList.toggle("menu-toggle"); //El toggle permite que tambien al volver a hacer click se cierre
    
    direcciones.forEach(direccion => {
        direccion.classList.toggle("a-display");
    });
});
