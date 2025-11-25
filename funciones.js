

function doGet() {

return HtmlService.createTemplateFromFile('web').evaluate().setTitle('AgendaWebApp');

}






function obtenerDatosHTML(nombre) { 
    return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}