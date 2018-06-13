$(document).ready(function() {

    function cadastrar(candidato) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://andrebordignon.esy.es/php/incluicandidato.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(candidato);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
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
                return candidatos;
            }
        }
    }

    function remover(dados) {

    }
    var x = {
            nome: "Marieta",
            sexo: "F",
            datanasc: "1998-10-01",
            rua: "Anchieta",
            numero: 1111,
            cidade: "a",
            estado: "sp",
            cpf: "498498378",
            cadjus: "919231911",
            email: "mari@email.com.br",
            senha: "senha123"
        }
        // buscar();
    cadastrar(x);
    buscar();
});