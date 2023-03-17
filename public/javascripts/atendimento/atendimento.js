var Atendimento = function (){

    const URL_FILTRAR = '/atendimento/filtrar';
    const URL_EDITAR =  '/atendimento/editar';
    const URL_EXCLUIR = '/atendimento/excluir';
    const URL_SALVAR =  '/atendimento/salvar';
    const URL_VISUALIZAR = '/atendimentos/visualizar';
    const URL_ABRIR_POPUP_OPCOES_INTERACOES = '/atendimentos/interacao/popup/abrir';

    var init = function (){
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    wisth: '50px'
                },
                {
                    data: 'nomeInteressado',
                    wisth: '50px'
                },
                {
                    data: 'descricao',
                    wisth: '50px'
                },
                {
                    data: 'horafmt',
                    wisth: '50px'
                },
                {
                    data: 'datafmt',
                    wisth: '50px'
                },
                {
                    data: 'id',
                    wisth: '50px'
                }
            ],
            columnDefs:[
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="Editar" onclick="Atendimento.abrirEdicao(' + full.id + ')">';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir" onclick="Atendimento.excluir(' + full.id + ')">';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-success me-3" title="Excluir" onclick="Atendimento.visualizar(' + full.id + ')">';
                        acoesHtml += 'Visualizar';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
        })
    }

    var visualizar = function (id){
        $('#area-datatable').hide()
        $.ajax({
            method: 'POST',
            url: URL_VISUALIZAR,
            data: {
                id: id
            },
            success: function (htmlVisualizacao){
                $('#area-visualizacao').html(htmlVisualizacao)
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
                Atendimento.esconderTelaPrincipal();
                $('#area-edicao').html(htmlCadastro)
                iniciarComponentesEdicao();
            }
        })

    }

    var iniciarComponentesEdicao = function () {
        iniciarValidacaoAtendimento();
        GenericComponents.initDateInput();
        GenericComponents.initTimeInput();
        GenericComponents.initDecimalInput();
    }

    var iniciarValidacaoAtendimento = function (){
        $('#formAtendimento').validate({
            rules: {
                descricao: {
                    required: true
                },
                primeiraInteracao: {
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
                primeiraInteracao: {
                    required: 'Informe a primeira interação'
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
                            text: "Atendimento salvo com sucesso!"
                        })

                        Crud.refreshDataTable();
                        Atendimento.voltarTelaPrincipal();
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

    var abrirPopupEscolhaInteracao = function (id){
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_POPUP_OPCOES_INTERACOES,
            data: {
                id: id
            },
            success: function (html) {
                Popup.show({
                    title: 'Selecione um Tipo',
                    content: html,
                    aoAbrir: () =>{
                    }
                })
            }
        });
    }

    var escolherOpcaoInteracao = function (opcaoEscolhida){
        console.log(opcaoEscolhida);
    }

    var voltar = function (){
        $('#area-datatable').show()
        $('#area-visualizacao').html('')
    }

    return{
        init: function (){
            init();
        },
        abrirEdicao: function (id){
            abrirEdicao(id);
        },
        excluir:function (id){
            excluir(id)
        },
        visualizar: function (id){
            visualizar(id);
        },
        voltar: function (){
            voltar();
        },
        esconderTelaPrincipal: function (){
            $('#area-datatable').hide();
        },
        voltarTelaPrincipal:function (){
            $('#area-datatable').show();
            $('#area-edicao').html('');
        },
        abrirPopupEscolhaInteracao: function (id){
           abrirPopupEscolhaInteracao(id);
        },
        escolherOpcaoInteracao: function (opcaoEscolhida){
            escolherOpcaoInteracao(opcaoEscolhida);
        }
    }
}()