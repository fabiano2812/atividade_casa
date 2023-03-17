package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import security.AppSecurity;


public class Usuarios extends Controller {

    @Security.Authenticated(AppSecurity.class)
    public Result inicio() {
        return ok(views.html.pessoa.inicio.render());
    }

    public Result novoCadastro() {
        return ok(views.html.novoCadastro.novoCadastro.render());
    }

}