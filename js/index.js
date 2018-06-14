var candidatosLista = '';
$(document).ready(function() {

    buscar();

    function cadastrar() {
        var candidato = {
            nome: '',
            sexo: '',
            cpf: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
            numero: '',
            cadjus: '',
            email: '',
            senha: ''
        };
        candidato.nome = $("#nome").val();
        candidato.sexo = $("#sexo").val();
        candidato.email = $("#email").val();
        candidato.senha = $("#senha").val();
        candidato.estado = $("#estado").val();
        candidato.cidade = $("#cidade").val();
        candidato.bairro = $("#bairro").val();
        candidato.rua = $("#rua").val();
        candidato.numero = $("#numero").val();
        candidato.cadjus = $("#cadjus").val();
        candidato.cpf = $("#cpf").val();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://andrebordignon.esy.es/php/incluicandidato.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(candidato);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }

        // $.ajax({
        //         method: "POST",
        //         url: "http://andrebordignon.esy.es/php/incluicandidato.php",
        //         data: { nome: "John", cpf: "12785764", datanasc: "1999-09-12", sexo: "f", email: "ro@gmail.com", senha: "senha123", cadjus: "322343", estado: "sp", cidade: "campinas", bairro: "jnlj", rua: "do nada", numero: "10" }
        //     })
        //     .done(function(msg) {
        //         alert("Data Saved: " + msg);
        //     });
    }

    function atualizar(id) {

    }

    function buscar() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://andrebordignon.esy.es/php/consultacandidatos.php", true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var candidatos = JSON.parse(xhr.responseText);
                console.log(JSON.parse(xhr.responseText));
                construirCards(candidatos);
                //return candidatos;
            }
        }
    }

    function remover(id) {

    }

    function construirCards(candidatosLista) {
        console.log(candidatosLista);
        candidatosLista.forEach((candidato, index) => {
            $("#conteudo").append("<div class='w3-card-4' style='width:30%'><header class='w3-container w3-light-grey'><h3>" + candidato.nome + "</h3></header><div class='w3-container'><p>Cadjus: " + candidato.cadjus + "</p><hr><img src='./imagens/employee.svg' alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'><p>Deputado(a) do estado de " + candidato.estado + ".</p><p> Email de contato: </p><p>" + candidato.email + "</p><br></div><span class='input-group-addon'><i class='glyphicon glyphicon-pencil'></i></span><span class='input-group-addon'><i class='glyphicon glyphicon-trash'></i></span></div>");
        });
    }


}); // var x = {
//         nome: "Marieta",
//         sexo: "F",
//         datanasc: "1998-10-01",
//         rua: "Anchieta",
//         numero: 1111,
//         cidade: "a",
//         estado: "sp",
//         cpf: "498498378",
//         cadjus: "919231911",
//         email: "mari@email.com.br",
//         senha: "senha123"
//     }