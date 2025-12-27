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


function insertarContacto(contacto,imagen) 
{
    // Calculamos el ID (puedes ajustarlo según tu lógica)
    let idNuevo = HOJA.getLastRow() + 1; 
    //Logger.log(idNuevo);
  
   if(imagen) contacto.imagen = guardarImagen(imagen,contacto);
   
    // Insertar en la hoja de cálculo
    HOJA.appendRow([idNuevo, contacto.nombre, contacto.apellidos, contacto.correo, contacto.telefono, contacto.imagen]);
}


function modificarContacto(contacto,imagen){

 if(imagen) contacto.imagen = guardarImagen(imagen,contacto);

    let celdas = HOJA.getRange('B'+contacto.fila+':F'+contacto.fila);
    celdas.setValues([[contacto.nombre, contacto.apellidos, contacto.correo, contacto.telefono,contacto.imagen]]);   

}

function guardarImagen(imagen,contacto){
if(imagen)
    {
      // 1. Extraer la extensión del archivo original
      let extension = imagen.nombre.split('.').pop(); 
      
      // 2. Construir el nuevo nombre
      let nuevoNombre = contacto.nombre + "_" + contacto.apellidos + "." + extension;

      // 3. Crear el Blob SIN pasarle el nombre original en el constructor
      let blob = Utilities.newBlob(imagen.datos, imagen.tipo);
      // 4. ASIGNAR EL NOMBRE AL BLOB (Esto es lo más seguro)
      blob.setName(nuevoNombre);
      
      // 5. Crear el archivo (heredará el nombre del blob)
      let archivo = CARPETA.createFile(blob);
      
      // Guardar la URL con el ID
      return CABECERA_URL_IMAGEN_DRIVE + archivo.getId();
    }

}


function borrarContacto(numFila){

  HOJA.deleteRow(numFila);
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