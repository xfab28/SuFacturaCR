export function mensaje(texto) {
    const mensaje_internet = document.createElement("div");
    mensaje_internet.classList.add("mensaje-internet");

    const p = document.createElement("p");
    p.textContent = texto;

    mensaje_internet.appendChild(p);

    document.body.append(mensaje_internet);


    setTimeout(() => {
        p.classList.add("desaparecer")
    }, 4500);

    setTimeout(() => {
        
    }, 5000);
}