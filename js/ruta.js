$(document).ready(function () {
    $("#tipoDocumento").focus();
    inicioTransportes();
    inicioCiudades();

    $("#privado").hide();
    $("#publico").hide();

    $("#Tipotransporte").change(function(){
        if($("#Tipotransporte").val()=="Privado"){
            $("#privado").show(100);
            $("#publico").hide();
        }else if($("#Tipotransporte").val()=="Publico"){
            $("#publico").show(100);
            $("#privado").hide();
        }
      });
    
  });


  
  var endpoint = "http://132.226.119.41:8080/api/Ruta";
  
  
  function inicioTransportes(){
    
    $.ajax({
        url:"http://132.226.119.41:8080/api/Tipotransporte/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){

          let $select2 = $("#publico");
          let $select = $("#privado");

        for(i=0;i<respuesta.length;i++){
            if(respuesta[i].tipo == "privado"){
                let $select = $("#privado");
                $select.append('<option value='+respuesta[i].idTransporte+'>'+respuesta[i].empresa+'</option>');
            }else if(respuesta[i].tipo == "publico"){
                $select2.append('<option value='+respuesta[i].idTransporte+'>'+respuesta[i].empresa+'</option>')
        } 
        }
    }

    })
}

function inicioCiudades(){
    
    $.ajax({
        url:"http://132.226.119.41:8080/api/Ciudad/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
        //for(i=0;i<respuesta.length;i++){
                let $select = $("#Ciudad");
                $.each(respuesta, function (idCiudad, ciudad) {
                $select.append('<option value='+ ciudad.idCiudad +'>'+ciudad.ciudad+'</option>');
            
            }); 
            
        //}
    }

    })
}
     
  function newRuta() {


    if ($("#publico").val() == ""){
      
      let ruta = {
      
        origen: $("#Origen").val(),
        destino: $("#Destino").val(),
        tiempoReal: $("#TiempoR").val(),
        tiempoEstimado: $("#TiempoE").val(),
        costo: $("#Costo").val(),       
        ciudad: {"idCiudad":$("#Ciudad").val()},
        tipoTransporte: {"idTransporte":$("#privado").val()},
      };
    
      if (validar()) {
        $.ajax({
          type: "POST",
          contentType: "application/json",
          dataType: "JSON",
          data: JSON.stringify(ruta),
    
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
      
    }else{
      
      let usuario = {
      
        origen: $("#Origen").val(),
        destino: $("#Destino").val(),
        tiempoReal: $("#TiempoR").val(),
        tiempoEstimado: $("#TiempoE").val(),
        costo: $("#Costo").val(),       
        ciudad: {"idCiudad":$("#Ciudad").val()},
        tipoTransporte: {"idTransporte":$("#publico").val()},
      };
    
      if (validar()) {
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
            ruta(response);
          },
    
          error: function (jqXHR, textStatus, errorThrown) {
            $("#mensajes").html(
              '<div class="alert alert-danger" role="alert"> Error!</div>'
            );
            $("#mensajes").show(300);
            console.log("No Se guardo correctamente");
          },
        });
      }
    }
    

    
  }
  

  
  
  function validaesVacio(dato) {
    return !dato.trim().length;
  }
  
  function validar() {
    //obtiene valores
    
    let origen= $("#Origen").val();
    let destino= $("#Destino").val();
    let tiempoR= $("#TiempoR").val();
    let tiempoE= $("#TiempoE").val();
    let costo= $("#Costo").val();
    let Ciudad= $("#Ciudad").val();
    let Tipotransporte= $("#Tipotransporte").val();
    
    let errores = "";
    $("#mensajes").html("");
  
    //valida que los campos no sean vacios
    if (validaesVacio(origen)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa direccion de origen!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Origen").focus();
      return false;
    }else if (validaesVacio(destino)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa direccion de destino!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Destino").focus();
      return false;
    } else if (validaesVacio(tiempoR)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa el tiempo real del trayecto!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#TiempoR").focus();
      return false;
    } else if (validaesVacio(tiempoE)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa el tiempo estimado!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#TiempoE").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (validaesVacio(costo)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor Ingresa el costo del viaje!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Costo").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    }   else if (Ciudad == "") {
        errores =
          '<div class="alert alert-danger" role="alert"> Por favor Selecciona una ciudad!</div>';
        $("#mensajes").html(errores);
        $("#mensajes").show(500);
        $("#Ciudad").focus();
        $('html, body').animate({scrollTop:0}, );
        return false;
      }else if (Tipotransporte == "") {
        errores =
          '<div class="alert alert-danger" role="alert"> Por favor Selecciona un tipo de transporte preferido!</div>';
        $("#mensajes").html(errores);
        $("#mensajes").show(500);
        $("#Ciudad").focus();
        $('html, body').animate({scrollTop:0}, );
        return false;
      }else {
      $("#mensajes").html("");
      $("#mensajes").hide(500);
      return true;
    }
  
    return true;
  }
  
  function ruta(response) {
   
      let ruta = {
        
        idRuta: response.idRuta,
        origen: response.origen,
        destino: response.destino,
        ruta: response.origen + " -> " + response.destino,
       
  }
      let rutaJson = JSON.stringify(ruta);
      sessionStorage.setItem("ruta", rutaJson);
      window.location.href = "experiencia.html";
  }
  

  
  function limpiar() {
    $("#Origen").val(""),
      $("#Destino").val(""),
      $("#TiempoR").val(""),
      $("#TiempoE").val("");
    $("#Costo").val("");
    $("Ciudad").val("");
    $("#Tipotransporte").val("");
    $("#privado").val("");
    $("#publico").val("");
  }
