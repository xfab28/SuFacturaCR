const nombreUsuario = document.getElementById("nombre-usuario");
let nombre = JSON.parse(localStorage.getItem("usuario"));
nombreUsuario.innerHTML = nombre.nombreLocal;