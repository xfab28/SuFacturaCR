import { mensaje } from "./mensaje.js";

export let conectado = true;

window.addEventListener("offline", () => {
    mensaje("Se fue la conexión a internet, tus datos se guardaran localmente");
    conectado = false;
});

window.addEventListener("online", () => {
    mensaje("Ya volvio la conexión a internet");
    conectado = true;
});