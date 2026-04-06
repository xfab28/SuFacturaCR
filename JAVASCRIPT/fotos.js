const defaultImage = "../IMAGENES/imagen-defecto.jpg";

const inputFoto1 = document.getElementById("input-foto1");
const img1 = document.querySelector(".imagen-defecto1");

const inputFoto2 = document.getElementById("input-foto2");
const img2 = document.querySelector(".imagen-defecto2");

//Primera imagen
inputFoto1.addEventListener("change", (e) => {
    if (e.target.files[0]) {
        const reader = new FileReader()
        reader.onload = function cargarImagenNego(e) {
            img1.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    } else {
        img1.src = defaultImage;
    }
});

//Segunda imagen
inputFoto2.addEventListener("change", (e) => {
    console.log(e.target.files);

    if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function cargarImagenProp(e) {
            img2.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    } else {
        img2.src = defaultImage;
    }
});