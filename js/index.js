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
            var card = $('<div>', { id: 'card_' + index, class: 'card' });
            var img = $('<img class="card-img-top">');
            img.attr('src', './imagens/employee.svg');
            var cabecalho = $('<div>', { class: 'card-body' });
            var titulo = $('');



            card.append(img);
            $('#app').append(card);
        });
    }
});


{
    /*
    , { class: 'card-img-top', src: './imagens/employee.svg', alt: 'Foto do deputado ' + candidato.nome }
    
    <div class="card">
    <img class="card-img-top" src="./imagens/employee.svg" alt="Card image cap">
                <div class="card-body">

                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary active">
                          <input type="radio" name="options" id="option1" autocomplete="off" checked> Active
                        </label>
                        <label class="btn btn-secondary">
                          <input type="radio" name="options" id="option2" autocomplete="off"> Radio
                        </label>
                    </div>
                </div>
            </div> */
}