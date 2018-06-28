$(document).ready(function() {
    var ListaDeCandidatos = localStorage.getItem('ListaDeCandidatos');
    ListaDeCandidatos = JSON.parse(ListaDeCandidatos);
    var id = location.search.split("=");
    id = id[1];

    $("#cidades").attr("disabled", "disable");
    $("#estados").attr("disabled", "disable");
    $('#validaNome').hide();
    $('#validaIdade').hide();
    $('#validaCpf').hide();
    $('#validaCadjus').hide();
    $('#validaSenha').hide();
    $('#validaEmail').hide();

    buscaCandidato();

    $('#enviar').click(function() {
        editar(id);
    });

    $('#redirecionar').click(function() {
        var novaURL = "index.html";
        $(window.document.location).attr('href', novaURL);
    });

    function abrirModal(msg) {
        $("#popup").trigger('click');
        console.log(msg)
        $('#msg').text(msg + ". Você será redirecionado para a página de listagem")
    }

    function buscaCandidato() {
        var achou = false;
        ListaDeCandidatos.forEach(candidato => {
            if (candidato.idcandidato === id) {
                preencher(candidato);
                achou = true;
            }
        });
        if (achou) {

        } else {
            alert("O candidato não foi encontrado. Tente novamente mais tarde");
            var novaURL = "index.html";
            $(window.document.location).attr('href', novaURL);
        }
    }

    function preencher(candidato) {
        buscarEstados();
        $('#estados').change(function(event) {
            buscarCidades();
        });
        console.log(candidato);
        $("#nome").val(candidato.nome);
        $("#cpf").val(candidato.cpf);
        $("#datanasc").val(candidato.datanasc);
        $(function() {
            var $radios = $('input:radio[name=sexo]');
            var sexo = candidato.sexo;
            if (sexo === 'f') {
                $radios.filter('[value=f]').prop('checked', true);
            } else {
                $radios.filter('[value=m]').prop('checked', true);
            }
        });
        $("#estados").val(candidato.estado);
        $("#cidades").val(candidato.cidade);
        $("#rua").val(candidato.rua);
        $("#numero").val(candidato.numero);
        $("#cadjus").val(candidato.cadjus);
        $("#email").val(candidato.email);
        $("#senha").val(candidato.senha);
        $("#senha2").val(candidato.senha);
    }


    function buscarEstados() {
        var requisicaoEstados = new XMLHttpRequest();
        var tipo = 'GET';
        var assincrona = true;
        requisicaoEstados.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados', assincrona);
        requisicaoEstados.send()

        requisicaoEstados.onreadystatechange = function() {
            if (requisicaoEstados.readyState === XMLHttpRequest.DONE && requisicaoEstados.status === 200) {

                var obj = JSON.parse(requisicaoEstados.responseText);
                obj.sort(function(a, b) {
                    if (a.nome < b.nome) return -1;
                    if (a.nome > b.nome) return 1;
                    return 0;
                });

                var option = "";

                for (var i = 0; i < obj.length; i++) {
                    option += '<option value="' + obj[i].nome + '" id="' + obj[i].id + '">' + obj[i].nome + '</option>';
                }

                $("#estados").html(option);

                $("#estados").removeAttr('disabled');
                $("#cidades").removeAttr('disabled');
            }
        }
    }

    function buscarCidades() {

        var requisicaoCidades = new XMLHttpRequest();
        var tipo = 'GET';
        var assincrona = true;
        var idEstado = $('#estados').find(':selected').attr('id');

        requisicaoCidades.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + idEstado + '/municipios', assincrona);
        requisicaoCidades.send();

        requisicaoCidades.onreadystatechange = function() {
            if (requisicaoCidades.readyState === XMLHttpRequest.DONE && requisicaoCidades.status === 200) {

                var obj = JSON.parse(requisicaoCidades.responseText);

                obj.sort(function(a, b) {
                    if (a.nome < b.nome) return -1;
                    if (a.nome > b.nome) return 1;
                    return 0;
                });

                var option = "";

                for (var i = 0; i < obj.length; i++) {
                    option += '<option value="' + obj[i].nome + '" id="' + obj[i].nome + '">' + obj[i].nome + '</option>';
                }

                $("#cidades").html(option);
            }
        }
    }

    function editar(id) {
        var candidato = {
            idcandidato: id,
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

        $.ajax({
                url: " http://andrebordignon.esy.es/php/atualizacandidato.php",
                type: 'post',
                data: {
                    idcandidato: candidato.idcandidato,
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

    }
});

// Importar em outro arquivo JS para nao ter que copiar e colar as mesmas funcoes

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
        $('#validaEmail').show();
        return false;
    }
}