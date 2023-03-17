var Perfil = function () {

    const URL_SALVAR_ALTERAR_SENHA = '/perfil/alterar/senha'
    const URL_SALVAR_USUARIO = '/perfil/salvar/dados/usuario'
    var init = function () {
        alterarDadosDoUsuario();
        alteraNovaSenha();
    }

    var alterarDadosDoUsuario = function () {
        $('#formUsuarioValidacao').validate({
            rules: {
                fullName: {
                    required: true
                },
                fullEmail: {
                    required: true
                },
            },
            messages: {
                fullName: {
                    required: 'informe seu nome'
                },
                fullEmail: {
                    required: 'informe o e-mail'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_USUARIO,
                    data: formData,
                    success: function (formData) {
                        Swal.fire(
                            'Bom trabalho!',
                            'Usuario salvo com suceso!',
                            'success'
                        )
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        })
    }

    var alteraNovaSenha = function () {
        $("#formAlterarSenha").validate({
            rules: {
                password: {
                    required: true
                },
                newpassword: {
                    required: true
                },
                renewpassword: {
                    required: true
                }
            },
            messages: {
                password: {
                    required: 'Informe a sua senha'
                },
                newpassword: {
                    required: 'Informe a nova senha'
                },
                renewpassword: {
                    required: 'Informe novamente a senha'
                },
            },
            errorClass: "text-danger",
            submitHandler: function (form) {
                var formData = $(form).serializeArray();

                $.ajax({
                    method: 'POST',
                    url: URL_SALVAR_ALTERAR_SENHA,
                    data: formData,
                    success: function (formData) {
                        Swal.fire(
                            'Good job!',
                            'You clicked the button!',
                            'success'
                        )
                    },
                    error: function (jqXHR, exception) {
                        console.log("Ocorreu um erro no servidor");
                    }
                });
            }
        })
    }


    return {
        init: function () {
            init();
        },
        voltar: function () {
        }
    }

}
()