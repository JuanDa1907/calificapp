$(document).ready(function () {
    $("#tipoDocumento").focus();
    inicioRutas();

    let userJson = sessionStorage.getItem("user");
    if(userJson == null){
        window.location.href = "logueo.html";
    }else{
        let userJS = JSON.parse(userJson);
        $("#Usuario").append('<option selected value='+ userJS.Documento +'>'+userJS.Documento+'</option>');
    }

    let rutaJson = sessionStorage.getItem("ruta");
    if(rutaJson == null){
        window.location.href = "ruta.html";
    }else{
        let rutaJS = JSON.parse(rutaJson);
        $("#Ruta").append('<option selected value='+ rutaJS.idRuta +'>'+rutaJS.ruta+'</option>');
        
  }
)}; 
  

  var endpoint = "http://132.226.119.41:8080/api/Experiencia";
     
  function newExperiencia() {    
      
      let ruta = {
      
        userJS = JSON.parse(userJson),
        comentario: $("#Comentario").val(),
        califica: $("#Califica").val(),
        usuario: {documento:userJS.Documento},
        ruta:{idRuta:$("#Ruta").val()}
      }
    
      
        $.ajax({
          type: "POST",
          contentType: "application/json",
          dataType: "JSON",
          data: JSON.stringify(usuario),
    
          url: endpoint + "/save",
    
          success: function (response) {
            console.log(response);
            $("#mensajes").html(
              '<div class="alert alert-success" role="alert"> Ruta registrada con exito!</div>'
            );
            $("#mensajes").show(300);
            limpiar();
          },
    
          error: function (jqXHR, textStatus, errorThrown) {
            $("#mensajes").html(
              '<div class="alert alert-danger" role="alert"> Error!!</div>'
            );
            $("#mensajes").show(300);
            console.log("No Se guardo correctamente");
          },
        });
  }
    

  
  
  function validaesVacio(dato) {
    return !dato.trim().length;
  }
  
  // function validar() {
  //   //obtiene valores
    
  //   let origen= $("#Origen").val();
  //   let destino= $("#Destino").val();
  //   let tiempoR= $("#TiempoR").val();
  //   let tiempoE= $("#TiempoE").val();
  //   let costo= $("#Costo").val();
  //   let Ciudad= $("#Ciudad").val();
  //   let Tipotransporte= $("#Tipotransporte").val();
    
  //   let errores = "";
  //   $("#mensajes").html("");
  
  //   //valida que los campos no sean vacios
  //   if (validaesVacio(origen)) {
  //     errores =
  //       '<div class="alert alert-danger" role="alert"> Por favor ingresa direccion de origen!</div>';
  //     $("#mensajes").html(errores);
  //     $("#mensajes").show(500);
  //     $("#Origen").focus();
  //     return false;
  //   }else if (validaesVacio(destino)) {
  //     errores =
  //       '<div class="alert alert-danger" role="alert"> Por favor ingresa direccion de destino!</div>';
  //     $("#mensajes").html(errores);
  //     $("#mensajes").show(500);
  //     $("#Destino").focus();
  //     return false;
  //   } else if (validaesVacio(tiempoR)) {
  //     errores =
  //       '<div class="alert alert-danger" role="alert"> Por favor ingresa el tiempo real del trayecto!</div>';
  //     $("#mensajes").html(errores);
  //     $("#mensajes").show(500);
  //     $("#TiempoR").focus();
  //     return false;
  //   } else if (validaesVacio(tiempoE)) {
  //     errores =
  //       '<div class="alert alert-danger" role="alert"> Por favor ingresa el tiempo estimado!</div>';
  //     $("#mensajes").html(errores);
  //     $("#mensajes").show(500);
  //     $("#TiempoE").focus();
  //     $('html, body').animate({scrollTop:0}, );
  //     return false;
  //   } else if (validaesVacio(costo)) {
  //     errores =
  //       '<div class="alert alert-danger" role="alert"> Por favor Ingresa el costo del viaje!</div>';
  //     $("#mensajes").html(errores);
  //     $("#mensajes").show(500);
  //     $("#Costo").focus();
  //     $('html, body').animate({scrollTop:0}, );
  //     return false;
  //   }   else if (Ciudad == "") {
  //       errores =
  //         '<div class="alert alert-danger" role="alert"> Por favor Selecciona una ciudad!</div>';
  //       $("#mensajes").html(errores);
  //       $("#mensajes").show(500);
  //       $("#Ciudad").focus();
  //       $('html, body').animate({scrollTop:0}, );
  //       return false;
  //     }else if (Tipotransporte == "") {
  //       errores =
  //         '<div class="alert alert-danger" role="alert"> Por favor Selecciona un tipo de transporte preferido!</div>';
  //       $("#mensajes").html(errores);
  //       $("#mensajes").show(500);
  //       $("#Ciudad").focus();
  //       $('html, body').animate({scrollTop:0}, );
  //       return false;
  //     }else {
  //     $("#mensajes").html("");
  //     $("#mensajes").hide(500);
  //     return true;
  //   }
  
  //   return true;
  // }

  
  


  
  // function limpiar() {
  //   $("#Origen").val(""),
  //     $("#Destino").val(""),
  //     $("#TiempoR").val(""),
  //     $("#TiempoE").val("");
  //   $("#Costo").val("");
  //   $("Ciudad").val("");
  //   $("#Tipotransporte").val("");
  //   $("#privado").val("");
  //   $("#publico").val("");
  // }

