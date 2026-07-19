export let conectado = true;

window.addEventListener("offline", () => {
    console.log("Se fue la conexion");
    conectado = false;
    console.log(conectado);
});

window.addEventListener("online", () => {
    console.log("Ya volvio la conexion");
    conectado = true;
    console.log(conectado);
});