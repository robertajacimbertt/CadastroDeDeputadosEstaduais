var ListaDeCandidatos = [];

$(document).ready(function() {
    buscar();

    function buscar() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://andrebordignon.esy.es/php/consultacandidatos.php", true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                localStorage.setItem('ListaDeCandidatos', xhr.responseText);
                ListaDeCandidatos = JSON.parse(xhr.responseText);
                construirCards(ListaDeCandidatos);
            }
        }
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
            var email = candidato.email ? candidato.email : "indisponível";

            var card = $('<div>', { id: 'card_' + index, class: 'card' });
            var img = $('<img class="card-img-top">');
            img.attr('src', './imagens/employee.svg');
            var corpoDoCard = $('<div>', { class: 'card-body' });
            var titulo = $("<h5 class: 'card-title'>" + nome + "</h5>");
            var texto = $("<p class='card-text'>Cadjus: " + cadjus + "</p><p>Email: " + email + "</p><p>Estado: " + estado + "</p>");
            var footer = $('<div>', { class: 'card-footer' });
            var grupoBotao = $('<div>', { class: 'btn-group btn-group-toggle', "data-toggle": 'buttons' });
            var botaoRemover = $('<button>', { id: 'remover_' + index, class: 'btn btn-link', type: 'button' });
            var botaoEditar = $('<button>', { id: 'editar_' + index, class: 'btn btn-primary', type: 'button' });
            botaoRemover.text("Remover");
            botaoEditar.text("Editar");
            botaoRemover.on("click", remover);
            botaoEditar.on("click", editar);
            corpoDoCard.append(titulo);
            corpoDoCard.append(texto);
            grupoBotao.append(botaoEditar);
            grupoBotao.append(botaoRemover);
            footer.append(grupoBotao);
            card.append(img);
            card.append(corpoDoCard);
            card.append(footer);
            $('#app').append(card);
        });
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

});