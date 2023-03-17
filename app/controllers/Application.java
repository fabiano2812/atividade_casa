package controllers;

import models.Usuario;
import play.db.jpa.Transactional;
import play.mvc.Controller;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;
import security.AppSecurity;

import static security.AppSecurity.USUARIO_LOGADO;

@Security.Authenticated(AppSecurity.class)
public class Application extends Controller {

    @Transactional
    public static Usuario obterUsuarioLogado() {
        try {
            String strId = Http.Context.current().session().get(USUARIO_LOGADO);
            return Usuario.buscarPorId(Long.valueOf(strId));
        } catch (Throwable e){
            return null;
        }

    }
    @Transactional
    public Result inicio() {
        return ok(views.html.inicio.render());
    }

    @Transactional
    public Result dashboard() {
        return ok(views.html.dashboard.render());
    }
}
