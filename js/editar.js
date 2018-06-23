$(document).ready(function() {
    var ListaDeCandidatos = localStorage.getItem('ListaDeCandidatos');
    ListaDeCandidatos = JSON.parse(ListaDeCandidatos);
    var id = location.search.split("=");
    id = id[1];

    $("#cidades").attr("disabled", "disable");
    $("#estados").attr("disabled", "disable");

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
        if (achou) { //mensagem de erro e redireciona para a pagina principal
            // console.log("achou o cara");
        } else {
            // console.log("nao achou o cara");
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
        $("input[name='sexo']:checked").val('f'); //como preencher isso??
        // $("#estados option[value='São Paulo']").attr('selected', 'selected'); //na hora de salvar, salva com o id ou nome do estado?
        // $("#cidades").val("Campinas"); //preencher com as cidades do estado selecionado e selecionar o do candidato
        $("#rua").val(candidato.rua);
        $("#numero").val(candidato.numero);
        $("#cadjus").val(candidato.cadjus);
        $("#email").val(candidato.email);
        $("#senha").val(candidato.senha);
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
            nome: '',
            cpf: '',
            datanasc: '',
            sexo: '',
            estado: '',
            cidade: '',
            rua: '',
            numero: '',
            cadjus: '',
            email: '',
            senha: ''
        };
        candidato.nome = $("#nome").val();
        candidato.cpf = $("#cpf").val();
        candidato.datanasc = $("#datanasc").val();
        candidato.sexo = $("input[name='sexo']:checked").val();
        candidato.estado = $("#estado").val();
        candidato.cidade = $("#cidade").val();
        candidato.rua = $("#rua").val();
        candidato.numero = $("#numero").val();
        candidato.cadjus = $("#cadjus").val();
        candidato.email = $("#email").val();
        candidato.senha = $("#senha").val();

        var string = "nome=" + candidato.nome + ", cpf=" + candidato.cpf + ", datanasc=" + candidato.datanasc + ", sexo=" + candidato.sexo + ", estado=" + candidato.estado + ", cidade=" + candidato.cidade + ", rua=" + candidato.rua + ", numero=" + candidato.numero + ", cadjus=" + candidato.cadjus + ", email=" + candidato.email + ", senha=" + candidato.senha;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://andrebordignon.esy.es/php/atualizacandidato.php=" + id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(string);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                abrirModal("O candidato foi alterado com sucesso");
            } else {
                console.log(xhr.responseText);
                abrirModal("A atualização não pôde ser completada, tente novamente mais tarde");
            }
        }
    }
});