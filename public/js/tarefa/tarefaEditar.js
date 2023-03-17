var TarefaEditar = function (){

    const URL_SALVAR_ALTERACOES_DE_TAREFAS = '/tarefas/salvar/alteracoes'
    const URL_BUSCAR_ID_GRUPO = '/tarefa/buscaId'
    const URL_EXCLUIR_TAREFA = '/excluir/tarefa'

    var init = function (){
        validarEdicao();
    }

    let validarEdicao = function (){
        $('#formEditarFormularioGeral').validate({
            ignore: 'input[type=hidden]',
            rules: {
                tarefaDescricao: {
                    required: true
                },
            },
            messages: {
                tarefaDescricao: {
                    required: 'Informe a Tarefa'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {

                // recolhendo informações digitadas no formulário
                var formData = $(form).serializeArray();
                //vai pra função salvar os dados preenchidos do formulario

                salvarAlteracoesDeTatefas(formData);
            }
        });
    }

    var salvarAlteracoesDeTatefas = function (formData){
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_ALTERACOES_DE_TAREFAS,
            data: formData,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (dadosDaTarefaSalva) {
                Swal.fire({
                    title: "Tudo certo!",
                    text: "Tarefa salvo com sucesso.",
                    icon: "success",
                    confirmButtonText: "ok"
                });
            },
            error: function (jqXHR, exception) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Algo deu errado, tente novamente mais tarde',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }

    let voltaTelaEdicao = function (id){
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_ID_GRUPO,
            data: {
                id: id,
            },
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (beanId) {
                window.location.href = "http://localhost:9000/abrirNovaTarefa?tarefaId=" + beanId.id;
            },
            error: function (jqXHR, exception) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Algo deu errado, tente novamente mais tarde',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }

    var excluirTarefa = function (id){
        $.ajax({
            method: 'POST',
            url: URL_EXCLUIR_TAREFA,
            data: {
                id: id
            },
            success: function (Id) {
                alert('Arquivo excluido com suceso...')
                window.location.href = "http://localhost:9000/abrirNovaTarefa?tarefaId=" + Id.id;
            },
            error: function (jqXHR, exception) {
                console.log("Erro no servidor ao excluir.");
            }
        });
    }


    return{
        init:function (){
            init();
        },
        voltar: function (id){
            voltaTelaEdicao(id);
        },
        excluir: function (id){
            excluirTarefa(id);
        },
    }

}()