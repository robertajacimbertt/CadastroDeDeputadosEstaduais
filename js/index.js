$(document).ready(function() {
    var ListaDeCandidatos = [];

    buscar();

    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })

    function buscar() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://andrebordignon.esy.es/php/consultacandidatos.php", true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                ListaDeCandidatos = JSON.parse(xhr.responseText);
                if (ListaDeCandidatos.length > 0) {
                    localStorage.setItem('ListaDeCandidatos', xhr.responseText);
                    // console.log(xhr.responseText)
                    construirCards(ListaDeCandidatos);
                } else {
                    errorLog();
                }
            } else {
                errorLog();
            }
        }
    }

    function errorLog() {
        $("#app").empty();
        var mensagem = $('<div>', { id: 'erroCandidato', class: 'erroListagem' });
        var titulo = $("<h3 class: 'card-title'>Nenhum candidato foi encontrado</h3>");
        mensagem.append(titulo);
        $('#app').append(mensagem);
    }

    function abrirModal() {
        $("#popup").trigger('click');
    }

    function construirCards(candidatos) {
        $("#app").empty();
        candidatos.forEach((candidato, index) => {
            var nome = candidato.nome ? candidato.nome : "Candidato inválido";
            var cadjus = candidato.cadjus ? candidato.cadjus : "indisponível";
            var estado = candidato.estado ? candidato.estado : "indisponível";
            var idade = getIdade(candidato.datanasc);

            var card = $('<div>', { id: 'card_' + index, class: 'card' });
            var img = $('<img class="card-img-top">');
            img.attr('src', './imagens/employee.svg');
            var corpoDoCard = $('<div>', { class: 'card-body', id: 'cardbody_' + index });
            var titulo = $("<h5 class: 'card-title'>" + nome + "</h5>");
            var texto = $("<p class='card-text'>Cadjus: " + cadjus + "</p><p>Idade: " + idade + "</p><p>Estado: " + estado + "</p>");
            var footer = $('<div>', { class: 'card-footer' });
            var grupoBotao = $('<div>', { class: 'btn-group btn-group-toggle', "data-toggle": 'buttons' });
            var botaoRemover = $('<button>', { id: 'remover_' + index, class: 'btn btn-link', type: 'button' });
            var botaoEditar = $('<button>', { id: 'editar_' + index, class: 'btn btn-primary', type: 'button' });
            botaoRemover.text("Remover");
            botaoEditar.text("Editar");
            botaoRemover.on("click", remover);
            botaoEditar.on("click", editar);
            corpoDoCard.on("click", detalhar);
            corpoDoCard.append(titulo);
            corpoDoCard.append(texto);
            grupoBotao.append(botaoEditar);
            grupoBotao.append(botaoRemover);
            footer.append(grupoBotao);
            card.append(img);
            var a = $('<a>', { id: 'linkCard' });
            a.append(corpoDoCard);
            card.append(a);
            card.append(footer);

            $('#app').append(card);
        });
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

    function remover(evento) {
        var numero = evento.target.id.slice(8);
        var idCandidato = ListaDeCandidatos[numero].idcandidato;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://andrebordignon.esy.es/php/deletacandidato.php?idcandidato=" + idCandidato, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                abrirModal();
                buscar();
            }
        }
    }

    function editar(evento) {
        var numero = evento.target.id.slice(7);
        var id = ListaDeCandidatos[numero].idcandidato;
        var novaURL = "editar.html";
        $(window.document.location).attr('href', novaURL + "?id=" + id);
    }

    function detalhar(evento) {
        var numero = evento.currentTarget.id.slice(9);
        console.log(evento.currentTarget.id, numero);
        var id = ListaDeCandidatos[numero].idcandidato;
        var novaURL = "detalhes.html";
        $(window.document.location).attr('href', novaURL + "?id=" + id);
    }

});