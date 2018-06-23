$(document).ready(function() {
    var ListaDeCandidatos = localStorage.getItem('ListaDeCandidatos');
    ListaDeCandidatos = JSON.parse(ListaDeCandidatos);
    var id = location.search.split("=");
    id = id[1];

    buscaCandidato();

    function buscaCandidato() {
        var achou = false;
        ListaDeCandidatos.forEach(candidato => {
            if (candidato.idcandidato === id) {
                console.log("oi ", candidato.nome)
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
        $("#nome").val(candidato.nome);
        $("#cpf").val(candidato.cpf);
        $("#datanasc").val(candidato.datanasc);
        $("input[name='sexo']:checked").val('f'); //como preencher isso??
        // $("#estado").val(candidato.estado); //preencher com os estados e selecionar o do candidato
        // $("#cidade").val(candidato.cidade); //preencher com as cidades do estado selecionado e selecionar o do candidato
        $("#rua").val(candidato.rua);
        $("#numero").val(candidato.numero);
        $("#cadjus").val(candidato.cadjus);
        $("#email").val(candidato.email);
        $("#senha").val(candidato.senha);
    }
});