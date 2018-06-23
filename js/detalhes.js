$(document).ready(function() {
    var ListaDeCandidatos = localStorage.getItem('ListaDeCandidatos');
    ListaDeCandidatos = JSON.parse(ListaDeCandidatos);
    var id = location.search.split("=");
    id = id[1];

    buscaCandidato();

    $('#redirecionar').click(function() {
        var novaURL = "index.html";
        $(window.document.location).attr('href', novaURL);
    });

    function buscaCandidato() {
        var achou = false;
        ListaDeCandidatos.forEach(candidato => {
            if (candidato.idcandidato === id) {
                preencher(candidato);
                achou = true;
            }
        });
        if (achou) { //mensagem de erro e redireciona para a pagina principal
            // console.log("achou o cara");
        } else {
            // console.log("nao achou o cara");
        }
    }

    function preencher(candidato) {
        console.log(candidato);
    }
});