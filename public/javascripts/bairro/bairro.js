var Bairro = function (){

    const URL_FILTRAR = '/bairros/filtrar';
    const URL_EDITAR = '/bairro/editar';
    const URL_SALVAR = '/bairro/salvar';
    const URL_EXCLUIR = '/bairro/excluir';

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
                    data: 'cidade',
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
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Bairro.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir"onclick="Bairro.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        });
    }

    var iniciarValidacaoBairro = function (){
        $('#formBairro').validate({
            rules: {
                nome: {
                    required: true
                },
                estado: {
                    required: true
                },
                cidade: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o nome'
                },
                estado: {
                    required: 'Informe o nome'
                },
                cidade: {
                    required: 'Informe o nome'
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
                            text: "Bairro salvo com sucesso!"
                        })

                        Crud.refreshDataTable();
                        Bairro.voltarTelaPrincipal();
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
                Bairro.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesEdicao();
            }
        });
    }

    var iniciarComponentesEdicao = function (){
        new Select2Commons().init({
            id: "estado",
            searchMethod: "/estados/buscarEstados",
            placeholder: "Selecione",
            displayField: "nome",
            required: true
        });

        new Select2Commons().init({
            id: "cidade",
            searchMethod: "/cidades/buscarCidadesPorEstado",
            placeholder: "Selecione",
            placeholderEmptyParent: "Selecione um estado para habilitar este campo",
            displayField: "nome",
            parentId: "estado",
            required: true
        });

        iniciarValidacaoBairro();
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