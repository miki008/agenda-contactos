const HOJA = SpreadsheetApp.openById('14qFioWE5iplfM3aNSgctBvsin6kQz4H0vacB5V1337M').getActiveSheet();
const CARPETA = DriveApp.getFolderById("1qeXyTKCh-Ifcdry7WnU5e6dj_CvIKCgz");
const CABECERA_URL_IMAGEN_DRIVE = "https://drive.google.com/thumbnail?id=";
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




function insertarContacto(contacto, imagen) 
{

    let idNuevo = HOJA.getLastRow() ;

    if(imagen)
    {
      let blob = Utilities.newBlob(imagen.datos, imagen.tipo, imagen.nombre);
      let archivo = CARPETA.createFile(blob);
      contacto.imagen = CABECERA_URL_IMAGEN_DRIVE+archivo.getId();
    }
 
   HOJA.appendRow([idNuevo,contacto.nombre, contacto.apellidos,contacto.correo,contacto.telefono,contacto.imagen]);

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