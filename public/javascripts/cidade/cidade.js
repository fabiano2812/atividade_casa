var Cidade = function (){

    const URL_FILTRAR = '/cidades/filtrar';
    const URL_EDITAR = '/cidade/editar';
    const URL_SALVAR = '/cidade/salvar';
    const URL_EXCLUIR = '/cidade/excluir';

    var init = function () {
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'nome',
                    wisth: '50px'
                },
                {
                    data: 'estado',
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
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Cidade.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir"onclick="Cidade.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        });
    }
    var iniciarValidacaoCidade = function (){
        $('#formCidade').validate({
            rules: {
                nome: {
                    required: true
                },
                estado: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                },
                estado: {
                    required: 'Informe o Estado'
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
                            text: "Cidade salvo com sucesso!"
                        })

                        Crud.refreshDataTable();
                        Cidade.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        });
    }

    var abrirEdicao = function (id){
        $.ajax({
            method: 'POST',
            url: URL_EDITAR,
            data: {
                id: id
            },
            success: function (htmlCadastro){
                Cidade.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                new Select2Commons().init({
                    id: "estado",
                    placeholder: "Selecione",
                    allowClear: false
                });
                iniciarValidacaoCidade()
                GenericComponents.initDateInput();
            }
        });
    }

    var excluir = function (id){
        Dialog.askConfirmation({
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            afterConfirm: function (){
                $.ajax({
                    method: 'POST',
                    url: URL_EXCLUIR,
                    data: {
                        id: id
                    },
                    success: function () {
                        $('.linha-'+id).remove();
                        Dialog.openSuccessDialog({
                            title:'Excluído!',
                            text:'Seu arquivo foi excluído.'
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
        init: function (){
            init();
        },
        abrirEdicao: function (id){
            abrirEdicao(id);
        },
        excluir:function (id){
            excluir(id);
        },
        esconderTelaPrincipal: function (){
            $('#area-datatable').hide();
        },
        voltarTelaPrincipal:function (){
            $('#area-datatable').show();
            $('#area-edicao').html('');
        }
    }
}()