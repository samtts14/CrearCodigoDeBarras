// script.js

// Función para generar el PDF
async function generatePDF() {
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([3.3 * 72, 1.8 * 72]); // Tamaño de la página en puntos

    const logoUrl = 'LOGO.jpg'; // URL del logo (debe estar en el mismo directorio o en una URL accesible)
    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);

    // Logo en la parte superior izquierda
    page.drawImage(logoImage, {
        x: 2,
        y: 90,
        width: 90,
        height: 35
    });

    // Precio en la parte superior derecha
    const font = await pdfDoc.embedFont(PDFLib.Font.HelveticaBold);
    page.setFont(font);
    page.setFontSize(16);
    page.drawText('$' + formatNumber(15.00), { x: 130, y: 108 }); // Ejemplo de precio

    // Agregar el código de barras (reemplaza con el código real de tu biblioteca de códigos de barras)
    const barcodeText = '123456789'; // Ejemplo de código de barras
    page.drawText(barcodeText, { x: 2, y: 20, size: 12 }); // Aquí deberías usar una imagen de código de barras si tienes

    // Nombre del producto
    page.drawText('Nombre del Producto', { x: 2, y: 74, size: 12 });

    // Descripción del producto
    page.drawText('Descripción del Producto', { x: 2, y: 60, size: 12 });

    // Código de barras
    page.drawText('Código123', { x: 72, y: 5, size: 18 });

    // Guardar el PDF
    const pdfBytes = await pdfDoc.save();

    // Descargar el PDF
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = 'etiqueta.pdf';
    link.click();
}

// Función para formatear el número
function formatNumber(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
}

// Llamar a la función cuando se cargue la página
window.onload = generatePDF;
