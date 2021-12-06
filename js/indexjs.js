$(document).ready(function(){

    let userJson = sessionStorage.getItem("user");
    if(userJson == null){
        window.location.href = "logueo.html";
    }else{
        let userJS = JSON.parse(userJson);
        $("#nombre").html("Bienvenido"+ userJS.nombre);
        $("#rol").html("Rol: "+ userJS.role);
        $("#documento").html("Documento: "+ userJS.documento);
    }
});

