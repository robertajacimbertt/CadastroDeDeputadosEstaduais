$(document).ready(function(){

 $("#calcular").on("click", function(){
    var peso = $("#peso").val();
    var altura = $("#altura").val();
    var resposta;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://andrebordignon.esy.es/php/imc.php?peso=" + peso + "&altura=" + altura); 
    xhr.send();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        resposta = JSON.parse(xhr.responseText);
        console.log(resposta);
         $("body").append("<div id='show'><h1>Resposta:</h1><br><p>Seu IMC é: " + resposta.imc + "</p><p>Análise: " + resposta.mensage + "</p></div>");
      }
    }
 });

});
