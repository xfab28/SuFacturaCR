const { jsPDF } = window.jspdf;

const btnTotalizar = document.querySelector(".btn-totalizar");

btnTotalizar.addEventListener("click", () => {

    const doc = new jsPDF();
    
    let datosProv = JSON.parse(localStorage.getItem("usuario"));

    const nombre = datosProv.nombreLocal;
    const apellidos = datosProv.apellidosLocal;
    const correo = datosProv.correoLocal;
    const cedula = datosProv.cedulaLocal;

    const headerHeight = 45;

    doc.setFillColor(0x5b, 0x48, 0xd9);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), headerHeight, "F");

    const contentStartY = headerHeight + 10;

    doc.text("Factura Simple", 10, contentStartY);
    doc.text(nombre, 10, contentStartY + 10);
    doc.text(apellidos, 10, contentStartY + 20);
    doc.text(correo, 10, contentStartY + 30);
    doc.text(cedula, 10, contentStartY + 40);

    window.open(doc.output("bloburl"));
});