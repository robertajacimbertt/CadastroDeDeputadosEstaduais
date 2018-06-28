var candidatosLista = '';
$(document).ready(function() {



    // desabilita o select cidades e estados enquanto não forem populados
    $("#cidades").attr("disabled", "disable");
    $("#estados").attr("disabled", "disable");
    $('#validaNome').hide();
    $('#validaIdade').hide();
    $('#validaCpf').hide();
    $('#validaCadjus').hide();
    $('#validaSenha').hide();
    $('#validaEmail').hide();

    $('#nome').focusout(function() {
        validaNome();
    });

    $('#datanasc').focusout(function() {
        validaIdade();
    });

    $('#cpf').focusout(function() {
        validaCpf();
    });

    $('#cadjus').focusout(function() {
        validarCadjus();
    });

    $('#email').focusout(function() {
        if (!validaEmail()) {
            $('#validaEmail').show();
        }
    });


    var temSenha1 = false,
        temSenha2 = false;

    $('#senha').focusout(function() {
        temSenha1 = true;
        validaSenha(temSenha1, temSenha2);
    });

    $('#senha2').focusout(function() {
        temSenha2 = true;
        validaSenha(temSenha1, temSenha2);
    });

    // efetua a busca de estados da federação
    buscarEstados();


    // quando houver uma mudança no select de estados...
    $('#estados').change(function(event) {
        buscarCidades();
    });

    buscar();

    $('#enviar').click(function(event) {

        cadastrar();

    });

    function cadastrar() {
        var candidato = {
            nome: '',
            sexo: '',
            cpf: '',
            datanasc: '',
            estado: '',
            cidade: '',
            rua: '',
            numero: '',
            cadjus: '',
            email: '',
            senha: ''
        };
        candidato.nome = $("#nome").val();
        candidato.sexo = $("input[name='sexo']:checked").val();
        candidato.email = $("#email").val();
        candidato.senha = $("#senha").val();
        candidato.datanasc = $("#datanasc").val();
        candidato.estado = $("#estados").val();
        candidato.cidade = $("#cidades").val();
        candidato.rua = $("#rua").val();
        candidato.numero = $("#numero").val();
        candidato.cadjus = $("#cadjus").val();
        candidato.cpf = $("#cpf").val();

        console.log("teste candidato =", candidato);

        var string = { "nome": "asddsa", "sexo": "m", "datanasc": "1998-07-25", "rua": "asd", "numero": "123", "cidade": "Acrelndia", "estado": "AC", "cpf": "90932061095", "cadjus": "2443", "email": "asd", "senha": "asd" };

        var string2 = candidato;

        $.ajax({
                url: "http://andrebordignon.esy.es/php/incluicandidato.php",
                type: 'post',
                data: {
                    nome: candidato.nome,
                    email: candidato.email,
                    senha: candidato.senha,
                    cadjus: candidato.cadjus,
                    cidade: candidato.cidade,
                    estado: candidato.estado,
                    cpf: candidato.cpf,
                    numero: candidato.numero,
                    rua: candidato.rua,
                    sexo: candidato.sexo,
                    dataNasc: candidato.datanasc
                },
                beforeSend: function() {
                    console.log("Enviando dados...");
                }
            })
            .done(function() {
                console.log("Dados enviados com sucesso!");
            })
            .fail(function(jqXHR) {
                console.log("Os dados não foram enviados!");
            });


        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", "http://andrebordignon.esy.es/php/incluicandidato.php", true);
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhr.send(string2);
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         console.log(xhr.responseText);
        //     }
        // }
        buscar();

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

    function construirCards(candidatosLista) {
        console.log(candidatosLista);
        candidatosLista.forEach((candidato, index) => {
            $("#conteudo").append("<div class='w3-card-4' style='width:30%'><header class='w3-container w3-light-grey'><h3>" + candidato.nome + "</h3></header><div class='w3-container'><p>Cadjus: " + candidato.cadjus + "</p><hr><img src='./imagens/employee.svg' alt='Avatar' class='w3-left w3-circle w3-margin-right' style='width:60px'><p>Deputado(a) do estado de " + candidato.estado + ".</p><p> Email de contato: </p><p>" + candidato.email + "</p><br></div><span class='input-group-addon'><i class='glyphicon glyphicon-pencil'></i></span><span class='input-group-addon'><i class='glyphicon glyphicon-trash'></i></span></div>");
        });
    }


});

// Função para buscar os estados
function buscarEstados() {

    var requisicaoEstados = new XMLHttpRequest();
    var tipo = 'GET';
    var assincrona = true;
    // API do IBGE - retorna arquivo JSON com todos os estados da federação
    requisicaoEstados.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados', assincrona);
    requisicaoEstados.send()

    requisicaoEstados.onreadystatechange = function() {
        if (requisicaoEstados.readyState === XMLHttpRequest.DONE && requisicaoEstados.status === 200) {

            var obj = JSON.parse(requisicaoEstados.responseText);

            // função para ordenar os objetos por ordem alfabética
            obj.sort(function(a, b) {
                if (a.nome < b.nome) return -1;
                if (a.nome > b.nome) return 1;
                return 0;
            });

            // variável que será incremetada com <option>   
            var option = "";

            // laço para incrementar
            for (var i = 0; i < obj.length; i++) {
                option += '<option value="' + obj[i].nome + '" id="' + obj[i].id + '">' + obj[i].nome + '</option>';
            }

            // acrescenta em html as tags <option>
            $("#estados").html(option);

            // habilita o select cidades
            $("#estados").removeAttr('disabled');
            $("#cidades").removeAttr('disabled');
        }
    }
}

// Função para buscar as cidades dependendo do estado escolhido
function buscarCidades() {

    var requisicaoCidades = new XMLHttpRequest();
    var tipo = 'GET';
    var assincrona = true;
    var idEstado = $('#estados').find(':selected').attr('id');

    // API do IBGE que retorna todos os municipios relacionados com o id do estado
    requisicaoCidades.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + idEstado + '/municipios', assincrona);
    requisicaoCidades.send();

    requisicaoCidades.onreadystatechange = function() {
        if (requisicaoCidades.readyState === XMLHttpRequest.DONE && requisicaoCidades.status === 200) {

            var obj = JSON.parse(requisicaoCidades.responseText);

            // função para ordenar os objetos por ordem alfabética
            obj.sort(function(a, b) {
                if (a.nome < b.nome) return -1;
                if (a.nome > b.nome) return 1;
                return 0;
            });

            var option = "";

            for (var i = 0; i < obj.length; i++) {
                option += '<option value="' + obj[i].nome + '" id="' + obj[i].nome + '">' + obj[i].nome + '</option>';
            }

            // acrescenta em html as tags <option>
            $("#cidades").html(option);
        }
    }
}

