//Seleccionamos elementos
const idUsuario = document.querySelector(".id-usuario");
const nombrePropietario = document.querySelector(".nombre-propietario");

const cantIngresos = document.querySelector(".cant-ingresos");

//Insertamos nombre registrado
let datos = JSON.parse(localStorage.getItem("usuario"));

idUsuario.innerHTML = datos.nombreLocal;
nombrePropietario.innerHTML = datos.nombreLocal + " " + datos.apellidosLocal;

//Insertar ingresos
let montoIngresos = localStorage.getItem("montoIngresos");
cantIngresos.innerHTML = "+ ₡" + montoIngresos;