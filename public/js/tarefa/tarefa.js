var NovaTarefas = function () {

    var URL_SALVAR_TAREFA = '/tarefa/salvar'
    var URL_BUSCAR_TAREFAS = '/grupoTarefa/buscar/tarefa'
    var URL_TAREFA_CONCLUIDA = 'tarefa/concuida'
    var URL_BUSCAR_TAREFAS_CONCLUIDAS = '/tarefa/buscar/concluidas'
    var URL_BUSCAR_TAREFAS_CONCLUIDAS_INICIO = '/tarefa/buscar'
    var grupoId;

    var init = function (id) {
        grupoId = id;
        buscarTarefasNaoConcluidas();
        validarFormularioTarefa();
        buscarTarefasConcluidas();
    }

    var buscarTarefasNaoConcluidas = function () {
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_TAREFAS,
            data: {
                grupoId: grupoId,
            },
            success: function (tarefa) {

                var html = '<section class="section">';
                html += ' <div class="row">'
                for (const tarefaPublicadas of tarefa) {
                    if (tarefaPublicadas.concluida === false) {
                        html += '   <div class="col-md-12">'
                        html += '<input type="checkbox" name="concluido" value="publicado" id="' + tarefaPublicadas.id + '">'
                        html += '      <div class="card grupo-tarefa-card" data-tarefaid="' + tarefaPublicadas.id + '" >'
                        html += '        <div class="card tarefa-card">'
                        html += '          <div class="card-body">'
                        html += '                <div>'
                        html += '                   <div class="teste">'
                        html += '                       <h5 class="card-title">' + tarefaPublicadas.descricao + '</h5>'
                        html += '                   </div>'
                        html += '                 </div>'
                        html += '            </div>'
                        html += '        </div>'
                        html += '      </div>'
                        html += '  </div>'
                    }
                }
                html += '  </div>'
                $("#gerar_tarefasPublicadas").html(html);
                $('input:checkbox').change(
                    function () {
                        var id = $(this).attr("id");
                        var value = $(this).attr("value");
                        var dadosTarefa = {
                            tarefaId: id,
                            concluido: $(this).is(':checked')
                        }
                        salvarTarefaConcluida(dadosTarefa)
                    });
                $(".grupo-tarefa-card").click(function (e) {
                    var elemento = $(e.currentTarget);
                    var id = elemento.data("tarefaid");
                    editarTarefa(id);
                });
            }
        })
    }

    var salvarTarefaConcluida = function (lista) {
        $.ajax({
            method: 'POST',
            url: URL_TAREFA_CONCLUIDA,
            data: lista,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (tarefaConcluido) {
                buscarTarefasNaoConcluidas();
                buscarTarefasConcluidas();
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

    var buscarTarefasConcluidas = function () {
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_TAREFAS_CONCLUIDAS_INICIO,
            data: {
                id: grupoId,
            },
            success: function (tarefa) {

                var html = '<section class="section">';
                html += ' <div class="row">'
                for (const tarefaConcuidas of tarefa) {
                    if (tarefaConcuidas.concluida === true) {
                        html += '   <div class="col-md-12">'
                        html += '<input type="checkbox" name="concluido" value="publicado" checked id="' + tarefaConcuidas.id + '">'
                        html += '      <div class="card grupo-tarefa-card" data-tarefaid="' + tarefaConcuidas.id + '" >'
                        html += '        <div class="card tarefa-card">'
                        html += '          <div class="card-body">'
                        html += '               <div>'
                        html += '                  <div class="teste">'
                        html += '                      <h5 class="card-title">' + tarefaConcuidas.descricao + '</h5>'
                        html += '                  </div>'
                        html += '                 </div>'
                        html += '            </div>'
                        html += '        </div>'
                        html += '      </div>'
                        html += '  </div>'
                    }
                }
                html += '  </div>'
                $("#gerar_tarefasConcluido").html(html);
                $('input:checkbox').change(
                    function () {
                        var id = $(this).attr("id");
                        var value = $(this).attr("value");
                        var dadosTarefa = {
                            tarefaId: id,
                            concluido: $(this).is(':checked')
                        }
                        salvarTarefaConcluida(dadosTarefa)
                    });
            }
        })
    }

    var gerarTarefaConcluido = function (tarefaConcluido) {
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_TAREFAS_CONCLUIDAS,
            data: tarefaConcluido,
            success: function (tarefa) {

                var html = '<section class="section">';
                html += ' <div class="row">'
                for (const tarefaConcuidas of tarefa) {
                    html += '   <div class="col-md-12">'
                    html += '      <div class="card grupo-tarefa-card" data-tarefaid="' + tarefaConcuidas.id + '" >'
                    html += '        <div class="card tarefa-card">'
                    html += '          <div class="card-body">'
                    html += '               <div>'
                    html += '                  <div class="teste">'
                    html += '                      <h5 class="card-title">' + tarefaConcuidas.descricao + '</h5>'
                    html += '                  </div>'
                    html += '                 </div>'
                    html += '            </div>'
                    html += '        </div>'
                    html += '      </div>'
                    html += '  </div>'
                }

                html += '  </div>'
                $("#gerar_tarefasConcluido").html(html);
            }
        })
    }

    var editarTarefa = function (id) {
        window.location.href = "http://localhost:9000/editarTarefa?tarefaId=" + id;
    }

    var validarFormularioTarefa = function () {
        $('#formTarefa').validate({
            ignore: 'input[type=hidden]',
            rules: {
                tarefa: {
                    required: true
                },
            },
            messages: {
                tarefa: {
                    required: 'Informe uma nova Tarefa'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {

                // recolhendo informações digitadas no formulário
                var formData = $(form).serializeArray();
                //vai pra função salvar os dados preenchidos do formulario
                salvarTarefa(formData)
            }
        });
    }

    var salvarTarefa = function (formData) {
        $.ajax({
            method: 'POST',
            url: URL_SALVAR_TAREFA,
            data: formData,
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
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


    var adicionarNovaTarefa = function (id) {
        window.location.href = "http://localhost:9000/adicionarTarefa?tarefaId=" + id;
    }

    var voltaTelaInicial = function (id) {
        window.location.href = "http://localhost:9000/paginaInicial?tarefaId=" + id;
    }
    var voltarMenu = function (id) {
        window.location.href = "http://localhost:9000/abrirNovaTarefa?tarefaId=" + id;
    }


    return {
        init: function (id) {
            init(id);
        },
        criarTarefa: function (id) {
            adicionarNovaTarefa(id);
        },
        voltar: function (id) {
            voltaTelaInicial(id);
        },
        voltarMenu: function (id) {
            voltarMenu(id);
        },

    }
}()