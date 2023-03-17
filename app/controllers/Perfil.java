package controllers;
import models.Usuario;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import security.AppSecurity;
import utils.StringUtils;


@Security.Authenticated(AppSecurity.class)
public class Perfil extends Controller {
    public Result inicio() throws Throwable {
        try {
            Usuario usuario = Application.obterUsuarioLogado();
            return ok(views.html.perfil.perfil.render(usuario));
        }catch (Exception e){
            return badRequest();
        }
    }

    @Transactional
    public Result alterarSenha(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();;
           String strId = dynamicForm.get("id");
            String senha = dynamicForm.get("renewpassword");

            Long id = null;

            if (StringUtils.isNotEmpthOrNull(strId)){
                id = Long.valueOf(strId);
            }

            Usuario usuario = Usuario.buscarPorId(id);
            usuario.setSenha(senha);

            usuario = (Usuario) usuario.alterar();

            return ok(Json.toJson(usuario));
        }catch (Exception e){
            return badRequest();
        }
    }

    @Transactional
    public Result salvarDadosUsuario(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            String name = dynamicForm.get("fullName");
            String email = dynamicForm.get("fullEmail");

            Long id = Long.valueOf(strId);

            Usuario usuario = Usuario.buscarPorId(id);
            usuario.setNome(name);
            usuario.setEmail(email);

            usuario = (Usuario) usuario.alterar();

            return ok(Json.toJson(usuario));
        }catch (Exception e){
            return badRequest();
        }
    }
}
