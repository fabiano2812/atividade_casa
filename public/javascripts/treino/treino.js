var Treino = function () {

    const URL_ABRIR_POPUP = '/treino/abirirPopup';
    const URL_ABRIR_EXEMPLO2_POPUP = '/treino/exemplo2/abrirPopup';
    const URL_ABRIR_EXEMPLO3_POPUP = '/treino/exemplo3/abrirPopup';
    const URL_ABRIR_EXEMPLO4_POPUP = '/treino/exemplo4/abrirPopup';
    const URL_ABRIR_EXEMPLO5_POPUP = '/treino/exemplo5/abrirPopup';
    const URL_ABRIR_EXEMPLO6_POPUP = '/treino/exemplo6/abrirSoma';
    const URL_BUSCAR_USUARIO_POR_EMAIL = '/treino/exemplo7/buscarUsuarioPorEmail';
    const URL_BUSCAR_PESSOA_POR_EMAIL = '/treino/exemplo8/buscarPessoaPorEmail';
    const URL_BUSCAR_PESSOA_POR_EMAIL_IDADE_EXEMPLO_9 = '/treino/exemplo9/buscarPessoaPorEmailEIdade';
    const URL_BUSCAR_PESSOA_POR_EMAIL_IDADE_EXEMPLO_10 = '/treino/exemplo10/buscarPessoaPorEmailOuIdade';
    const URL_SALVAR_JOAO = '/treino/pessoa/joao/salvar';
    const URL_SALVAR_LUIZ = '/treino/pessoa/luiz/salvar';
    const URL_SALVAR_DADOS = '/treino/pessoa/dados/salvar';
    const URL_SALVAR_PESSOA_MAIOR_DE_IDADE = '/treino/pessoa/salvar/maior-idade';
    const URL_SALVAR_PESSOA_MENOR_DE_IDADE = '/treino/pessoa/salvar/menor-idade';
    const URL_ABRIR_MODAL = '/treino/abrirModal';
    const URL_BUSCAR_POR_CPF = '/treino/buscarPorCpf';
    const URL_SALVAR_DADOS_PESSOA = '/treino/salvar/pessoa';

    var abrirPopup = function () {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_POPUP,
            success: function (html) {
                Popup.show({
                    title: 'treino',
                    content: html,
                    aoAbrir: () => {
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo2 = function () {
        $('#formExemplo2').validate({
            rules: {
                nome: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Nome obrigatorio'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_ABRIR_EXEMPLO2_POPUP,
                    data: formData,
                    success: function (html) {
                        Popup.show({
                            title: 'nome',
                            content: html,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo3 = function () {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_EXEMPLO3_POPUP,
            success: function (html) {
                Popup.show({
                    title: 'nome',
                    content: html,
                    aoAbrir: () => {
                        aoAbrirPopupPublicacao();
                    }
                })
            }
        })
    }
    var aoAbrirPopupPublicacao = function () {
        $('#formExemplo3').validate({
            rules: {
                nome: {
                    required: true
                }
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var nome = $("#nomeExemplo3").val();
                $('#area-resultado').html(nome)
                Popup.close();
            }
        })
    }
    var iniciarValidacaoExemplo4 = function () {
        $('#formExemplo4').validate({
            rules: {
                nome: {
                    required: true
                },
                sobrenome: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Nome obrigatorio'
                },
                sobrenome: {
                    required: 'Sobrenome obrigatorio'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_ABRIR_EXEMPLO4_POPUP,
                    data: formData,
                    success: function (html) {
                        Popup.show({
                            title: 'Nome, Sobrenome',
                            content: html,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var abrirPopupExemplo5 = function () {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_EXEMPLO5_POPUP,
            success: function (html) {
                Popup.show({
                    title: 'nome e sobrenome',
                    content: html,
                    aoAbrir: () => {
                        aoAbrirPopupExemplo5();
                    }
                })
            }
        })
    }
    var aoAbrirPopupExemplo5 = function () {
        $('#formExemplo5').validate({
            rules: {
                nome: {
                    required: true
                },
                sobrenome: {
                    required: true
                }
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                },
                sobrenome: {
                    required: 'informe o sobrenome'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var nome2 = $("#nomeExemplo5").val();
                var sobrenome2 = $("#sobrenomeExemplo5").val();
                $('#area-resultado2').html(nome2 + ' ' + sobrenome2);
                Popup.close();
            }
        })
    }
    var iniciarValidacaoExemplo6 = function () {
        $('#formExemplo6').validate({
            rules: {
                numero: {
                    required: true
                },
                numero2: {
                    required: true
                },
            },
            messages: {
                numero: {
                    required: 'Digite um numero'
                },
                numero2: {
                    required: 'Digite o segundo numero'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_ABRIR_EXEMPLO6_POPUP,
                    data: formData,
                    success: function (html) {
                        Popup.show({
                            title: 'soma',
                            content: html,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo7 = function () {
        $('#formExemplo7').validate({
            rules: {
                email: {
                    required: true
                },

            },
            messages: {
                email: {
                    required: 'Email obrigatorio'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                $.ajax({
                    method: 'POST',
                    url: URL_BUSCAR_USUARIO_POR_EMAIL,
                    data: formData,
                    success: function (retorno) {
                        Popup.show({
                            title: 'Email',
                            content: retorno,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo8 = function () {
        $('#formExemplo8').validate({
            rules: {
                emailPessoa: {
                    required: true
                },
            },
            messages: {
                emailPessoa: {
                    required: ' Informe Email obrigatorio'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_BUSCAR_PESSOA_POR_EMAIL,
                    data: formData,
                    success: function (banana) {
                        Popup.show({
                            title: 'Email',
                            content: banana,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo9 = function () {
        $('#formExemplo9').validate({
            rules: {
                email: {
                    required: true
                },
                idade: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Informe Email obrigatorio'
                },
                idade: {
                    required: 'Informe Idade obrigatorio'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_BUSCAR_PESSOA_POR_EMAIL_IDADE_EXEMPLO_9,
                    data: formData,
                    success: function (chocolate) {
                        Popup.show({
                            title: 'Email e Idade',
                            content: chocolate,
                            aoAbrir: () => {

                            }
                        })
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo10 = function () {
        $('#formExemplo10').validate({
            rules: {
                email: {
                    required: true
                },
                idade: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Informe o email obrigatorio'
                },
                idade: {
                    required: 'Informe Idade obrigatorio'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_BUSCAR_PESSOA_POR_EMAIL_IDADE_EXEMPLO_10,
                    data: formData,
                    success: function (chocolate) {
                    }
                })
            }
        })
    }
    var salvarDados = function () {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_DADOS,
            success: function (grut) {
                console.log(grut)
            }
        })
    }
    var salvarLuiz = function () {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_LUIZ,
            success: function (churasco) {
                console.log(churasco)
            }
        })
    }
    var salvarJoao = function () {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_JOAO,
            success: function (chocolate) {
                console.log(chocolate)
            }
        })
    }
    var iniciarValidacaoExemplo12 = function () {
        $('#formExemplo12').validate({
            rules: {
                nome: {
                    required: true
                },
                sobrenome: {
                    required: true
                },
                idade: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                },
                sobrenome: {
                    required: 'Informe o sobrenome'
                },
                idade: {
                    required: 'Informe a idade'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_PESSOA_MAIOR_DE_IDADE,
                    data: formData,
                    success: function (pessoa) {
                        Dialog.openSuccessDialog({
                            title: 'Tudo certo!',
                            text: pessoa.nome + " salvo com sucesso!"
                        })
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.responseText === 'PessoaMenorDeIdadeException') {
                            Dialog.openErrorDialog({
                                title: 'Ooops',
                                text: "Somente pessoas maior de idade são permitidas"
                            })
                        }
                    }
                })
            }
        })
    }
    var iniciarValidacaoExemplo13 = function () {
        $('#formExemplo13').validate({
            rules: {
                nome: {
                    required: true
                },
                sobrenome: {
                    required: true
                },
                idade: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                },
                sobrenome: {
                    required: 'Informe o sobrenome'
                },
                idade: {
                    required: 'Informe a idade'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_PESSOA_MENOR_DE_IDADE,
                    data: formData,
                    success: function (pessoa) {
                        Dialog.openSuccessDialog({
                            title: 'Tudo certo!',
                            text: pessoa.nome + " salvo com sucesso!"
                        })
                    },
                    error: function (jqXHR, exception) {
                        if (jqXHR.responseText === 'PessoaMenorDeIdadeException') {
                            Dialog.openErrorDialog({
                                title: 'Ooops',
                                text: "Somente pessoas menor de idade são permitidas"
                            })
                        }
                    }
                })
            }
        })
    }
    var listaPessoas = [
        {
            id: 1,
            nome: 'José Ferreira',
            profissao: 'Programador',
            foto: 'https://i.pravatar.cc/150?img=3'
        },
        {
            id: 2,
            nome: 'Maria Almeida',
            profissao: 'Médica',
            foto: 'https://i.pravatar.cc/150?img=4'
        },
        {
            id: 3,
            nome: 'João da Silva',
            profissao: 'Pedreiro',
            foto: 'https://i.pravatar.cc/150?img=5'
        },
        {
            id: 4,
            nome: 'Antonio Dias',
            profissao: 'Técnico de Futebol',
            foto: 'https://i.pravatar.cc/150?img=6'
        }
    ]
    var abrirModal = function (id) {
        // alert(id)
        var pessoa = '';

        for (var i = 0; i < listaPessoas.length; i++) {
            if (listaPessoas[i].id === id) {
                pessoa = listaPessoas[i];
                break;
            }
        }
        console.log(pessoa)
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_MODAL,
            data: {
                id: pessoa.id,
                nome: pessoa.nome,
                profissao: pessoa.profissao
            },
            success: function (pessoa) {
                Popup.show({
                    title: 'Treino',
                    content: pessoa,
                    aoAbrir: () => {
                    }
                })
            }
        });
    }

    var exercicioCurso = function () {
        /*                      function de  teste de video  aula              */

        var compras = function (trabalho1, trabalho2) {
            /*const compraTv32 = (trabalho1 ^ trabalho2)*/    /* tipo exclusivo -^- */
            const compraSorvete = trabalho1 || trabalho2  /* tipo de operação -ou- */
            const compraTv50 = trabalho1 && trabalho2     /* tipo de operação -i-  */
            const compraTv70 = trabalho1 != trabalho2     /* tipo operador diferente -!=- */
            const manterSaudavel = !compraSorvete         /* tipo negação logica -=!-*/
            return {compraSorvete, compraTv50, compraTv70, manterSaudavel}
        }
        console.log(compras(true, true))
        console.log(compras(true, false))
        console.log(compras(false, true))
        console.log(compras(false, false))

        let num1 = 1
        let num2 = 2            /*++ soma 1 numero  -- diminui um numero */
        console.log(++num1 === num2--)/*  vai fazer comparação para ver se é igual  */

        let contador = 1
        while (contador <= 10) {
            console.log(`contador = ${contador}`)
            contador++
        }
        const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        for (x in numeros) {
            if (x == 5) {
                break
            }
            console.log(`${x} = ${numeros[x]}`)
        }
    }

    var gerarListaPessoas = function () {


        var htmlListaPessoas = '<ol class="list-group list-group-numbered">';

        for (const pessoa of listaPessoas) {

            var itemPessoaHtml = '<li class="list-group-item d-flex justify-content-between align-items-start">';

            var linkFoto = pessoa.foto;

            itemPessoaHtml +=
                '   <img src=" ' + linkFoto + ' " class="rounded" style="width: 50px">' +
                '           <div class="ms-2 me-auto">' +
                '               <div class="fw-bold">' + pessoa.nome + '</div>' + pessoa.nome +
                '   </div>' +
                '     <button class="btn btn-sm btn-success"  onclick="Treino.abrirModal(' + pessoa.id + ')">Pesquisar</button>' +
                ' </div>';

            itemPessoaHtml += '</li>';

            htmlListaPessoas += itemPessoaHtml;
        }
        htmlListaPessoas += '</ol>'

        $('#lista-pessoas').html(htmlListaPessoas);
    }

    var salvarDadosPessoa = function () {
        var id = $("#pessoa-id").val();
        var nome = $("input#nome").val();

        $.ajax({
            method: 'POST',
            url: URL_SALVAR_DADOS_PESSOA,
            data: {
                id: id,
                nome: nome
            },
            success: function () {
                Dialog.openSuccessDialog({
                    title: 'Tudo certo!',
                    text: "Pessoa salva com sucesso!"
                })
            },
            error: function (jqXHR, exception) {
                console.log("Ocorreu um erro no servidor");
            }
        })
    }

    var buscarCpf = function () {

        var cpfDigitado = $("#cpf").val();

        $("#carregamento").show();

        $.ajax({
            method: "POST",
            url: URL_BUSCAR_POR_CPF,
            data: {
                cpf: cpfDigitado
            },

            success: function (pessoa) {

                $("#carregamento").hide();
                if (pessoa) {
                    // se não estiver vazia a variavel
                    $("#pessoa-encontrada-cpf").show();
                    $("#pessoa-nao-encontrada").hide();
                    htmlDadosPessoa(pessoa);
                    $("input#cpf").hide();
                    $("#form-pessoa-encontrado").show();
                    $("input#nome").val(pessoa.nome);
                    $("input#pessoa-id").val(pessoa.id);
                } else {
                    // se estiver vazia a variavel
                    $("#pessoa-nao-encontrada").show();
                    $("#pessoa-encontrada-cpf").hide();
                }

            }
        })
    }

    var htmlDadosPessoa = function (pessoa) {
        var htmlListaPessoas = '<h5 class="card-title">Buscar dados de Pessoa Por CPF';

        var itemPessoaHtml = '<div id="pessoa-encontrada-cpf" class="alert alert-primary alert-dismissible" role="alert">';

        itemPessoaHtml +=
            '           <h4 class="alert-heading">Cpf Digitado: ' + pessoa.cpf + '</h4>' +
            '                                   <hr>' +
            '               <p class="fw-bold">Nome: ' + pessoa.nome + '</p>' +
            '                                   <hr>' +
            '               <p class="fw-bold">Sobrenome: ' + pessoa.sobrenome + '</p>' +
            ' </div>';


        itemPessoaHtml += '</h5>';

        htmlListaPessoas += itemPessoaHtml;

        htmlListaPessoas += '</div>'

        $('#pessoa-encontrada-cpf').html(htmlListaPessoas);
    }

    return {
        init: function () {
            iniciarValidacaoExemplo2();
            iniciarValidacaoExemplo4();
            iniciarValidacaoExemplo6();
            iniciarValidacaoExemplo7();
            iniciarValidacaoExemplo8();
            iniciarValidacaoExemplo9();
            iniciarValidacaoExemplo10();
            iniciarValidacaoExemplo12();
            iniciarValidacaoExemplo13();
            //compras();
        },
        abrirPopup: function () {
            abrirPopup();
        },
        abrir: function () {
            iniciarValidacaoExemplo3()
        },
        abrirPopup5: function () {
            abrirPopupExemplo5();
        },
        salvar: function () {
            salvarJoao();
        },
        salvarLuiz: function () {
            salvarLuiz();
        },
        salvarDadosGerais: function () {
            salvarDados();
        },
        gerarListaPessoas: function () {
            gerarListaPessoas();
        },
        abrirModal: function (id) {
            abrirModal(id);
        },
        buscarCpf: function () {
            buscarCpf();
        },
        salvarDados: function () {
            salvarDadosPessoa();
        }
    }
}()