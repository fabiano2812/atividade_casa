var Compra = function (){

    const URL_FILTRAR = '/compras/filtrar';
    const URL_EDITAR = '/compra/editar';
    const URL_SALVAR = '/compra/salvar';
    const URL_EXCLUIR = '/compra/excluir';

    var init = function () {
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'nomePlano',
                    wisth: '50px'
                },
                {
                    data: 'nomeImobiliaria',
                    wisth: '50px'
                },
                {
                    data: 'dataInicioFmt',
                    wisth: '50px'
                },
                {
                    data: 'dataFimFmt',
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
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar" onclick="Compra.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir" onclick="Compra.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        });
    }

    var iniciarValidacaoCompra = function (){
        $('#formCompra').validate({
            rules: {
                dataInicio: {
                    required: true
                },
                dataFim: {
                    required: true
                },
                plano: {
                    required: true
                },
            },
            messages: {
                dataInicio: {
                    required: 'Informe a data de inicio'
                },
                dataFim: {
                    required: 'Informe a data fim'
                },
                plano: {
                    required: 'Informe o plano'
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
                        Compra.voltarTelaPrincipal();
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
                Compra.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesEdicao();
            }
        });
    }

    var iniciarComponentesEdicao = function (){
        new Select2Commons().init({
            id: "plano",
            placeholder: "Selecione",
            allowClear: false
        });
        new Select2Commons().init({
            id: "imobiliaria",
            placeholder: "Selecione",
            allowClear: false
        });
        iniciarValidacaoCompra()
        GenericComponents.initDateInput();
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