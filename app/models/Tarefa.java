package models;

import org.hibernate.envers.Audited;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.List;

@Audited
@Entity
public class Tarefa extends BaseEntidade{

    @Id
    @SequenceGenerator(name = "seq_tarefas", sequenceName = "seq_tarefas", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_tarefas")
    public Long id;

    public String descricao;

    public Boolean concluida = Boolean.FALSE;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "grupo_id")
    public GrupoTarefa grupo;

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

    public Boolean getConcluida() {
        return concluida;
    }

    public void setConcluida(Boolean concluida) {
        this.concluida = concluida;
    }

    public GrupoTarefa getGrupo() {
        return grupo;
    }

    public Tarefa() {
    }

    public void setGrupo(GrupoTarefa grupo) {
        this.grupo = grupo;
    }

    public static Tarefa buscarPorId(Long Id){
        Query query = JPA.em().createQuery("SELECT t FROM Tarefa t WHERE t.id = :id ");
        query.setParameter("id", Id);
        return (Tarefa) query.getSingleResult();
    }

    public static List<Tarefa> buscarTarefasPorGrupo(GrupoTarefa grupo){
        Query query = JPA.em().createQuery("SELECT t FROM Tarefa t JOIN t.grupo g where t.grupo = :grupo ");
        query.setParameter("grupo", grupo);
        return query.getResultList();
    }
    public static List<Tarefa> buscarTarefaPorId(Long Id){
        try {
            Query query = JPA.em().createQuery("SELECT t FROM Tarefa t WHERE t.grupo.id = :id");
            query.setParameter("id", Id);
            return query.getResultList();
        } catch (Exception e){
            return null;
        }

    }

}