function validaCpf() {

    var cpf = $('#cpf').val();
    if (!validar(cpf)) {
        $('#validaCpf').show();
        return false;
    } else {
        $('#validaCpf').hide();
        return true;
    }

    function validar(strCPF) {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

}

function validaNome() {
    var varNome = $('#nome').val();
    if (varNome.length > 255 || varNome.length <= 0) {
        $('#validaNome').show();
        return false;
    } else {
        $('#validaNome').hide();
        return true;
    }
}

function validaSenha(temSenha1, temSenha2) {
    if ((temSenha1) && (temSenha2)) {
        var senha1 = $('#senha').val();
        var senha2 = $('#senha2').val();

        if (senha1 == senha2) {
            $('#validaSenha').hide();
            return true;
        } else {
            $('#validaSenha').show();
            return false;
        }
    }
}

function validaIdade() {
    var valorData = $('#datanasc').val();
    if (valorData == '') {
        $('#validaIdade').text("Data de Nascimento é obrigatório!");
        $('#validaIdade').show();
        return false;
    } else {
        var dataNasc = new Date(valorData);
        var hoje = new Date();
        var anoNasc = new Date(hoje - dataNasc);
        var idade = anoNasc.getUTCFullYear() - 1970;

        if (idade < 18) {
            $('#validaIdade').text("O Candidato deve ter no mínimo 18 anos!");
            $('#validaIdade').show();
            return false;
        } else if (idade > 125) {
            $('#validaIdade').text("Digite uma data válida!");
            $('#validaIdade').show();
            return false;
        } else {
            $('#validaIdade').hide();
            return true;
        }
    }
}

function validarCadjus() {
    var valorCadjus = $('#cadjus').val();
    if (valorCadjus < 1 || valorCadjus > 5000) {
        $('#validaCadjus').text('CadJus deve ser um número entre 1 e 5000!');
        $('#validaCadjus').show();
        return false;
    } else {
        $('#validaCadjus').hide();
        return true;
    }
}

function validaEmail() {
    console.log("champu")
    var mail = $('#email').val();
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if (typeof(mail) == "string") {
        if (er.test(mail)) {
            console.log("true")
            $('#validaEmail').hide();
            return true;
        }
    } else if (typeof(mail) == "object") {
        if (er.test(mail.value)) {
            console.log("true")
            $('#validaEmail').hide();
            return true;
        }
    } else {
        // $('#validaEmail').text('Insira um email valido! Ex: exemplo@mail.com');
        console.log("false")
        $('#validaEmail').show();
        return false;

    }
}

// var email = $('#email').val();
// var exclude = /[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
// var check = /@[w-]+./;
// var checkend = /.[a-zA-Z]{2,3}$/;
// if (((email.search(exclude) != -1) || (email.search(check)) == -1) || (email.search(checkend) == -1)) {
//     $('#validaEmail').text('Insira um email valido! Ex: exemplo@mail.com');
//        $('#validaEmail').show();
//  return false; } 
// else { 
//     $('#validaEmail').hide();
//     return true; 
// }
// }