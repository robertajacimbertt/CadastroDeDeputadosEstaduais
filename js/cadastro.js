var candidatosLista = '';
$(document).ready(function() {

     // desabilita o select cidades e estados enquanto não forem populados
    $("#cidades").attr("disabled", "disable");
    $("#estados").attr("disabled", "disable");
    
    // efetua a busca de estados da federação
    buscarEstados();

    // quando houver uma mudança no select de estados...
    $('#estados').change(function(event) {
        buscarCidades();
    });

    buscar();

    $('#btEnviar').click(function(event) {
        cadastrar();
    });

    function cadastrar() {
        
        console.log("chamou o cadastrar");
        var candidato = {
            nome: '',
            sexo: '',
            cpf: '',
            datanasc: '',
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
        candidato.sexo = $("input[name='sexo']:checked").val();
        candidato.email = $("#email").val();
        candidato.senha = $("#senha").val();
        candidato.datanasc = $("#datanasc").val();
        candidato.estado = $("#estado").val();
        candidato.cidade = $("#cidade").val();
        candidato.bairro = $("#bairro").val();
        candidato.rua = $("#rua").val();
        candidato.numero = $("#numero").val();
        candidato.cadjus = $("#cadjus").val();
        candidato.cpf = $("#cpf").val();

        console.log("teste candidato =", candidato);
        var string = "nome="+candidato.nome+", sexo="+candidato.sexo;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://andrebordignon.esy.es/php/incluicandidato.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(string);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
            }
        }
        buscar();


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


});

// Função para buscar os estados
function buscarEstados() {

   var requisicaoEstados = new XMLHttpRequest();
   var tipo = 'GET';
   var assincrona = true;
                                 // API do IBGE - retorna arquivo JSON com todos os estados da federação
   requisicaoEstados.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados', assincrona);
   requisicaoEstados.send()

    requisicaoEstados.onreadystatechange = function () {
            if(requisicaoEstados.readyState === XMLHttpRequest.DONE && requisicaoEstados.status === 200) {

                var obj = JSON.parse(requisicaoEstados.responseText);

                // função para ordenar os objetos por ordem alfabética
                obj.sort(function(a,b) {
                            if(a.nome < b.nome) return -1;
                            if(a.nome > b.nome) return 1;
                            return 0;
                        });

                // variável que será incremetada com <option>   
                var option = "";    

                // laço para incrementar
                for(var i=0; i < obj.length; i++){
                      option+= '<option value="' + obj[i].nome+ '" id="' + obj[i].id + '">' + obj[i].nome + '</option>';
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
function buscarCidades(){
    
    var requisicaoCidades = new XMLHttpRequest();
    var tipo = 'GET';
    var assincrona = true;
    var idEstado = $('#estados').find(':selected').attr('id');

                                 // API do IBGE que retorna todos os municipios relacionados com o id do estado
    requisicaoCidades.open(tipo, 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + idEstado + '/municipios' ,assincrona);
    requisicaoCidades.send();

    requisicaoCidades.onreadystatechange = function () {
        if(requisicaoCidades.readyState === XMLHttpRequest.DONE && requisicaoCidades.status === 200) {

            var obj = JSON.parse(requisicaoCidades.responseText);

            // função para ordenar os objetos por ordem alfabética
            obj.sort(function(a,b) {
                        if(a.nome < b.nome) return -1;
                        if(a.nome > b.nome) return 1;
                        return 0;
                    });

            var option = "";    

            for(var i=0; i < obj.length; i++){
                  option+= '<option value="' + obj[i].nome+ '" id="' + obj[i].nome + '">' + obj[i].nome + '</option>';
                }

            // acrescenta em html as tags <option>
            $("#cidades").html(option);
        } 
    }
}
