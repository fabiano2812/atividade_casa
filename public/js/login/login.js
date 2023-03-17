var Login = function (){

    var init = function (){
        validacaoLoguin();
    }
    var validacaoLoguin = function (){
        $('#formLoguin').validate({
            ignore: 'input[type=hidden]',
            rules:{
                email: {
                    required: true
                },
                senha: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Informe o Email'
                },
                senha: {
                    required: 'Informe a Senha'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
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
                if(resposta) {
                    // se resposta tiver algum conteúdo
                    SnackBar.show("Bem vindo!", 5000);
                    window.location.href = "http://localhost:9000/pessoas";
                } else {
                    // se resposta vier vazia
                    console.log('Usuário não econtrado')
                    Swal.fire({
                        title:"Usuário não encontrado"
                    }).then((result)=>{
                    })
                }
            },
            error: function (jqXHR, exception) {
                console.log("Ocorreu um erro no servidor")
            }
        });
    }
    return{
        init: function (){
            init();
        }
    }



}()