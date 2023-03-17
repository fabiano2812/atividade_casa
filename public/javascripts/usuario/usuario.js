let Usuario = function () {

    const URL_FILTRAR = "/usuarios/filtrar";
    const URL_EDITAR = "/usuarios/editar ";
    const URL_SALVAR = "/usuarios/salvar ";
    const URL_EXCLUIR = '/usuarios/excluir';

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
                    wisth: '100px'
                },
                {
                    data: 'email',
                    wisth: '100px'
                },
                {
                    data: 'nomeImobiliaria',
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
                    render: function (data, type, full, meta) {
                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar"onclick="Usuario.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir"onclick="Usuario.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        })
    }
    var abrirEdicao = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_EDITAR,
            data: {
                id: id
            },
            success: function (htmlCadastro){
                Usuario.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesEdicao();
            }
        })
    }

    var iniciarComponentesEdicao = function (){
        //iniciando selec imobiliaria
        new Select2Commons().init({
            id: "imobiliaria",
            placeholder: "Selecione",
            allowClear: false
        });
        iniciarValidaocaoFormulario();
    }

    var iniciarValidaocaoFormulario = function (){
        $('#formUsuario').validate({
            rules: {
                id: {
                    required: true
                },
                nome: {
                    required: true
                },
                email: {
                    required: true
                },
                senha: {
                    required: true
                },
                imobiliariaId: {
                    required: true
                },
                sobre: {
                    required: true
                },
                trabalho: {
                    required: true
                },
                empresa: {
                    required: true
                },
                pais: {
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
                email: {
                    required: 'Informe seu Email'
                },
                senha: {
                    required: 'Informe sua Senha'
                },
                imobiliariaId: {
                    required: 'Informe sua Imobiliaria'
                },
                sobre: {
                    required: 'Informe sobre'
                },
                trabalho: {
                    required: 'Informe seu trabalho'
                },
                empresa: {
                    required: 'Informe sua empresa'
                },
                pais: {
                    required: 'Informe seu pais'
                },
                endereco: {
                    required: 'Informe seu pais'
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
                            text: "Usuario salvo com sucesso!"
                        })
                        Crud.refreshDataTable();
                        Usuario.voltarTelaPrincipal();
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

    return {
        init: function () {
            init();
        },
        abrirEdicao: function (id) {
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