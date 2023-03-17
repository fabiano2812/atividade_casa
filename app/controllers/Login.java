package controllers;

import beans.search.LoginBean;
import beans.search.UsuarioBean;
import exceptions.EmailJaUtilizadoException;
import models.Usuario;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import security.AppSecurity;

public class Login extends Controller {

    public Result abrirPaginaInicial() {
        session().clear();
        return ok(views.html.login.login.render());
    }
    @Transactional
    public Result acessoLogin() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strEmail = dynamicForm.get("email");
            String strSenha = dynamicForm.get("senha");

            Usuario usuario = Usuario.buscarUsuarioPorEmailSenha(strEmail, strSenha);

            if(usuario != null){
                session().put(AppSecurity.USUARIO_LOGADO, usuario.getId().toString());
                return ok(Json.toJson(usuario));
            }else {
                return ok();
            }
        } catch (Exception e) {
            return badRequest();
        }
    }

    @Transactional
    public Result salvarDadosDoFormulario(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strNome = dynamicForm.get("nome");
            String strEmail = dynamicForm.get("email");
            String strSenha = dynamicForm.get("senha");

            Boolean emailExistente = Usuario.verificarSeEmailJaEstaUtilizado(strEmail);

            if (emailExistente){
                throw new EmailJaUtilizadoException();
            }

            Usuario usuario = new Usuario();
            usuario.setEmail(strEmail);
            usuario.setSenha(strSenha);
            usuario.setNome(strNome);
            usuario = (Usuario) usuario.alterar();

            session().put(AppSecurity.USUARIO_LOGADO, usuario.getId().toString());

            return ok(Json.toJson(usuario));

        } catch (Exception e){
            if (e instanceof EmailJaUtilizadoException){
                return badRequest(e.getClass().getSimpleName());
            }
            return badRequest();
        }
    }
}
