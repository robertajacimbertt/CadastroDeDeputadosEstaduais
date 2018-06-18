$(document).ready(function() {
    buscar();

    function buscar() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://andrebordignon.esy.es/php/consultacandidatos.php", true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var candidatos = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                construirCards(candidatos);
            }
        }
    }

    function construirCards(candidatos) {
        console.log(candidatos);
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
            var labelEditar = $('<label>', { class: 'btn btn-secondary active' });
            var labelDeletar = $('<label>', { class: 'btn btn-secondary' });
            var botaoEditar = $("<input type='radio', name='options', id='deletar_" + index + "', autocomplete='off', checked>Editar</input>");
            var botaoDeletar = $("<input type='radio', name='options', id='editar_" + index + "', autocomplete='off', checked>Deletar</input>");
            corpoDoCard.append(titulo);
            corpoDoCard.append(texto);
            labelEditar.append(botaoEditar);
            labelDeletar.append(botaoDeletar);
            grupoBotao.append(labelEditar);
            grupoBotao.append(labelDeletar);
            footer.append(grupoBotao);
            card.append(img);
            card.append(corpoDoCard);
            card.append(footer);
            $('#app').append(card);
        });
    }
});