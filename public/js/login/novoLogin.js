var NovoLogin = function (){

    var init = function (){
        validarNovoCadastro();
    }


    //Validar formulado novo login
    var validarNovoCadastro = function (){
        $('#formNovoLoguin').validate({
            ignore: 'input[type=hidden]',
            rules:{
                nome: {
                    required: true
                },
                email: {
                    required: true
                },
                senha: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o Nome'
                },
                email: {
                    required: 'Informe o E-mail'
                },
                senha: {
                    required: 'Informe a Senha'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {

                var formData = $(form).serializeArray();
                //vai para funcao de login
                login(formData)
            }
        })
    }

    //manda os dados por daynameForm via ajax
    var login = function (dadosDoFormulario){
        $.ajax({
            method: 'POST',
            url: '/acesso/novoLogin',
            data: dadosDoFormulario,
            success: function (resposta) {
                // se resposta tiver algum conteúdo
                SnackBar.show("Bem vindo!", 6000);
                window.location.href = "http://localhost:9000/pessoas";
            },
            error: function (jqXHR, exception) {
                var textoErro =  'Algo deu errado, tente novamente mais tarde'

                if (jqXHR.responseText === "EmailJaUtilizadoException"){
                    textoErro = "Este email já esta sendo utilizado por outro usuario, insira um email diferente";
                }

                Swal.fire({
                    title: 'Oops!',
                    text: textoErro,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }



    return{
        init: function (){
            init();
        }
    }

}()