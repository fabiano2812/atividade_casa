var Evento = function () {

    const URL_CADASTRO_NOVO = '/evento/novoCadastro';
    const URL_FILTRAR = '/evento/filtrar';
    const URL_SALVAR = '/evento/salvar';
    const URL_EXCLUIR_EVENTO = '/evento/excluir';
    const URL_CADASTRO_EVENTO_PESSOAS = '/evento/cadastro/evento/pessoa';
    const URL_SALVAR_DADOS = '/evento/salvar/dados';

    var init = function () {
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'titulo',
                    wisth: '50px'
                },
                {
                    data: 'endereco',
                    wisth: '50px'
                },
                {
                    data: 'hora',
                    wisth: '50px'
                },
                {
                    data: 'data',
                    wisth: '50px'
                },
                {
                    data: 'id',
                    wisth: '50px'
                }
            ],
            columnDefs: [
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Evento.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-success me-3" title="participante"onclick="Evento.pessoaEvento(' + full.id + ')">';
                        acoesHtml += 'Participantes';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3 mt-1" title="Excluir"onclick="Evento.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;

                    }
                }
            ]
        })
    }


    var novoCadastro = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_CADASTRO_NOVO,
            data: {
                id: id
            },
            success: function (htmlCadastro) {
                Evento.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesCadastro();
            }
        });
    }
    var validacaoFormPessoa = function (){
        $('#formEvento').validate({
            rules:{
                eventoId:{
                    required: true
                },
                pessoaId:{
                    required: true
                }
            },
            messages: {
                eventoId: {
                    required: 'Informe o evento'
                },
                pessoaId: {
                    required: 'Informe a pesssoa'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_DADOS,
                    data: formData,
                    success: function () {
                        Dialog.openSuccessDialog({
                            title: 'Tudo certo!',
                            text: "Evento salvo com sucesso!"
                        })
                        Crud.refreshDataTable();
                        Evento.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        })
    }


    var iniciarComponentesCadastro = function () {
        iniciarValidacao()
        GenericComponents.initDateInput();
        GenericComponents.initTimeInput();
        GenericComponents.initDecimalInput();
    }
    var iniciarValidacao = function () {
        $('#formEvento').validate({
            rules: {
                titulo: {
                    required: true
                },
                descricao: {
                    required: true
                },
                endereco: {
                    required: true
                },
                data: {
                    required: true
                },
                hora: {
                    required: true
                },
                quantidadeMaxima: {
                    required: true
                }
            },
            messages: {
                titulo: {
                    required: 'Informe o titulo'
                },
                descricao: {
                    required: 'Informe a descricao'
                },
                endereco: {
                    required: 'Informe o endereço'
                },
                data: {
                    required: 'Informe a data'
                },
                hora: {
                    required: 'Informe a hora'
                },
                quantidadeMaxima: {
                    required: 'Informe a quantidade maxima de pessoa'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR,
                    data: formData,
                    success: function () {
                        Dialog.openSuccessDialog({
                            title: 'Tudo certo!',
                            text: "Evento salvo com sucesso!"
                        })
                        Crud.refreshDataTable();
                        Evento.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        });
    }

    var excluirEvento = function (id) {
        Dialog.askConfirmation({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            afterConfirm: function () {
                $.ajax({
                    method: 'POST',
                    url: URL_EXCLUIR_EVENTO,
                    data: {
                        id: id
                    },
                    success: function () {
                        $('.linha-' + id).remove();
                        Dialog.openSuccessDialog({
                            title: 'Excluído!',
                            text: 'Seu arquivo foi excluído.'
                        })
                        Crud.refreshDataTable();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Erro no servidor ao excluir.");
                    }
                });
            }
        })
    }
    var cadastroPessoaEvento = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_CADASTRO_EVENTO_PESSOAS,
            data: {
                id: id
            },
            success: function (html) {
                Evento.esconderTelaPrincipal();
                $('#area-edicao').html(html)
                abrirPessoaEventos();
                pessoaEvento();
                validacaoFormPessoa();
            }
        });
    }
    var abrirPessoaEventos = function () {
        $('#pessoaEvento').validate({})
    }

    var pessoaEvento = function () {
        new Select2Commons().init({
            id: "pessoa",
            searchMethod: "/pessoa/pesquisar",
            placeholder: "Selecione",
            displayField: "nome",
          /*  required: true*/
        });
    }

    return {
        init: function () {
            init();
        },
        abrirEdicao: function (id) {
            novoCadastro(id);
        },
        esconderTelaPrincipal: function () {
            $('#area-datatable').hide();
        },
        voltarTelaPrincipal: function () {
            $('#area-datatable').show();
            $('#area-edicao').html('');
        },
        excluir: function (id) {
            excluirEvento(id);
        },
        pessoaEvento: function (id) {
            cadastroPessoaEvento(id);
        }
    }
}()