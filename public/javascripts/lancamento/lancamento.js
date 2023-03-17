var Lancamento = function () {

    const URL_FILTRAR = '/lancamento/filtrar';
    const URL_EDITAR = '/lancamento/edicao';
    const URL_SALVAR = '/lancamento/salvar';
    const URL_EXCLUIR = '/lancamento/excluir';

    var init = function () {
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'descricao',
                    wisth: '50px'
                },
                {
                    data: 'valor',
                    wisth: '50px'
                },
                {
                    data: 'tipo',
                    wisth: '50px'
                },
                {
                    data: 'id',
                    wisth: '50px'
                }
            ],
            columnDefs: [
                {
                    targets: 3,
                    render:function (data, type, full, meta) {

                        var html = '';

                        if(data === "RECEITA"){
                             html = '<span class="badge bg-success">Receita</span>'
                        } else if(data === "DESPESA"){
                            html = '<span class="badge bg-danger">Despesa</span>'
                        }

                        return html;
                    }
                },
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Lancamento.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir"onclick="Lancamento.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        });
    }

    var abrirEdicao = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_EDITAR,
            data: {
                id: id
            },
            success: function (htmlLancamento) {
                Lancamento.esconderTelaPrincipal();
                $('#area-edicao').html(htmlLancamento)
                iniciarComponentesEdicao();
            }
        });
    }
    var iniciarComponentesEdicao = function () {
        iniciarValidacaoLancamento()
        GenericComponents.initDateInput();
        GenericComponents.initDecimalInput();
    }
    var iniciarValidacaoLancamento = function () {
        $('#formLancamento').validate({
            rules: {
                descricao: {
                    required: true
                },
                observacoes: {
                    required: true
                },
                valor: {
                    required: true
                },
                data: {
                    required: true
                },
            },
            messages: {
                descricao: {
                    required: 'Informe a descricao'
                },
                observacoes: {
                    required: 'Informe a observação'
                },
                valor: {
                    required: 'Informe o valor'
                },
                data: {
                    required: 'Informe a data'
                },
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
                            text: "Lancamento salvo com sucesso!"
                        })
                        Crud.refreshDataTable();
                        Lancamento.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        });
    }
    var excluir = function (id) {
        Dialog.askConfirmation({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            afterConfirm: function () {
                $.ajax({
                    method: 'POST',
                    url: URL_EXCLUIR,
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

    return {
        init: function () {
            init();
        },
        excluir: function (id) {
            excluir(id);
        },
        abrirEdicao: function (id) {
            abrirEdicao(id);
        },
        esconderTelaPrincipal: function (){
            $('#area-datatable').hide();
        },
        voltarTelaPrincipal:function (){
            $('#area-datatable').show();
            $('#area-edicao').html('');
        }
    }
}();