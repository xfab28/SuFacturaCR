const secciones = document.querySelector('.secciones');
const articulos = document.querySelector('.articulos');
const compras = document.querySelector('.compras');
const content = document.querySelector('.content');

articulos.addEventListener("click", () => {
    secciones.classList.remove("seleccion-compras");
    secciones.classList.add("seleccion-articulos");
    
    content.classList.add("articulos-cuadro");
    content.classList.remove("compras-info")
});

compras.addEventListener("click", () => {
    secciones.classList.remove("seleccion-articulos");
    secciones.classList.add("seleccion-compras");

    content.classList.remove("articulos-cuadro");
    content.classList.add("compras-info")
});