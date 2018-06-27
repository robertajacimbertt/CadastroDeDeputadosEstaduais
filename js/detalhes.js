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
        //constroi aside
        document.getElementById("nome").textContent = candidato.idcandidato;
        var idade = getIdade(candidato.datanasc);
        if (idade === 'indisponível') {
            $('#idade').text('Idade ' + idade);
        } else {
            $('#idade').text(idade + ' anos de idade');
        }
        $('#contato').text('Contato pelo email: ' + candidato.email);
        $('#cadjus').text('CADJUS: ' + candidato.cadjus);
        $('#cpf').text(candidato.cpf || 'Indisponível');
        $('#dataNascimento').text(candidato.datanasc);
        $('#sexo').text(candidato.sexo || 'Indisponível');
        $('#estado').text(candidato.estado || 'Indisponível');
        $('#cidade').text(candidato.cidade || 'Indisponível');
        $('#rua').text(candidato.rua || 'Indisponível');
        $('#numero').text(candidato.numero || 'Indisponível');

        $('#historico').text("Não cadastrado");
        $('#projetos').text("Não cadastrado");
        $('#propostas').text("Não cadastrado");
    }

    function getIdade(nasc) {
        var dataNasc = nasc.toString();
        var anoNasc = dataNasc.slice(0, 4);
        var data = new Date();
        var anoAtual = data.getFullYear();
        var idade = anoAtual - anoNasc
        if (idade <= 0 || idade >= 150) {
            return "indisponível";
        } else { return idade; }
    }
});