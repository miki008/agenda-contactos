 const HOJA = SpreadsheetApp.openById('14qFioWE5iplfM3aNSgctBvsin6kQz4H0vacB5V1337M').getActiveSheet();


function doGet() {

return HtmlService.createTemplateFromFile('web').evaluate().setTitle('AgendaWebApp');

}

function doPost(datos) {

    insertarContacto(datos.parameter.nombre, datos.parameter.correo);
    return HtmlService.createTemplateFromFile('web').evaluate().setTitle('AgendaWebApp');
}




function obtenerDatosHTML(nombre) { 
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}


function obtenerContactos(){
    
    return HOJA.getDataRange().getValues();
    
}


function insertarContacto(nombre, correo){

    let idNuevo = HOJA.getLastRow() ;
 
   HOJA.appendRow([idNuevo,nombre, correo]);




}