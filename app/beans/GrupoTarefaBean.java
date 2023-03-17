package beans;

import java.util.List;

public class GrupoTarefaBean {

    public Long id;

    public String descricao;

    public String cor;

    public List<TarefaBean> tarefas;

    public GrupoTarefaBean() {
    }

    public List<TarefaBean> getTarefas() {
        return tarefas;
    }

    public void setTarefas(List<TarefaBean> tarefas) {
        this.tarefas = tarefas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }
}
