package models;

import org.hibernate.envers.Audited;
import play.db.jpa.JPA;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comentario_post")
public class ComentarioPost extends BaseEntidade{

    public ComentarioPost() {
    }

    public ComentarioPost(Long id) {
        this.id = id;
    }

    @Id
    @SequenceGenerator(name = "seq_comentario_post", sequenceName = "seq_comentario_post", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_comentario_post")
    public Long id;

    public String descricao;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    public Usuario autor;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    public Post post;

    public static List<ComentarioPost> buscarTodosComentariosPor(Post post){
        Query query = JPA.em().createQuery("SELECT cp FROM ComentarioPost cp WHERE cp.post = :post ORDER BY cp.id ASC ");
        query.setParameter("post", post);
        return query.getResultList();
    }

    public static ComentarioPost buscarComentarioMaisRecentePor(Post post){
        Query query = JPA.em().createQuery("SELECT cp FROM ComentarioPost cp WHERE cp.post = :post ORDER BY cp.id DESC ");
        query.setMaxResults(1);
        query.setParameter("post", post);
        return (ComentarioPost) query.getSingleResult();
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

    public Usuario getAutor() {
        return autor;
    }

    public void setAutor(Usuario autor) {this.autor = autor;}

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
