var Compromissos = function () {
    const URL_ABRIR_COMPROMISSO = '/compromissos/abrir/compromisso';
    const URL_SALVAR = '/compromissos/salvar';
    const URL_BUSCAR = '/compromissos/buscar';
    const URL_ABRIR_COMPROMISSO_EDICAO = '/compromissos/abir/edicao';

    var init = function () {
        compromissosBuscar();
    }
    var abiriEdicao = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_COMPROMISSO_EDICAO,
            data: {
                id: id
            },
            success: function (html) {
                Popup.show({
                    title: 'compromisso',
                    content: html,
                    aoAbrir: () => {
                        validacao();
                        GenericComponents.initDateInput();
                        GenericComponents.initTimeInput();
                        GenericComponents.initDecimalInput();
                    }
                })
            }
        })
    }

    var novoCadastro = function () {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_COMPROMISSO,
            success: function (html) {
                Popup.show({
                    title: 'compromisso',
                    content: html,
                    aoAbrir: () => {
                        validacao();
                        GenericComponents.initDateInput();
                        GenericComponents.initTimeInput();
                        GenericComponents.initDecimalInput();
                    }
                })
            }
        })
    }

    var validacao = function () {
        $('#formFormulario').validate({
            rules: {
                descricao: {
                    required: true
                },
                data: {
                    required: true
                },
                hora: {
                    required: true
                },
                cor: {
                    required: true
                },
            },
            messages: {
                descricao: {
                    required: 'Descrição obrigatorio'
                },
                data: {
                    required: 'Data obrigatorio'
                },
                hora: {
                    required: 'Hora obrigatoria'
                },
                cor: {
                    required: 'cor obrigatoria'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                salvar(formData);
            }
        })
    }

    var salvar = function (formData) {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR,
            data: formData,
            success: function () {
                Dialog.openSuccessDialog({
                    title: 'Tudo certo!',
                    text: "Compromisso salvo com sucesso!"
                })
                Popup.close();
                compromissosBuscar();
            }
        })
    }

    var compromissosBuscar = function () {
        var valorDigitado = $('#pesquisa').val();
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR,
            data: {
                pesquisa: valorDigitado
            },
            success: function (compromissos) {

                var htmlListaCompleta = '<div class="activity">';

                for (const compromisso of compromissos) {

                    var itemListaHtml = '<div class="activity-item d-flex" onclick="Compromissos.edicao('+compromisso.id+')"> ';

                    itemListaHtml +=
                        '<div class="activite-label">' +
                        '   <span style="vertical-align: inherit;">' +
                        '       <span style="vertical-align: inherit; margin-right: 10px;">' +
                                      compromisso.data + ' às ' + compromisso.hora+
                        '       </span>' +
                        '   </span>' +
                        '</div>';

                    itemListaHtml += '<i class="bi bi-circle-fill activity-badge align-self-start" style="color: ' + compromisso.cor + '; "> ' +
                        '  <span  style="vertical-align: inherit;">' +
                        '     <span  style="vertical-align: inherit;"></span>' +
                        '  </span>' +
                        '</i>';

                    itemListaHtml += '<div class="activity-content " style="cursor: pointer;">' +
                        '<span style="vertical-align: inherit;">' +
                        '<span style="vertical-align: inherit;">' +
                        compromisso.descricao +
                        '</span>' +
                        '</span>' +
                        '</div>';

                    itemListaHtml += '</div>';

                    htmlListaCompleta += itemListaHtml;
                }

                htmlListaCompleta += '</div>'

                $('#lista-compromissos').html(htmlListaCompleta);
            },
            error: function (jqXHR, exception) {
                console.log("Ocorreu um erro no servidor");
            }
        })
    }
    return {
        init: function () {
            init();
        },
        abrirCadastro: function () {
            novoCadastro();
        },
        edicao: function (id) {
            abiriEdicao(id);
        },
        filtrar: function (){
            compromissosBuscar()
        }
    }
}()