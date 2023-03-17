function exercicio1() {
    $('#form-exercicio-1').validate({
        rules: {
            numero1: {
                required: true
            },
            numero2: {
                required: true
            }
        },
        messages: {
            numero1: {
                required: 'Informe o primeiro numero'
            },
            numero2: {
                required: 'Informe o segundo número'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {

            var formData = $(form).serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            var n1 = formData.numero1;
            var n2 = formData.numero2;


            n1 = n1.replaceAll('.','');
            n1 = n1.replaceAll(',','.');

            n2 = n2.replaceAll('.','');
            n2 = n2.replaceAll(',','.');


            let soma = parseInt(n1) + parseInt(n2);

            let textoResultadoHtml = '<p class="my-4">O resultado da soma é ' + soma + '</p>';

            let divResultado = $('#form-exercicio-1 .resultado');
            divResultado.html(textoResultadoHtml)
        }
    });
}

function exercicio2() {
    $('#form-exercicio-2').validate({
        rules: {
            numero1: {
                required: true
            },
            numero2: {
                required: true
            }
        },
        messages: {
            numero1: {
                required: 'Informe o primeiro numero'
            },
            numero2: {
                required: 'Informe o segundo número'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {

            // obtendo valores do formulario
            var formData = $('#form-exercicio-2').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            var n1 = formData.numero1;
            var n2 = formData.numero2;

            n1 = n1.replaceAll('.','');
            n1 = n1.replaceAll(',','.');

            n2 = n2.replaceAll('.','');
            n2 = n2.replaceAll(',','.');


            var soma = parseInt(n1) + parseInt(n2);
            var subtracao = parseInt(n1) - parseInt(n2);
            var divisao = parseInt(n1) / parseInt(n2);
            var multiplicacao = parseInt(n1) * parseInt(n2);

            let textoResultadoHtml = '<p>O resultado da soma é ' + soma + '</p>';
            textoResultadoHtml += '<p>O resultado da subtração é ' + subtracao + '</p>';
            textoResultadoHtml += '<p>O resultado da divisão é ' + divisao + '</p>';
            textoResultadoHtml += '<p>O resultado da multiplicação é ' + multiplicacao + '</p>';

            let divResultado = $('#form-exercicio-2 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio3() {
    $('#form-exercicio-3').validate({
        rules: {
            distancia: {
                required: true
            },
            combustivel: {
                required: true
            }
        },
        messages: {
            distancia: {
                required: 'Informe a distáncia percorrida'
            },
            combustivel: {
                required: 'Informe o combustível gasto'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-3').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let distancia = formData.distancia;
            let combustivel = formData.combustivel;

            distancia = distancia.replaceAll('.','');
            distancia = distancia.replaceAll(',','.');

            combustivel = combustivel.replaceAll('.','');
            combustivel = combustivel.replaceAll(',','.');

            let resultado = parseFloat(distancia) / parseFloat(combustivel);

            let textoResultadoHtml = '<p>O consumo médio de combustível do seu veículo é ' + resultado + 'km por litro</p>';

            let divResultado = $('#form-exercicio-3 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio4() {
    $('#form-exercicio-4').validate({
        rules: {
            nome: {
                required: true
            },
            salario: {
                required: true
            },
            vendas: {
                required: true
            }
        },
        messages: {
            nome: {
                required: 'Informe o seu nome'
            },
            salario: {
                required: 'Informe o seu salario'
            },
            vendas: {
                required: 'Informe o valor das vendas'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-4').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let nome = formData.nome;
            let salario = formData.salario;
            let vendas = formData.vendas;

            //removendo pontos
            salario = salario.replaceAll('.','');
            //substituindo ponto por virgula nas casas decimais
            salario = salario.replaceAll(',','.');


            //removendo pontos
            vendas = vendas.replaceAll('.','');
            //substituindo ponto por virgula nas casas decimais
            vendas = vendas.replaceAll(',','.');

            let comissao = 0.15 * vendas
            let salarioFinal = parseFloat(salario) + parseFloat(comissao)

            let textoResultadoHtml = '<p>O salario du '+ nome + ' é ' + salarioFinal.toFixed(2) + ' no mês</p>';

            let divResultado = $('#form-exercicio-4 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio5() {
    $('#form-exercicio-5').validate({
        rules: {
            nome: {
                required: true
            },
            nota1: {
                required: true
            },
            nota2: {
                required: true
            },
            nota3: {
                required: true
            }
        },
        messages: {
            nome: {
                required: 'Informe seu nome'
            },
            nota1: {
                required: 'Informe a primeira nota'
            },
            nota2: {
                required: 'Informe a segunda nota'
            },
            nota3: {
                required: 'Informe terceira nota'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-5').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            var nome = formData.nome;
            var nota1 = formData.nota1;
            var nota2 = formData.nota2;
            var nota3 = formData.nota3;


            nota1 = nota1.replaceAll('.','');
            nota1 = nota1.replaceAll(',','.');

            nota2 = nota2.replaceAll('.','');
            nota2 = nota2.replaceAll(',','.');

            nota3 = nota3.replaceAll('.','');
            nota3 = nota3.replaceAll(',','.');


            var media = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3);

            media = media /3;

            let textoResultadoHtml = '<p class="text-success"> ';
            textoResultadoHtml += ' Caro aluno Sr(a) ' + nome + ', o resultado de sua média é ' + media.toFixed(2);
            textoResultadoHtml += '</p>';

            let divResultado = $('#form-exercicio-5 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio6() {
    $('#form-exercicio-6').validate({
        rules: {
            a: {
                required: true
            },
            b: {
                required: true
            }
        },
        messages: {
            a: {
                required: 'Informe o valor de a'
            },
            b: {
                required: 'Informe o valor de b'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-6').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let a = formData.a;
            let b = formData.b;

            a = a.replaceAll('.','');
            a = a.replaceAll(',','.');

            b = b.replaceAll('.','');
            b = b.replaceAll(',','.');

            let troca = a
            a = b
            b = troca

            let textoResultadoHtml = '<p class="text-success">O valor de A é ' + a +'</p>';
            textoResultadoHtml += '<p class="text-success">O valor de B é ' + b + '</p>';

            let divResultado = $('#form-exercicio-6 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio7() {
    $('#form-exercicio-7').validate({
        rules: {
            celsius: {
                required: true
            },
        },
        messages: {
            celsius: {
                required: 'Informe a distáncia percorrida'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-7').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let celsius = formData.celsius;

            celsius = celsius.replaceAll('.','');
            celsius = celsius.replaceAll(',','.');


            let fahrenheit = (9 * celsius + 160) /5

            let textoResultadoHtml = '<p class="text-success">A nova temperatura é: ' + fahrenheit.toFixed(2)  + 'Fº</p>';

            let divResultado = $('#form-exercicio-7 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio8() {
    $('#form-exercicio-8').validate({
        rules: {
            cotacao: {
                required: true
            },
            dolar: {
                required: true
            },
        },
        messages: {
            cotacao: {
                required: 'Informe cotação do dolar'
            },
            dolar: {
                required: 'Informe o valor do dolar'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-8').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let cotacao = formData.cotacao;
            let dolar = formData.dolar;

            cotacao = cotacao.replaceAll('.','');
            cotacao = cotacao.replaceAll(',','.');

            dolar = dolar.replaceAll(',','.');
            dolar = dolar.replaceAll('.','');

            let rs = parseFloat(dolar) / parseFloat(cotacao)

            let textoResultadoHtml = '<p class="text-success"> ' + dolar + ' Dólares equivalem á: ' + rs.toFixed(2) + ' R$</p>';

            let divResultado = $('#form-exercicio-8 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio9() {
    $('#form-exercicio-9').validate({
        rules: {
            deposito: {
                required: true
            },
        },
        messages: {
            deposito: {
                required: 'Informe cotação do dolar'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-9').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let deposito = formData.deposito;
            let corecao = parseFloat(deposito) * 0.7

            deposito = deposito.replaceAll('.','');
            deposito = deposito.replaceAll(',','.');

            var soma = parseFloat(deposito) + parseFloat(corecao);

            let textoResultadoHtml = '<p class="text-success">O rendimento do depósito após um mês é de: ' + soma + '  </p>';

            let divResultado = $('#form-exercicio-9 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio10() {
    $('#form-exercicio-10').validate({
        rules: {
            compra: {
                required: true
            },
        },
        messages: {
            compra: {
                required: 'Informe o valor da sua compra'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-10').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let compra = formData.compra;
            let prestacao = parseFloat(compra) / 5

            compra = compra.replaceAll('.','');
            compra = compra.replaceAll(',','.');

            let textoResultadoHtml = '<p class="text-success">O cliente deverá pagar 5 prestações de R$: ' + prestacao + '  </p>';

            let divResultado = $('#form-exercicio-10 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio11() {
    $('#form-exercicio-11').validate({
        rules: {
            custo: {
                required: true
            },
            percent: {
                required: true
            }
        },
        messages: {
            custo: {
                required: 'Informe o custo '
            },
            percent: {
                required: 'Informe percentual'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-11').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let percent = formData.percent;
            let custo = formData.custo;

            percent = percent.replaceAll('.','');
            percent = percent.replaceAll(',','.');

            custo = custo.replaceAll('.','');
            custo = custo.replaceAll(',','.');

            percent = parseFloat(percent);
            custo = parseFloat(custo);

            percent = percent / 100 * custo
            let venda = custo + percent

            let textoResultadoHtml = '<p class="text-success">O valor de venda é: ' + venda.toFixed(2) + ' </p>';

            let divResultado = $('#form-exercicio-11 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio12() {
    $('#form-exercicio-12').validate({
        rules: {
            custoFabrica: {
                required: true
            },
        },
        messages: {
            custoFabrica: {
                required: 'Informe o custo de Fabrica'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-12').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let custoFabrica = formData.custoFabrica;


            custoFabrica = custoFabrica.replaceAll('.','');
            custoFabrica = custoFabrica.replaceAll(',','.');

            custoFabrica = parseFloat(custoFabrica);

            let custoFinal = custoFabrica + (0.28 * custoFabrica) + (0.45 * custoFabrica);
            custoFinal = custoFinal + (0.45 * custoFinal);


            let textoResultadoHtml = '<p class="text-success">O custo para o consumidor final é de: ' + custoFinal.toFixed(2) + ' </p>';

            let divResultado = $('#form-exercicio-12 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio13() {
    $('#form-exercicio-13').validate({
        rules: {
            numero: {
                required: true
            },
        },
        messages: {
            numero: {
                required: 'Informe o numero'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-13').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let numero = formData.numero;


            numero = numero.replaceAll('.', '');
            numero = numero.replaceAll(',', '.');

            numero = parseInt(numero);

            var texto;

            if (numero > 10){
                texto = "O número é maior que 10";
            } else {
                texto = "O número é menor que 10";
            }

            let textoResultadoHtml = '<p class="text-success"> '+texto+' </p>';

            let divResultado = $('#form-exercicio-13 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio14() {
    $('#form-exercicio-14').validate({
        rules: {
            numero1: {
                required: true
            },
            numero2: {
                required: true
            }
        },
        messages: {
            numero1: {
                required: 'Informe o custo de Fabrica'
            },
            numero2: {
                required: 'Informe o custo de Fabrica'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-14').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let numero1 = formData.numero1;
            let numero2 = formData.numero2;


            numero1 = numero1.replaceAll('.','');
            numero1 = numero1.replaceAll(',','.');

            numero2 = numero2.replaceAll('.','');
            numero2 = numero2.replaceAll(',','.');

            numero1 = parseFloat(numero1);
            numero2 = parseFloat(numero2)

            var resultado;

            if (numero1 > numero2){
                resultado = "O número 1 é maior que o 2";
            } else {
                resultado = "O número 1 é menor que o 2";
            }

            let textoResultadoHtml = '<p class="text-success"> '+resultado+' </p>';

            let divResultado = $('#form-exercicio-14 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio15() {
    $('#form-exercicio-15').validate({
        rules: {
            nome: {
                required: true
            },
            idade: {
                required: true
            },
            saude: {
                required: true
            },
        },
        messages: {
            nome: {
                required: 'Informe o seu nome'
            },
            idade: {
                required: 'Informe sua idade'
            },
            saude: {
                required: 'Informe o estado da sua saude'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-15').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            console.log('Valores inseridos no formulário -> ', formData);

            let idade = formData.idade;
            let nome = formData.nome;
            let sexo = formData.sexo;
            let saude = formData.saude;
            let apto = false;

            if (idade >= 18) {
                apto = true
                if (saude !== 'BOM'){
                    apto = false;
                }
            }else{
                apto = false;
            }

            let texto = 'Olá ' + nome + ' !';

            if (apto){
                texto = texto + "Parabens você esta apto!";
            }else{
                texto = texto + 'Infelizmente você não esta apto :(';
            }

            let classe = "";
            if (apto){
                classe = "text-success";
            }else{
                classe = "text-danger";
            }

            let divResultado = $('#form-exercicio-15 .resultado');
            divResultado.html('<p class="' + classe +'">'+ texto + '</p>');
        }
    });
}

function exercicio16() {
    $('#form-exercicio-16').validate({
        rules: {
            numero: {
                required: true
            },
        },
        messages: {
            numero: {
                required: 'Informe o numero'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-16').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});
            // console.log('Valores inseridos no formulário -> ', formData);

            let numero = formData.numero;

            numero = numero.replaceAll('.', '');
            numero = numero.replaceAll(',', '.');

            numero = parseInt(numero);

            var resultado;

            if (numero > 80){
                resultado = "O número é maior que 80";
            } else {
                resultado = "O número é menor que 80";
                if (numero < 25){
                    resultado = "O número é menor que 25"
                }
            }

            let textoResultadoHtml = '<p class="text-success"> '+resultado+' </p>';

            let divResultado = $('#form-exercicio-16 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio24() {
    $('#form-exercicio-24').validate({
        rules: {
            numero: {
                required: true
            },
        },
        messages: {
            numero: {
                required: 'Informe o  numero'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-24').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            let numero = formData.numero;

            numero = numero.replaceAll('.', '');
            numero = numero.replaceAll(',', '.');

            numero = parseInt(numero);

            var resultado;

            var classe;

            if (numero > 0){
                resultado = "O número é positivo ";
                classe = 'text-success';
            } else {
                if (numero === 0) {
                    resultado = "O número é igual a 0";
                    classe = 'text-success';
                }else
                if (numero < 0){
                    resultado = "O número é menor que 0"
                    classe = 'text-danger';
                }
            }

            let textoResultadoHtml = '<p class="'+classe+'"> '+resultado+' </p>';

            let divResultado = $('#form-exercicio-24 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio25() {
    $('#form-exercicio-25').validate({
        rules: {
            numero: {
                required: true
            },
            numero2: {
                required: true
            }
        },
        messages: {
            numero: {
                required: 'Informe o primeiro numero'
            },
            numero2: {
                required: 'Informe o segundo numero'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-25').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            let numero = formData.numero;
            let numero2 = formData.numero2;

            numero = parseInt(numero);
            numero2 = parseInt(numero2);

            var resultado;

            if (numero === numero2){
                resultado = "O número um é igual ao numero dois ";
            } else {
                if (numero > numero2) {
                    resultado = "O número um é maior que o numero dois";
                }else
                if (numero < numero2){
                    resultado = "O número dois é maior que o numero um"
                }
            }

            let textoResultadoHtml = '<p class="text-success"> '+resultado+' </p>';

            let divResultado = $('#form-exercicio-25 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio26() {
    $('#form-exercicio-26').validate({
        rules: {
            numero: {
                required: true
            }
        },
        messages: {
            numero: {
                required: 'Informe o primeiro numero'
            }
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-26').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            let numero = formData.numero;

            numero = numero.replaceAll('.', '');
            numero = numero.replaceAll(',', '.');

            numero = parseInt(numero);

            var resultado;

            if (numero >= 1 && numero <= 5){
                resultado = "O número esta no intervalo ";
            } else {
                    resultado = "O número esta fora do intervalo";
            }

            let textoResultadoHtml = '<p class="text-success"> '+resultado+' </p>';

            let divResultado = $('#form-exercicio-26 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio27() {
    $('#form-exercicio-27').validate({
        rules: {
            valorVeiculo: {
                required: true
            }
        },
            messages: {
                valorVeiculo: {
                    required: 'Informe o valor do carro'
                }
            },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-27').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            console.log('Valores inseridos no formulário -> ', formData);

            let valorVeiculo = formData.valorVeiculo;
            let tipoCombustivel = formData.combustivel;
            let desconto;

            valorVeiculo = parseFloat(valorVeiculo);

            if(tipoCombustivel === "G"){
                desconto = 0.21 * valorVeiculo;
            } else if(tipoCombustivel === "A"){
                desconto = 0.25 * valorVeiculo;
            } else if(tipoCombustivel === "D"){
                desconto =  0.14 * valorVeiculo;
            } else {
                desconto = 0;
            }

            let valorPago = valorVeiculo - desconto;

            let textoResultadoHtml = '<p>Valor total a ser pago: ' + valorPago.toFixed(3) + '</p>';
            textoResultadoHtml += '<p>Desconto no veículo: ' + desconto + '</p>';

            let divResultado = $('#form-exercicio-27 .resultado');
            divResultado.html(textoResultadoHtml);
        }
    });
}

function exercicio28() {
    $('#form-exercicio-28').validate({
        rules: {
            nome: {
                required: true
            },
            salarioMinimo: {
                required: true
            },
            salario: {
                required: true
            },
        },
        messages: {
            nome: {
                required: 'Informe o seu nome'
            },
            salarioMinimo: {
                required: 'Informe o valor do salario minimo'
            },
            salario: {
                required: 'Informe o seu salario'
            },
        },
        errorClass: "text-danger",
        submitHandler: function (form) {
            // obtendo valores do formulario
            var formData = $('#form-exercicio-28').serializeArray().reduce(function (a, x) {
                a[x.name] = x.value;
                return a;
            }, {});

            let nome = formData.nome;
            let salarioMinimo = formData.salarioMinimo;
            let salario = formData.salario;
            let calc;
            let reajuste;
            let folha = "";
            let novaFolha = "";
            let reajusteTotal = null;
            let novoSalario = "";

            salarioMinimo = parseFloat(salarioMinimo);
            salario = parseFloat(salario);
            folha = parseInt(folha);
            novaFolha = parseInt(novaFolha);

            calc = salarioMinimo * 3
            if(salario < calc){
                reajuste = 0.50;
                reajusteTotal = reajuste + reajuste * salario;
                folha = folha + salario;
                novoSalario = salario + (reajuste * salario);
                novaFolha = novaFolha + novoSalario;

                let textoResultadoHtml = '<p>'+nome+' </p>';
                 textoResultadoHtml += '<p>Reajuste = 20% '+ reajusteTotal + '</p>';
                 textoResultadoHtml += '<p>Novo salário ' + novoSalario + '</p>';


                 let divResultado = $('#form-exercicio-28 .resultado');
                 divResultado.html(textoResultadoHtml);
            }else{
                calc = salarioMinimo * 10
                if(salario <= calc){
                    reajuste = 0.20;
                    folha = folha + salario;
                    novoSalario =salario + (reajuste * salario);
                    novaFolha = novaFolha + novoSalario;

                    let textoResultadoHtml = '<p>'+nome+' </p>';
                    textoResultadoHtml += '<p> Reajuste = 20% ' + (reajuste*salario) + '</p>';
                    textoResultadoHtml += '<p> Novo salário ' + novoSalario + '</p>';

                    let divResultado = $('#form-exercicio-28 .resultado');
                    divResultado.html(textoResultadoHtml);
                }else{
                   calc = salarioMinimo * 20
                    if(salario === calc){
                        reajuste = 0.15;
                        folha = folha + salario;
                        novaFolha = novaFolha + novoSalario;

                        let textoResultadoHtml = '<p>'+nome+' </p>';
                        textoResultadoHtml += '<p> Reajuste = 20% ' + (reajuste*salario) + '</p>';
                        textoResultadoHtml += '<p> Novo salário ' + novoSalario + '</p>';

                        let divResultado = $('#form-exercicio-28 .resultado');
                        divResultado.html(textoResultadoHtml);
                    } else{
                        reajuste = 0.10;
                        folha = folha + salario;
                        novoSalario = salario + (reajuste * salario);
                        novaFolha = novaFolha+ novoSalario;

                        let textoResultadoHtml = '<p>nome '+nome+' </p>';
                        textoResultadoHtml += '<p> Reajuste = 20% ' + (reajuste*salario) + '</p>';
                        textoResultadoHtml += '<p> Novo salário ' + novoSalario + '</p>';

                        let divResultado = $('#form-exercicio-28 .resultado');
                        divResultado.html(textoResultadoHtml);
                    }
                }
            }
            let aumentoFolhaPagamento = (novaFolha - folha);

            let textoResultadoHtml = '<p>'+aumentoFolhaPagamento+' </p>';
            let divResultadoFinal = $('#form-exercicio-28 .resultadoFinal');
            divResultadoFinal.html(textoResultadoHtml);
        }
    });
}

