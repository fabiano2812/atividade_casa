var Imobiliaria = function (){

    const URL_FILTRAR = '/imobiliarias/filtrar';
    const URL_EDITAR = '/imobiliaria/editar';
    const URL_SALVAR = '/imobiliaria/salvar';
    const URL_EXCLUIR = '/imobiliaria/excluir';

    var init = function (){
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'nome',
                    wisth: '100px'
                },
                {
                    data: 'endereco',
                    wisth: '100px'
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
                    render: function (data, type, full, meta){
                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Imobiliaria.abrirEdicao('+full.id+')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir"onclick="Imobiliaria.excluir('+full.id+')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        })
    }

    var iniciarValidaocaoFormulario = function (){
        $('#formImobiliaria').validate({
            rules: {
                id: {
                    required: true
                },
                nome: {
                    required: true
                },
                endereco: {
                    required: true
                },
            },
            messages: {
                id: {
                    required: 'Informe seu id'
                },
                nome: {
                    required: 'Informe seu seu nome'
                },
                endereco: {
                    required: 'Informe seu Endereço'
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
                            text: "Imobiliaria salvo com sucesso!"
                        })

                        Crud.refreshDataTable();
                        Imobiliaria.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
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

    var abrirEdicao = function (id){
        $.ajax({
            method: 'POST',
            url: URL_EDITAR,
            data: {
                id: id
            },
            success: function (htmlCadastro){
                Imobiliaria.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesEdicao();
            }
        });
    }

    var iniciarComponentesEdicao = function (){
        iniciarValidaocaoFormulario();
    }

    return {
        init: function (){
            init();
        },
        abrirEdicao:function(id){
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