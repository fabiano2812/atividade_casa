var Post = function () {

    const URL_PUBLICAR_DADOS_DO_FORMULARIO = '/rede-social/post/salvar'
    const URL_BUSCAR_PUBLICACAO = '/rede-social/posts/publicacoes'
    const URL_PUBLICAR_COMENTARIO = '/rede-social/post/publicar/comentario'
    const URL_BUSCAR_COMETARIOS = '/rede-social/buscar/comentarios'

    let idGeral;

    var init = function (id) {
        idGeral = id
        validarDadosPublicacao();
        buscarTodasAsPublicacoes(1);
        iniciarPesquisaPublicacao()
    }

    var buscarTodasAsPublicacoes = function (pagina) {
        $('#btn-carregar-' + (pagina - 1)).remove(); // depois que ele adiciona a segunda pagina ele remove o botão

        var textoPesquisa = $('#input-pesquisa').val();

        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_PUBLICACAO,
            data: {
                pagina: pagina,
                comentaio: comentario,
                palavraChave: textoPesquisa,
            },
            success: function (posts) {
                    if (posts.length > 0) {// se o tamanho da minha lista for maior que 0

                        var areaPaginaHtml = '<div id="pagina-' + pagina + '" ></div>';
                        areaPaginaHtml += '<div class="text-center">' // lembrar centraliza text=center
                        areaPaginaHtml += ' <button type="button" id="btn-carregar-' + pagina + '" class="btn btn-success mt-2" onclick="Post.buscarTodasAsPublicacoes(' + (pagina + 1) + ')">Carregar +</button>'
                        // vai caregar a nova pagina. a primeira pagina ta caregada ele coloca ( + 1) para adicionar valor e valer a pagina 2
                        areaPaginaHtml += '</div>'


                        $("#gerar_postPublicadas").append(areaPaginaHtml); // append adiciona um novo valor dentro de uma chave existente ou objeto. adiciona uma nova pagina na minha div
                        var html = gerarCardsPosts(posts); // gerar minha lista de post dentro da estrutura html
                        $('#pagina-' + pagina).html(html); //vou gerar minha estrutura html dentro da div

                        for (const post of posts) {
                            $("#formComentario-" + post.id).validate({
                                ignore: 'input[type=hidden]',
                                rules: {
                                    comentario: {
                                        required: true
                                    },
                                },
                                messages: {
                                    comentario: {
                                        required: 'Informe o Comentario'
                                    },
                                },
                                errorClass: "invalid-feedback-error text-danger",
                                submitHandler: function (form) {
                                    publicarComentario(post.id);
                                }
                            })
                        }
                    }

            }
        })
    }

    var iniciarPesquisaPublicacao = function () {
        $('#formPesquisarPublicacao').validate({
            ignore: 'input[type=hidden]',
            rules: {
                tituloPesquisa: {
                    required: true
                }
            },
            messages: {
                tituloPesquisa: {
                    required: 'Informe a pesquisa'
                }
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function () {
                $("#gerar_postPublicadas").html('');
                buscarTodasAsPublicacoes(1);
            },
        })
    }


    var gerarCardsPosts = function (posts) {
        var html = '<section class="section">';
        html += ' <div class="row">'

        for (const post of posts) {
            html += '<div class="col-md-8 m-auto">'
            html += '      <div class="card grupo-post-card" data-tarefaid="' + post.id + '" >'
            html += '            <div class="card-body">'
            html += '                 <div class="teste">'
            if (post.autor.nome) {
                html += '                     <div class="card-header">' + post.dataFmt + ' - ' + post.autor.nome + '</div>'
            }
            html += ' </div>'

            html += '                                   <h5 class="card-title">' + post.titulo + '</h5>'
            html += '                                   <p>' + post.descricao + '</p>'
            if (post.possuiFoto) {
                html += '                           <img src="/post/imagem/' + post.id + '" alt="Girl in a jacket" width="100%" height="400px"> '
            }
            html += '                      <form id="formComentario-' + post.id + '">'
            html += '                         <input type="text" name="comentario" id="comentario" class="form-control col-md-11 mt-2"  placeholder="Comentar"> '
            html += '                         <input type="hidden" name="postId" value="' + post.id + '" class="form-control" placeholder="Comentar"> '
            html += '                      </form>'
            html += '                 <a type="button" id="comentarios" onclick="Post.verComentarios(' + post.id + ')">Ver Comentarios</a>'
            html += '                       </div>'
            html += '              <div>'
            html += '                <input type="hidden" name="postId" value="' + post.id + '" class="form-control" placeholder="Comentar"> '
            html += '                  <div id="teste2-"' + post.id + '>'
            html += '                     <div class="gerar-comentarios-' + post.id + '">'
            html += '                  </div>'
            html += '               </div>'
            html += '           </div>'
            html += '     </div>'
            html += '</div>'
        }
        html += '  </div>'
        html += '</section>'
        return html;
    }

    var validarDadosPublicacao = function () {
        $('#formEditarFormulario').validate({
            ignore: 'input[type=hidden], input[type=file]',
            rules: {
                titulo: {
                    required: true
                },
                descricao: {
                    required: true
                },
            },
            messages: {
                titulo: {
                    required: 'Informe o Titulo'
                },
                descricao: {
                    required: 'Informe a Descrição'
                },
            },
            errorClass: "invalid-feedback-error text-danger",
            submitHandler: function (form) {
                var formData = new FormData($(form)[0]);
                salvarEpublicar(formData);
            }
        })
    }

    var salvarEpublicar = function (dadosFormulario) {
        $.ajax({
            method: 'POST',
            url: URL_PUBLICAR_DADOS_DO_FORMULARIO,
            data: dadosFormulario,
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            success: function () {
                buscarTodasAsPublicacoes(1, null)
            },
            error: function (jqXHR, exception) {
                var textoErro = 'Algo deu errado, tente novamente mais tarde'

                if (jqXHR.responseText === "EmailJaUtilizadoException") {
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

    var publicarComentario = function (id) {
        var formData = $('#formComentario-' + id).serializeArray();
        $.ajax({
            method: 'POST',
            url: URL_PUBLICAR_COMENTARIO,
            data: formData,
            success: function () {
                document.getElementById("comentario").value = "";
                comentarios(id);
            },
            error: function (jqXHR, exception) {
                Swal.fire({
                    title: 'Oops!',
                    text: textoErro,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        });
    }

    var comentarios = function (id) {
        var comentario = $('#comentario').val();
        $.ajax({
            method: 'POST',
            url: URL_BUSCAR_COMETARIOS,
            data: {
                id: id,
                comentario: comentario,
            },
            success: function (comentarios) {
                var html = '<section class="section">';
                html += ' <div class="card-footer">'
                html += ' <h6 id="respostaComentarios" class="fw-bold">Comentarios</h6>'
                for (const comentario of comentarios) {
                    html += '<p>' + comentario.nome + ' : ' + comentario.descricao + '</p>'
                }
                html += '</div>'
                $('.gerar-comentarios-' + id).html(html);
            }
        })
    }
    var voltarPaginaInicial = function (){
        $("#gerar_postPublicadas").html('');
        $('#input-pesquisa').val('');
        buscarTodasAsPublicacoes(1);
    }


    return {
        init: function (id) {
            init(id);
        },
        verComentarios: function (id) {
            comentarios(id);
        },
        buscarTodasAsPublicacoes: function (pagina) {
            buscarTodasAsPublicacoes(pagina);
        },
        voltarInicio: function (){
            voltarPaginaInicial();
        }
    }
}()