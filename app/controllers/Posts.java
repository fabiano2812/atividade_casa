package controllers;

import beans.ComentarioBean;
import beans.FiltroPostBean;
import beans.PostBean;
import beans.search.SearchResult;
import beans.search.UsuarioBean;
import models.ComentarioPost;
import models.Post;
import models.Usuario;
import play.data.DynamicForm;
import play.data.Form;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import security.AppSecurity;
import utils.DateUtil;
import utils.UploadUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Security.Authenticated(AppSecurity.class)
public class Posts extends Controller {

    private static Form<FiltroPostBean> formFiltro = Form.form(FiltroPostBean.class);

    @Transactional
    public Result acessarPost() throws Throwable {
        try {
            Usuario usuario = Application.obterUsuarioLogado();
            return ok(views.html.redeSocial.inicio.render(usuario));
        } catch (Exception e) {
            return badRequest();
        }
    }

    @Transactional
    public Result salvar() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strTitulo = dynamicForm.get("titulo");
            String strDescricao = dynamicForm.get("descricao");

            Usuario usuario = Application.obterUsuarioLogado();
            Post post = new Post();
            post.setTitulo(strTitulo);
            post.setDescricao(strDescricao);
            post.setAutor(usuario);
            post.setData(new Date());
            post.setPossuiFoto(false);
            post = (Post) post.alterar();

            Http.MultipartFormData body = request().body().asMultipartFormData();
            play.mvc.Http.MultipartFormData.FilePart arquivo = body.getFile("anexos");

            if (arquivo != null) {

                post.setPossuiFoto(true);

                java.io.File file = arquivo.getFile();

                byte[] arquivoByte = UploadUtil.getBytesFromFile(file);

                //cria a pasta
                String caminhoDiretorio = "C:/App/Post/" + post.getId();

                File diretorio = new File(caminhoDiretorio);

                boolean existe = diretorio.exists();

                // Se a pasta não existir
                if (existe == false) {
                    //cria diretorio (pastas)
                    diretorio.mkdirs();
                }

                //salva o arquivo
                File arquivoFisico = new File(caminhoDiretorio + "/imagem.jpg");
                FileOutputStream fileOutputStream = new FileOutputStream(arquivoFisico);
                fileOutputStream.write(arquivoByte);
                fileOutputStream.flush(); //força que o conteudo seja efectivamente escrito
                fileOutputStream.close(); //serve para fechar e liberar imediatamente um objeto
            }


            return ok();
        } catch (Exception e) {
            return badRequest();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return badRequest();
        }
    }

    @Transactional
    public Result buscarTodos() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strPagina = dynamicForm.get("pagina");
            String palavraChave = dynamicForm.get("palavraChave");
            Integer pagina = Integer.valueOf(strPagina);

            List<Post> posts = Post.buscarTodosPosts(pagina, palavraChave);


            List<PostBean> listapost = new ArrayList<>();
            for (Post post : posts) {
                PostBean bean = new PostBean();
                bean.setId(post.getId());
                bean.setData(post.getData());
                bean.setDataFmt(DateUtil.formataData(post.getData()));

                UsuarioBean usuarioBean = new UsuarioBean();
                if (post.getAutor() != null) {
                    usuarioBean.setNome(post.getAutor().getNome());
                    usuarioBean.setEmail(post.getAutor().getEmail());
                }

                bean.setAutor(usuarioBean);
                bean.setDescricao(post.getDescricao());
                bean.setTitulo(post.getTitulo());
                bean.setPossuiFoto(post.getPossuiFoto());
                listapost.add(bean);
            }
            return ok(Json.toJson(listapost));
        } catch (Exception e) {
            return badRequest();
        }
    }


    @Transactional
    public Result salvarComentario() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("postId");
            String cometario = dynamicForm.get("comentario");
            Long id = Long.valueOf(strId);

            Post post = Post.buscarPorId(id);

            Usuario usuario = Application.obterUsuarioLogado();

            ComentarioPost comentarioPost = new ComentarioPost();
            comentarioPost.setAutor(usuario);
            comentarioPost.setDescricao(cometario);
            comentarioPost.setPost(post);
            comentarioPost = (ComentarioPost) comentarioPost.alterar();

            ComentarioBean bean = new ComentarioBean();
            bean.setDescricao(comentarioPost.getDescricao());
            bean.setNome(comentarioPost.getAutor().getNome());
            bean.setId(comentarioPost.getId());

            return ok(Json.toJson(bean));
        } catch (Exception e) {
            return badRequest();
        } catch (Throwable throwable) {
            throwable.printStackTrace();
            return badRequest();
        }
    }

    @Transactional
    public Result buscarComentarios() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long id = Long.valueOf(strId);

            Post post = Post.buscarPorId(id);

            List<ComentarioPost> comentarioPost = ComentarioPost.buscarTodosComentariosPor(post);

            List<ComentarioBean> list = new ArrayList<>();

            for (ComentarioPost comentario : comentarioPost) {
                ComentarioBean bean = new ComentarioBean();
                bean.setId(comentario.getId());
                bean.setNome(comentario.getAutor().getNome());
                bean.setDescricao(comentario.getDescricao());
                list.add(bean);
            }

            return ok(Json.toJson(list));
        } catch (Exception e) {
            return badRequest();

        }
    }

    @Transactional
    public Result buscarImg(Long id) {
        try {
            Post post = (Post) Post.buscarPorId(Post.class, id);

            if (post == null) {
                return badRequest();
            }
            File arquivoFisico = post.recuperarArquivoSalvo();

            if (!arquivoFisico.exists()) {
                return ok();
            }
            byte[] foto = UploadUtil.getBytesFromFile(arquivoFisico);
            return ok(foto);
        } catch (Exception e) {
            return badRequest();
        }
    }

}
