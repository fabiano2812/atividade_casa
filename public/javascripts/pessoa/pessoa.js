'use strict'
var Pessoa = function () {

    const URL_FILTRAR = '/pessoa/filtrar';
    const URL_SALVAR = '/pessoa/salvar';
    const URL_EDITAR = '/pessoa/editar';
    const URL_EXCLUIR = '/pessoa/excluir';
    const URL_VISUALIZAR = '/pessoa/visualizar';
    const URL_VISUALIZARIDADE = '/pessoa/visualizar/idade';

    var init = function (){
        Crud.init({
            searchMethod: URL_FILTRAR,
            columns: [
                {
                    data: 'id',
                    width: '50px'
                },
                {
                    data: 'nome',
                    width: '200px'
                },
                {
                    data: 'idade',
                    width: '50px'
                },
                {
                    data: 'id',
                    width: '100px'
                }
            ],
            columnDefs: [
                {
                    targets: 1,
                    render: function (data, type, full, meta) {

                        var nome = data

                        const letras = nome.split('');
                        console.log(letras[0]);

                        var primeiraLetraNome = letras[0];

                        var html = '<div class="d-flex align-items-center">' +
                            '<div class="quadrado">' +
                            '<div class="pessoa">'+primeiraLetraNome+'</div>' +
                            '</div>'+
                            '<p class="N-pessoa mb-0">'+ nome +'</p>' +
                            '</div>';

                        return html;
                    }
                },
                {
                    targets: -1,
                    orderable: false,
                    render: function (data, type, full, meta) {

                        var acoesHtml = '';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3" title="VisualizarIdade"onclick="Pessoa.visualizarIdade('+full.id+')">';
                        acoesHtml += 'Idade';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-success me-3 mt-1" title="Visualizar"onclick="Pessoa.visualizarPessoa('+full.id+')">';
                        acoesHtml += 'Visualizar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-primary me-3 mt-1" title="Editar" onclick="Pessoa.abrirEdicao('+full.id+')" >';
                        acoesHtml += 'Editar';
                        acoesHtml += '</button>';
                        acoesHtml += '<button class="btn btn-sm btn-danger me-3" title="Excluir" onclick="Pessoa.excluir('+full.id+')" >';
                        acoesHtml += 'Excluir';
                        acoesHtml += '</button>';
                        return acoesHtml;
                    }
                }
            ]
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
                Pessoa.esconderTelaPrincipal();
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
        placeholderEmptyParent: "Selecione um estado para habilitar este campo",
        displayField: "nome",
        required: true
    });

    new Select2Commons().init({
        id: "cidade",
        searchMethod: "/cidades/buscarCidadesPorEstado",
        placeholder: "Selecione",
        placeholderEmptyParent: "Selecione uma cidade para habilitar este campo",
        displayField: "nome",
        parentId: "estado",
        required: true
    });
    new Select2Commons().init({
        id: "bairro",
        searchMethod: "/bairro/buscarBairro",
        placeholder: "Selecione",
        displayField: "nome",
        parentId: "cidade",
        required: true
    });
    iniciarValidacaoFormulario();
    GenericComponents.initDecimalInput();
}
    var visualizarPorIdade = function (id){
        $.ajax({
            method: 'POST',
            url: URL_VISUALIZARIDADE,
            data:{
                id:id
            },
            success: function (html) {
                Popup.show({
                    title: 'Vizualizar idade',
                    content: html,
                    aoAbrir: () =>{

                    }
                })
            }
        })
    }
    var visualizar = function (id){
        $.ajax({
            method: 'POST',
            url: URL_VISUALIZAR,
            data: {
                id: id
            },
            success: function (html) {
                Popup.show({
                    title: 'Pessoa',
                    content: html,
                    aoAbrir: () =>{
                    }
                })
            }
        });
    }
    var iniciarValidacaoFormulario = function (){
        $('#formPessoa').validate({
            rules: {
                nome: {
                    required: true
                },
                idade: {
                    required: true
                },
                sobrenome: {
                    required: true
                },
                profissao: {
                    required: true
                },
                cpf:{
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o seu nome'
                },
                idade: {
                    required: 'Informe a sua idade'
                },
                sobrenome: {
                    required: 'Informe o seu sobrenome'
                },
                profissao: {
                    required: 'Informe o seu nome'
                },
                cpf:{
                    required: 'Informe o seu cpf'
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
                            text: "Pessoa salva com sucesso!"
                        })
                        Crud.refreshDataTable();
                        Pessoa.voltarTelaPrincipal();
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        });
    }

    return{

        init: function (){
            init();
        },
        excluir: function (id){
            excluir(id);
        },
        abrirEdicao:function (id){
            abrirEdicao(id);
        },
        visualizarPessoa:function (id){
            visualizar(id);
        },
        visualizarIdade:function (id){
            visualizarPorIdade(id);
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

