
const nomes = ['fabiano', 'antonio', 'andre'];
function iniciarValidacao(){
    $('#form-cadastroPessoa').validate({
        rules:{
            nome:{
                required: true
            }
        },
        messages: {
              nome: {
                required:'Campo Obrigatório preencha seu nome'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form){
            var formData = $(form).serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});


            //recuperando valor digitado no formulario
            let nome = formData.nome;

            //inserindo valor no vetor
            nomes.push(nome);

            console.log('Valores dentro do vetor: ', nomes);
        }
    })
}
function pegar3ValorDoVetor(){
    let nome = nomes[2];
    console.log('O terceiro nome no vetor é: '+ nome);

    if(nome === undefined || nome === null || nome === ''){
        alert('nenhuma pessoa encontrada')
    } else {
        alert('A pessoa encontrada é '+ nome)
    }
}
function verificarFabiano(){
    let nome = nomes[2];

    if(nome === "fabiano"){
        alert("A terceira pessoa é o Fabiano")
    }else{
        alert("A terceira pessoa não é o Fabiano")
    }
}
function imprimirValores(){
    let html = "";

    for (let i = 0; i < nomes.length; i++) {
        html += '<p> Nome '+ (i + 1) + ': ' + nomes[i] +'</p>';
    }

    console.log(html)

    let divResultado = $('.resultado-impressao-valores');
    divResultado.html(html);
}
function buscarPessoa(){
    let html = "";
    let pesquisa = $('#pesquisa').val()
    console.log(pesquisa)
    for (let i = 0; i < nomes.length; i++) {
        var nome = nomes[i];
        if(nome === pesquisa){
            alert("O " + nome + " foi encontrado na posição " + i)
        }
    }

    console.log(html)

    let divResultado = $('.resultado-impressao-valores');
    divResultado.html(html);
}
let acesa = false;
function acenderApagarLampada(){
    if(acesa === true){
        $('.lampada').removeClass('acesa');
        acesa = false;
        $('.btn-lampada').addClass('btn-dark');
        $('.btn-lampada').removeClass('btn-success');
    }else {
        acesa = true;
        $('.lampada').addClass('acesa');
        $('.btn-lampada').addClass('btn-success');
        $('.btn-lampada').removeClass('btn-dark');
    }

}

const valores = [];

function iniciarVetores() {
    $('#form-Vetor').validate({
        rules: {
            textoVetor: {
                required: true
            }
        },
        messages: {
            textoVetor: {
                required: 'Campo Obrigatório preencha seu nome'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            var formData = $(form).serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            let textoVetor = formData.textoVetor;

            valores.push(textoVetor);
            console.log('Valores dentro do vetor: ', valores);
        }
    })
}
function texto(){
}
function exibirValoresVetor(){
    console.log(valores)
}
function deletarUltimoVetor(){

    valores.pop();

    console.log(valores);
}
function deletarPrimeiroVetor(){
    valores.shift();
    console.log(valores);
}
function listarValoresVetor(){
    for(let i = 0; i < valores.length; i++){
        let valor = valores[i];
        console.log(valor);
        if(valor === "andre"){
            console.log("andre foi encontrado na posiçao " + i);
            break;
        }
    }
}
function cadastroDePessoa(){
    $('#form-vetor-2').validate({
        rules: {
            nome: {
                required: true
            },
            idade: {
                required: true
            }
        },
        messages: {
            nome: {
                required: 'Campo Obrigatório Insira seu nome'
            },
            idade:{
                required: 'Campo Obrigatorio Insira sua idade'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            var formData = $(form).serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});


            let pessoa = {
                nome: formData.nome,
                idade: formData.idade
            }

            valores.push(pessoa);
            console.log('Nome: ', pessoa.nome + '. Idade: ' +  pessoa.idade);
        }
    })
}

function listarValoresVetorObjetos(){
    for(let i = 0; i < valores.length; i++){
        let valor = valores[i];
        console.log('Nome: ', valor.nome + '. Idade: ' +  valor.idade);
    }
}