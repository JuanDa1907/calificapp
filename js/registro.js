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


  
  var endpoint = "http://132.226.119.41:8080/api/Usuario";
  
  
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
     
  function newUser() {
    let usuario = {
      
      documento: $("#Documento").val(),
      nombre: $("#Nombre").val(),
      apellido: $("#Apellido").val(),
      edad: $("#Edad").val(),
      genero: $("#Genero").val(),
      telefono: $("#Telefono").val(),  
      email: $("#Email").val(),
      contrasena: $("#Contrasena").val(),
      role: "USUARIO",
      ciudad: {"idCiudad":$("#Ciudad").val()},
      tipoTransporte: {"idTransporte":$("#privado").val()},
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
            '<div class="alert alert-success" role="alert"> Usuario registrado con exito! Ya puedes <a href="logueo.html">Iniciar Sesion</a></div>'
          );
          $("#mensajes").show(300);
          limpiar();
        },
  
        error: function (jqXHR, textStatus, errorThrown) {
          $("#mensajes").html(
            '<div class="alert alert-danger" role="alert"> Lo sentimos ha ocurrido un error!</div>'
          );
          $("#mensajes").show(300);
          console.log("No Se guardo correctamente");
        },
      });
    }
  }
  
  function ValidateEmail(valor) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valor.match(mailformat);
  }
  
  function validaesVacio(dato) {
    return !dato.trim().length;
  }
  
  function validar() {
    //obtiene valores
    
    let documento= $("#Documento").val();
    let nombre= $("#Nombre").val();
    let apellido= $("#Apellido").val();
    let edad= $("#Edad").val();
    let genero= $("#Genero").val();
    let telefono= $("#Telefono").val();  
    let email= $("#Email").val();
    let pass1= $("#Contrasena").val();
    let pass2= $("#Contrasena2").val();
    let Ciudad= $("#Ciudad").val();
    let Tipotransporte= $("#Tipotransporte").val();
    let privado = $("#privado").val();
    let publico = $("#publico").val();
    let errores = "";
    $("#mensajes").html("");
  
    //valida que los campos no sean vacios
    if (validaesVacio(documento)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu numero de documento!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Documento").focus();
      return false;
    }else if (validaesVacio(nombre)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu nombre!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Nombre").focus();
      return false;
    } else if (validaesVacio(apellido)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu apellido!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Apellido").focus();
      return false;
    } else if (validaesVacio(edad)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu edad!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Edad").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (validaesVacio(genero)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor selecciona tu genero!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Genero").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (validaesVacio(telefono)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu numero de celular!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Telefono").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    }else if (validaesVacio(email)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu correo electronico!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Email").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (!ValidateEmail(email)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa un correo electronico valido!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#mensajes").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (validaesVacio(pass1)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor ingresa tu contraseña!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Password").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (validaesVacio(pass2)) {
      errores =
        '<div class="alert alert-danger" role="alert"> Por favor confirma tu contraseña!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Password2").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (pass1 != pass2) {
      errores = '<div class="alert alert-danger" role="alert"> Las contraseñas no coinciden!</div>';
      $("#mensajes").html(errores);
      $("#mensajes").show(500);
      $("#Password2").focus();
      $('html, body').animate({scrollTop:0}, );
      return false;
    } else if (Ciudad == "") {
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
  
  function alertaUser() {
    let texto =
      'Usuario creado con exito, ya puedes <a href="logueo.html" class="alert-link">Iniciar Sesion.</a>';
    $("#alertaUser").html(texto);
    $("#alertaUser").show();
  }
  
  function limpiar() {
    $("#Documento").val(""),
      $("#Nombre").val(""),
      $("#Apellido").val(""),
      $("#Edad").val("");
    $("#Genero").val("");
    $("#Telefono").val("");
    $("#Email").val("");
    $("#Contrasena").val("");
    $("#Contrasena2").val("");
    $("Ciudad").val("");
    $("#Tipotransporte").val("");
    $("#privado").val("");
    $("#publico").val("");
  }
