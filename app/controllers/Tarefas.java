package controllers;

import beans.RespostaTarefaBean;
import beans.TarefaBean;
import models.GrupoTarefa;
import models.Tarefa;
import play.data.DynamicForm;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import security.AppSecurity;

import java.util.ArrayList;
import java.util.List;

@Security.Authenticated(AppSecurity.class)
public class Tarefas extends Controller {

    @Transactional
    public Result abrirTelaTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("tarefaId");
            Long id = Long.valueOf(strId);
            GrupoTarefa tarefa = GrupoTarefa.buscarPorId(id);

            return ok(views.html.tarefa.inicio.render(tarefa));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result editarTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("tarefaId");
            Long id = Long.valueOf(strId);
            Tarefa tarefa = Tarefa.buscarPorId(id);

            return ok(views.html.tarefa.editar.render(tarefa));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result adicionarTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("tarefaId");

            Long id = Long.valueOf(strId);

            GrupoTarefa tarefa = GrupoTarefa.buscarPorId(id);
            return ok(views.html.tarefa.adicionarTarefa.render(tarefa));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result salvarNovaTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strTarefa = dynamicForm.get("tarefa");
            String strId = dynamicForm.get("id");
            Long id = Long.valueOf(strId);

            GrupoTarefa grupoTarefa = GrupoTarefa.buscarPorId(id);

            Tarefa tarefa = new Tarefa();
            tarefa.setDescricao(strTarefa);
            tarefa.setGrupo(grupoTarefa);
            tarefa = (Tarefa) tarefa.alterar();

            return ok(Json.toJson(tarefa));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result buscarTarefas() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("grupoId");
            Long Id = Long.valueOf(strId);

            List<Tarefa> tarefas = Tarefa.buscarTarefaPorId(Id);

            List<RespostaTarefaBean> listaTarefas = new ArrayList<>();

            if (tarefas != null) {
                for (Tarefa tarefa : tarefas) {
                    RespostaTarefaBean bean = new RespostaTarefaBean();
                    bean.setId(tarefa.getId());
                    bean.setDescricao(tarefa.getDescricao());
                    bean.setConcluida(tarefa.getConcluida());
                    listaTarefas.add(bean);
                }
            }
            return ok(Json.toJson(listaTarefas));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result buscarTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            List<Tarefa> tarefa = Tarefa.buscarTarefaPorId(Id);

            List<RespostaTarefaBean> listaTarefas = new ArrayList<>();

            if (tarefa != null) {
                for (Tarefa tarefas : tarefa) {
                    RespostaTarefaBean bean = new RespostaTarefaBean();
                    bean.setId(tarefas.getId());
                    bean.setDescricao(tarefas.getDescricao());
                    bean.setConcluida(tarefas.getConcluida());
                    listaTarefas.add(bean);
                }
            }
            return ok(Json.toJson(listaTarefas));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result buscarTarefasConcluidas() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            Tarefa tarefa = Tarefa.buscarPorId(Id);

            List<RespostaTarefaBean> listaTarefas = new ArrayList<>();
            RespostaTarefaBean bean = new RespostaTarefaBean();
            bean.setId(tarefa.getId());
            bean.setDescricao(tarefa.getDescricao());
            bean.setConcluida(tarefa.getConcluida());
            listaTarefas.add(bean);

            return ok(Json.toJson(listaTarefas));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result salvarTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String grupoDescricao = dynamicForm.get("tarefaDescricao");
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            Tarefa tarefa = Tarefa.buscarPorId(Id);
            tarefa.setDescricao(grupoDescricao);
            tarefa = (Tarefa) tarefa.alterar();

            return ok();
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result tarefaConcluida() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("tarefaId");
            String strConcluida = dynamicForm.get("concluido");

            Long Id = Long.valueOf(strId);
            Boolean concluido = Boolean.valueOf(strConcluida);

            Tarefa tarefa = Tarefa.buscarPorId(Id);
            tarefa.setConcluida(concluido);
            tarefa = (Tarefa) tarefa.alterar();

            RespostaTarefaBean bean = new RespostaTarefaBean();
            bean.setId(tarefa.getId());
            bean.setDescricao(tarefa.getDescricao());
            bean.setConcluida(tarefa.getConcluida());

            return ok(Json.toJson(bean));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result buscarIdGrupoTarefas() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            Tarefa tarefa = Tarefa.buscarPorId(Id);

            TarefaBean bean = new TarefaBean();
            bean.setId(tarefa.getGrupo().getId());

            return ok(Json.toJson(bean));
        } catch (Exception e) {
            return badRequest();
        }
    }
    @Transactional
    public Result excluirTarefa() {
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            Tarefa tarefa = Tarefa.buscarPorId(Id);
            tarefa.excluir();

            TarefaBean bean = new TarefaBean();
            bean.setId(tarefa.getGrupo().getId());

            return ok(Json.toJson(bean));
        } catch (Exception e) {
            return badRequest();
        }
    }
}
