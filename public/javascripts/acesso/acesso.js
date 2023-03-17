let Acesso = function () {

    /*  const URL_BUSCAR = '/acesso/buscar';
      const URL_SALVAR = '/acesso/salvar ';*/

    var iniciarValidacao = function () {
        $('#formCadastroAcesso').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                senha: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Informe o seu Email',
                    email: 'Informe um email válido'
                },
                senha: {
                    required: 'Informe sua senha'
                }
            },
            errorClass: "text-danger",
            submitHandler: function (form) {

                // recolhendo informações digitadas no formulário
                var formData = $(form).serializeArray();
                login(formData)
            }
        });
    }
    var login = function (dados) {
        $.ajax({
            method: 'POST',
            url: '/acesso/login',
            data: dados,
            success: function (resposta) {
                console.log('resposta do servidor: ', resposta);

                if(resposta) { //mesma coisa se fizer assim if(resposta !== undefined && resposta !== null){}
                    // se resposta tiver algum conteúdo
                    console.log('Usuário encontrado')
                } else {
                    // se resposta vier vazia
                    console.log('Usuário não econtrado')
                }

            },
            error: function (jqXHR, exception) {
                console.log("Ocorreu um erro no servidor")
            }
        });
    }

    return {
        init: function () {
            iniciarValidacao();

        }
    }
}()