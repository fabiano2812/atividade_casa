var ExerciciosBackend = function () {

    var exercicio1 = function () {
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
                    required: "Escreva o Primeiro Numero"
                },
                numero2: {
                    required: "Escreva o Segundo Numero"
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio1',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        let html = '';
                        html += '<p>O resultado da soma é:  ' + resultado + ' </p>'

                        const divResultado = $('#form-exercicio-1 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio2 = function () {
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
                    required: "Escreva o Primeiro Numero"
                },
                numero2: {
                    required: "Escreva o Segundo Numero"
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio2 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var resultadoSoma = resultado.resultadoSoma;
                        var resultadoSubtracao = resultado.resultadoSubtracao;
                        var resultadoDivisao = resultado.resultadoDivisao;
                        var resultadoMultiplicacao = resultado.resultadoMultiplicacao

                        let html = '';
                        html += '<p>O resultado da  soma é:  ' + resultadoSoma + ' </p>'
                        html += '<p>O resultado da  subtração é:  ' + resultadoSubtracao + ' </p>'
                        html += '<p>O resultado da  subtração é:  ' + resultadoDivisao + ' </p>'
                        html += '<p>O resultado da  subtração é:  ' + resultadoMultiplicacao + ' </p>'

                        const divResultado = $('#form-exercicio-2 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio3 = function () {
        $('#form-exercicio-3').validate({
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
                    required: "Escreva o Primeiro Numero"
                },
                numero2: {
                    required: "Escreva o Segundo Numero"
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio3',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        let html = '';
                        html += '<p>O consumo médio do carro é:  ' + resultado + '</p>'

                        const divResultado = $('#form-exercicio-3 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio4 = function () {
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
                    required: "Escreva o seu nome"
                },
                salario: {
                    required: "Escreva o seu salario"
                },
                vendas: {
                    required: "Escreva o valor das vendas"
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio4 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var salarioFinal = resultado.salarioFinalFmt;
                        var nome = resultado.nome;
                        var salarioFinall = resultado.salarioFinal;

                        let html = '';
                        html += '<p>salario convertido final:  ' + salarioFinal + ' </p>'
                        html += '<p>O nome da pessoa é:  ' + nome + ' </p>'
                        html += '<p>O salario final é:  ' + salarioFinall + ' </p>'

                        const divResultado = $('#form-exercicio-4 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio5 = function () {
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
                    required: "Escreva o seu nome"
                },
                nota1: {
                    required: "Escreva a primeira nota do aluno"
                },
                nota2: {
                    required: "Escreva a segunda nota do aluno"
                },
                nota3: {
                    required: "Escreva a terceira nota do aluno"
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio5 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var nome = resultado.nome;
                        var nota = resultado.notaFinal

                        let html = '';

                        html += '<p>O nome do aluno(@) é:  ' + nome + ' </p>'
                        html += '<p>A nota do aluno é:  ' + nota + ' </p>'

                        const divResultado = $('#form-exercicio-5 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio6 = function () {
        $('#form-exercicio-6').validate({
            rules: {
                valorA: {
                    required: true
                },
                valorB: {
                    required: true
                }
            },
            messages: {
                valorA: {
                    required: "Informe o valor de A válido"
                },
                valorB: {
                    required: "Informe o valor de B válido"
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio6 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var valorA = resultado.valorA;
                        var valorB = resultado.valorB

                        let html = '';

                        html += '<p>O novo valor de A é:  ' + valorA + ' </p>'
                        html += '<p>O novo valor de B é:  ' + valorB + ' </p>'

                        const divResultado = $('#form-exercicio-6 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio7 = function () {
        $('#form-exercicio-7').validate({
            rules: {
                celsius: {
                    required: true
                },
            },
            messages: {
                celsius: {
                    required: "Informe a temperatura de celsius válido"
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio7 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var fahrenheit = resultado.fahrenheit;

                        let html = '';

                        html += '<p>A nova temperatura é:  ' + fahrenheit + ' </p>'


                        const divResultado = $('#form-exercicio-7 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio8 = function () {
        $('#form-exercicio-8').validate({
            rules: {
                dolar: {
                    required: true
                },
                us: {
                    required: true
                },
            },
            messages: {
                dolar: {
                    required: "Escreva o valor do dolar(CAMPO OBRIGATORIO)"
                },
                us: {
                    required: "Escreva quando dolar voce possui(CAMPO OBRIGATORIO)"
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio8 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var rs = resultado.rs;

                        let html = '';

                        html += '<p>Dólares equivalem á:  ' + rs + ' </p>'


                        const divResultado = $('#form-exercicio-8 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio10 = function () {
        $('#form-exercicio-10').validate({
            rules: {
                compra: {
                    required: true
                },
            },
            messages: {
                compra: {
                    required: "Escreva o valor da compra(CAMPO OBRIGATORIO)"
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio10 ',
                    data: formData,
                    success: function (resultado) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(resultado)

                        var prestacao = resultado.prestacao;

                        let html = '';

                        html += '<p>O cliente deverá pagar 5 prestações de R$:  ' + prestacao + ' cada</p>'


                        const divResultado = $('#form-exercicio-10 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    var exercicio23 = function () {
        $('#form-exercicio-23').validate({
            rules: {
                numero: {
                    required: true
                },
            },
            messages: {
                numero: {
                    required: "Escreva um numero(CAMPO OBRIGATORIO)"
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: '/exercicios/backend/exercicio23 ',
                    data: formData,
                    success: function (mensagem) {
                        SnackBar.show("Tudo certo! Operação realizada com sucesso!", 5000);
                        console.log(mensagem)

                        var html = '<p>' + mensagem + '</p>'

                        const divResultado = $('#form-exercicio-23 .resultado');
                        divResultado.html(html);
                    },
                    error: function (jqXHR, exception) {
                        Dialog.openErrorDialog({
                            title: 'Oops, isso não deveria ter acontecido',
                            text: 'Ocorreu um erro no servidor!'
                        })
                    }
                });
            }
        })
    }

    return {
        init: function () {
            exercicio1();
            exercicio2();
            exercicio3();
            exercicio4();
            exercicio5();
            exercicio6();
            exercicio7();
            exercicio8();
            exercicio10();
            exercicio23();
        }
    }
}()

