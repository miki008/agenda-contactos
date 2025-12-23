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


function obtenerDatos(){
    
    return HOJA.getDataRange().getValues();
    
}




function insertarContacto(nombre, apellidos,correo,telefono) 
{

    let idNuevo = HOJA.getLastRow() ;
 
   HOJA.appendRow([idNuevo,nombre, apellidos,correo,telefono]);

}

function borrarContacto(numFila){

  HOJA.deleteRow(numFila);
}

function modificarContacto(numFila,datos){


    let celdas = HOJA.getRange('B'+numFila+':E'+numFila);
    celdas.setValues([[datos.nombre, datos.apellidos, datos.correo, datos.telefono]]);   

  /* HOJA.getRange(numFila,2).setValue(nombre);
  HOJA.getRange(numFila,3).setValue(apellidos);
  HOJA.getRange(numFila,4).setValue(correo);
  HOJA.getRange(numFila,5).setValue(telefono); */
}


function importarContactos(){
  let url = "https://randomuser.me/api/?results=5&inc=name, email, phone,picture";
  let respuesta = UrlFetchApp.fetch(url);
  let datos = JSON.parse(respuesta.getContentText());

  datos.results.forEach(insertarContactoJSON);

}

function insertarContactoJSON(contacto){
  let idNuevo = HOJA.getLastRow() ;
HOJA.appendRow([idNuevo,contacto.name.first, contacto.name.last,contacto.email, contacto.phone,contacto.picture.large]);
}