const { jsPDF } = window.jspdf;

const btnTotalizar = document.querySelector(".btn-totalizar");
const img = document.getElementById("logo");

btnTotalizar.addEventListener("click", () => {

    const doc = new jsPDF();

    let datosProv = JSON.parse(localStorage.getItem("usuario"));

    const nombre = datosProv.nombreLocal;
    const apellidos = datosProv.apellidosLocal;
    const correo = datosProv.correoLocal;
    const cedula = datosProv.cedulaLocal;

    // ALTURA DEL HEADER
    const headerHeight = 40;

    // POSICIÓN DONDE EMPIEZA EL CONTENIDO

    // ======================
    // HEADER
    // ======================

    // Color azul
    doc.setFillColor(39, 87, 245);

    // Rectángulo del header
    doc.rect(
        0,
        0,
        doc.internal.pageSize.getWidth(),
        headerHeight,
        "F"
    );

    // ======================
    // TEXTO DEL HEADER
    // ======================

    // Color blanco
    doc.setTextColor(255, 255, 255);

    // Fuente grande
    doc.setFontSize(15);

    // Negrita
    doc.setFont("helvetica", "bold");

    // Texto dentro del header
    doc.text(`${nombre} ${apellidos}`, 60, 10);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text("CONTADOR", 60, 20);
    doc.text(`Cédula: ${cedula}`, 60, 30);

    doc.setFontSize(12);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(`Teléfono:`, 135, 10);
    doc.text(`Correo: ${correo}`, 135, 20);
    doc.text("Dirección:", 135, 30);
    
    //Contenido
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text(`Cliente:`, 10, 50);
    doc.text(`Cédula:`, 10, 60);
    doc.text(`Teléfono:`, 10, 67);
    doc.text(`Correo:`, 10, 74);
    doc.text(`Dirección:`, 10, 84);
    doc.text(`Condición de venta:`, 110, 60);
    doc.text(`Medio de pago:`, 110, 74);

    //Bordes
    doc.setFillColor(39, 87, 245);

    doc.rect(
        0,
        89,
        doc.internal.pageSize.getWidth(),
        1,
        "F"
    );

    //Subtitulo
    const pagewidth = doc.internal.pageSize.getWidth();
    const midpage = pagewidth / 2;

    doc.setFontSize(30);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text('DETALLE', midpage - 22, 100);

    //Bordes
    doc.setFillColor(39, 87, 245);

    doc.rect(
        0,
        103,
        doc.internal.pageSize.getWidth(),
        1,
        "F"
    );

    //Descripciones
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text('CODIGO', 8, 113);
    doc.text('CANTIDAD', 29, 113);
    doc.text('DESCRIPCIÓN', 54, 113);
    doc.text(' PRECIO\nUNITARIO', 88, 111);
    doc.text('DESCUENTO', 114, 113);
    doc.text('SUBTOTAL', 146, 113);
    doc.text('   MONTO\nIMPUESTOS', 174, 111);

    //Borde
    doc.setFillColor(39, 87, 245);

    doc.rect(
        0,
        120,
        doc.internal.pageSize.getWidth(),
        1,
        "F"
    );   

    //Montos
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Subtotal Neto:`, 135, 161);
    doc.text(`Total IVA 13%:`, 135, 167);
    doc.text(`Total IVA 1%:`, 135, 173);
    doc.text(`Total IVA 2%:`, 135, 179);
    doc.text(`Total exonerado:`, 135, 185);
    doc.text(`Total Factura:`, 135, 191);

    //Nota
    doc.text(`Nota:`, 10, 161);

    //Datos extra
    doc.text(`Factura N°:`, 10, 240);
    doc.text(`Codigo:`, 10, 247);
    
    doc.text(`Fecha de emisión:`, 130, 240);
    doc.text(`Hora:`, 130, 247);

    // Abrir PDF
    window.open(doc.output("bloburl"));
});