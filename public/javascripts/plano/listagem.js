var Plano = function () {
    const URL_ABRIR_POPUP = '/plano/abrirPopup';
    const URL_SALRVAR_DADOS = '/plano/salvarDados';

    var abrirPopupCompra = function (id) {
        $.ajax({
            method: 'POST',
            url: URL_ABRIR_POPUP,
            data: {
                id: id
            },
            success: function (html) {
                Popup.show({
                    title: 'Plano',
                    content: html,
                    aoAbrir: () => {
                        validacao();
                    }
                })
            }
        })
    }

    var validacao = function () {
        $('#formPopup').validate({
            rules: {
                nome: {
                    required: true
                },
                email: {
                    required: true
                },
                endereco:{
                    required: true
                }
            },
            messages: {
                nome: {
                    required: 'Nome obrigatorio'
                },
                email: {
                    required: 'Descrição obrigatorio'
                },
                endereco: 'Endereço obrigarorioo'
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();
                console.log(formData)
                $.ajax({
                    method: 'POST',
                    url: URL_SALRVAR_DADOS,
                    data: formData,
                    success: function (html) {
                    }
                })
            }
        })
    }

    return {
        abrirPopup: function (id) {
            abrirPopupCompra(id);
        }
    }
}()