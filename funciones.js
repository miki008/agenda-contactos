

function doGet() {

return HtmlService.createTemplateFromFile('web').evaluate().setTitle('AgendaWebApp');

}






function obtenerDatosHTML(nombre) { 
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}


function obtenerContactos(){
    let hoja = SpreadsheetApp.openById('14qFioWE5iplfM3aNSgctBvsin6kQz4H0vacB5V1337M').getActiveSheet();
    let datos = hoja.getDataRange().getValues();
    
   // datos.shift();
    Logger.log(datos);
    return datos;
}