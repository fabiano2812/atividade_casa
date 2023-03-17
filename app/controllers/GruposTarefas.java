package controllers;

import beans.GrupoTarefaBean;
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
public class GruposTarefas extends Controller {

    @Transactional
    public Result abrirTelaInicial(){
        try {
            return ok(views.html.grupoTarefa.PaginaInicialGrupoTarefa.render());
        } catch (Exception e){
            return badRequest();
        }
    }
    @Transactional
    public Result abrirGrupoTarefa(){
        try {
            return ok(views.html.grupoTarefa.adicionarTarefa.render());
        } catch (Exception e){
            return badRequest();
        }
    }
    @Transactional
    public Result buscarGrupoTarefas(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("grupoTarefa");

            Long id = Long.valueOf(strId);

            GrupoTarefa tarefa = GrupoTarefa.buscarPorId(id);
            return ok(views.html.grupoTarefa.editarGrupoTarefa.render(tarefa));
        } catch (Exception e){
            return badRequest();
        }
    }
    @Transactional
    public Result criarNovoGrupo(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strTiutuloTarefa = dynamicForm.get("nome");
            String strCor = dynamicForm.get("cor");

            GrupoTarefa grupoTarefa = new GrupoTarefa();
            grupoTarefa.setDescricao(strTiutuloTarefa);
            grupoTarefa.setCor(strCor);
            grupoTarefa = (GrupoTarefa) grupoTarefa.alterar();

            return ok(Json.toJson(grupoTarefa));
        }catch (Exception e){
            e.printStackTrace();
            return badRequest();
        }
    }
    @Transactional
    public Result buscarGrupos(){
        try {
            List<GrupoTarefa> grupos = GrupoTarefa.buscarGruposTarefas();

            List<GrupoTarefaBean> listGrupoTarefas = new ArrayList<>();

            for (GrupoTarefa grupo : grupos){
                GrupoTarefaBean bean = new GrupoTarefaBean();
                bean.setId(grupo.getId());
                bean.setDescricao(grupo.getDescricao());
                bean.setCor(grupo.getCor());

                bean.tarefas = new ArrayList<>();
                List<Tarefa> tarefas = Tarefa.buscarTarefasPorGrupo(grupo);

                /**DEMONSTRACAO**/
                //bean.tarefas.add(new TarefaBean(12L, "Apenas uma tarefa de testes"));
                //bean.tarefas.add(new TarefaBean(14L, "Uma segunda tarefa de teste"));

                for (Tarefa tarefa : tarefas){
                    bean.tarefas.add(new TarefaBean(tarefa.getId(),tarefa.getDescricao()));
                }

                listGrupoTarefas.add(bean);
            }
            return ok(Json.toJson(listGrupoTarefas));
        }catch (Exception e){
            return badRequest();
        }
    }
    @Transactional
    public Result salvarGrupoTarefa(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String grupoDescricao = dynamicForm.get("GrupoDescricao");
            String strCor = dynamicForm.get("cor");
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            GrupoTarefa grupoTarefa = GrupoTarefa.buscarPorId(Id);
            grupoTarefa.setDescricao(grupoDescricao);
            grupoTarefa.setCor(strCor);
            grupoTarefa = (GrupoTarefa) grupoTarefa.alterar();
            return ok();
        }catch (Exception e){
            return badRequest();
        }
    }
    @Transactional
    public Result excluirGrupoTarefa(){
        try {
            DynamicForm dynamicForm = DynamicForm.form().bindFromRequest();
            String strId = dynamicForm.get("id");
            Long Id = Long.valueOf(strId);

            GrupoTarefa grupoTarefa = GrupoTarefa.buscarPorId(Id);
            grupoTarefa.excluir();

            return ok();
        } catch (Exception e){
            return badRequest();
        }
    }
}
