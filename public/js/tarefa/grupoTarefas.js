var GrupoDeTarefas = function () {

    const URL_SALVAR_GRUPO_TAREFA = '/grupoTarefas/criar'
    const URL_BUSCAR_GRUPO_TAREFAS = '/grupoTarefa/buscar/tudos/gruposTarefas'
    const URL_SALVAR_GRUPO_TAREFA_EDICAO = '/grupoTarefa/salva/editar'
    const URL_EXCLUIR_GRUPO_TAREFA = '/excluir/grupo/tarefa'

    var init = function () {
        gerarGrupoTarefas()
        validarFormularioGrupoTarefas()
        validarEdicaoFormulario()
    }
    var validarEdicaoFormulario = function (){
        $('#formEditarEditarGrupoTarefas').validate({
            ignore: 'input[type=hidden]',
            rules: {
                GrupoDescricao: {
                    required: true
                },
            },
            messages: {
                GrupoDescricao: {
                    required: 'Informe o nome do Grupo de tarefas'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {

                // recolhendo informações digitadas no formulário
                var formData = $(form).serializeArray();
                //vai pra função salvar os dados preenchidos do formulario
                console.log(formData);
                salvarGrupoTarefa(formData)
            }
        });
    }
    var salvarGrupoTarefa = function (formData) {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_GRUPO_TAREFA_EDICAO,
            data: formData,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (GrupoTarefaSalva) {
                console.log(GrupoTarefaSalva)
                Swal.fire({
                    title: "Tudo certo!",
                    text: "Grupo Tarefa salvo com sucesso.",
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

    //Validação do formulario de um novo grupo de tarefas
    var validarFormularioGrupoTarefas = function () {
        $('#formGrupoTarefa').validate({
            ignore: 'input[type=hidden]',
            rules: {
                nome: {
                    required: true
                },
            },
            messages: {
                nome: {
                    required: 'Informe o Titulo da Tarefa'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {

                // recolhendo informações digitadas no formulário
                var formData = $(form).serializeArray();
                //vai pra função salvar os dados preenchidos do formulario
                salvarGrupoTarefas(formData);
            }
        });
    }
    //Salva Informações do formulario
    var salvarGrupoTarefas = function (formData) {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_GRUPO_TAREFA,
            data: formData,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (grupoTarefaSalvos) {
                console.log(grupoTarefaSalvos)
                Swal.fire({
                    title: "Tudo certo!",
                    text: "Grupo salvo com sucesso.",
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
    //Gerar grupo de tarefa na tela inicial
    var gerarGrupoTarefas = function () {
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_GRUPO_TAREFAS,
            data: {},
            success: function (grupos) {

                console.log(grupos)

                var html = '<section class="section">';
                html += ' <div class="row">'
                for (const grupo of grupos) {
                    html += '   <div class="col-md-6">'
                    html += '      <div class="card grupo-tarefa-card" data-grupoid="' + grupo.id + '" >'
                    html += '          <div class="card-body">'
                    html += '             <div  class="' + grupo.id + '">'
                    html += '<div>'
                    html += '<div class="teste">'
                    html += ' <div class="circulo" style="background-color:' + grupo.cor + '"></div>'
                    html += '            <h5 class="card-title">' + grupo.descricao + '</h5>'
                    html += '</div>'
                    html += '</div>'
                    html += '<div>'
                    for (const tarefa of grupo.tarefas) {
                        html += '<div>'
                        html += '<div class="teste2">'
                        html += ' <h6 id="centralizarTarefa"> ' + tarefa.descricao + '</h6>'
                        html += '</div>'
                        html += '</div>'
                    }
                    html += '           </div>'
                    html += '           </div>'
                    html += '           </div>'
                    html += '      </div>'
                    html += '  </div>'
                }
                html += '</div>'
                html += '</section>';

                $("#gerar_grupotarefa").html(html);
                $(".grupo-tarefa-card").click(function (e) {
                    var elemento = $(e.currentTarget);
                    var id = elemento.data("grupoid");
                    adicionarUmaTarefa(id);
                    console.log(id);
                });
            }
        })
    }


    var adicionarUmaTarefa = function (id) {
        window.location.href = "http://localhost:9000/abrirNovaTarefa?tarefaId=" + id;
    }

    var voltar = function () {
        //volta pra tela inicial
        window.location.href = "http://localhost:9000/paginaInicial";
    }


    var addtarefa = function () {
        //Abri a tela pra adicionar uma nova tarefa
        window.location.href = "http://localhost:9000/grupoTarefas";
    }

    var excluirGrupoTarefa = function (id){
        $.ajax({
            method: 'POST',
            url: URL_EXCLUIR_GRUPO_TAREFA,
            data: {
                id: id
            },
            success: function () {
                alert('Arquivo excluido com suceso...')
                window.location.href = "http://localhost:9000/paginaInicial";
            },
            error: function (jqXHR, exception) {
                console.log("Erro no servidor ao excluir.");
            }
        });
    }
    return {
        init: function () {
            init();
        },
        adicionarGrupoTarefa: function () {
            addtarefa();
        },
        voltar: function () {
            voltar();
        },
        excluirGrupoTarfa: function (id){
            excluirGrupoTarefa(id);
        }
    }
}()