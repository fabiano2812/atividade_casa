package models;

import exceptions.BaseException;
import org.hibernate.envers.Audited;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.List;

@Audited
@Entity
public class GrupoTarefa extends BaseEntidade{

    @Id
    @SequenceGenerator(name = "seq_grupo_tarefa", sequenceName = "seq_grupo_tarefa", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_grupo_tarefa")
    public Long id;

    public String descricao;

    public String cor;

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

    public static List<GrupoTarefa> buscarGruposTarefas(){
        Query query = JPA.em().createQuery("SELECT g FROM GrupoTarefa g ");
        return query.getResultList();
    }

    public static GrupoTarefa buscarPorId(Long Id){
        Query query = JPA.em().createQuery("SELECT g FROM GrupoTarefa g WHERE g.id = :id ");
        query.setParameter("id", Id);
        return (GrupoTarefa) query.getSingleResult();
    }

}
