var Contato = function () {

    const URL_SALVAR_CONTATO = '/contato/salvar';

    var inicio = function () {
    }

    /*fullName--fullEmail--fullSujeito--fullMensagem*/

    var salvar = function () {
        $('#dadosDoUsuario').validate({
            rules: {
                fullName: {
                    required: true
                },
                fullEmail: {
                    required: true
                },
                fullSujeito: {
                    required: true
                },
                fullMensagem: {
                    required: true
                },
            },
            messages: {
                fullName: {
                    required: 'informe seu nome'
                },
                fullEmail: {
                    required: 'informe seu Email'
                },
                fullSujeito: {
                    required: 'informe o sujeito ou Ussuario'
                },
                fullMensagem: {
                    required: 'informe a mensagem'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_CONTATO,
                    data: formData,
                    success: function (formData) {
                        console.log(formData)

                        Dialog.openSuccessDialog({
                            title:'Tudo certo!',
                            text: "Email enviado com sucesso!"
                        })
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        })
    }


    return {
        inicio: function () {
            inicio();
        },
        salvar: function (){
            salvar();
        }
    }
}()