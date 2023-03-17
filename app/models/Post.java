package models;

import play.db.jpa.JPA;
import utils.StringUtils;

import javax.persistence.*;
import java.io.File;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "post")
public class Post extends BaseEntidade {

    public Post() {
    }

    public Post(Long id) {
        this.id = id;
    }

    @Id
    @SequenceGenerator(name = "seq_post", sequenceName = "seq_post", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_post")
    private Long id;

    private String titulo;

    private String descricao;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario autor;

    @Column(name = "data")
    @Temporal(TemporalType.TIMESTAMP)
    public Date data = new Date();

    public Boolean possuiFoto = Boolean.FALSE;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public void setAutor(Usuario autor) {
        this.autor = autor;
    }

    public Date getData() {
        return data;
    }

    public Boolean getPossuiFoto() {
        return possuiFoto;
    }

    public void setPossuiFoto(Boolean possuiFoto) {
        this.possuiFoto = possuiFoto;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public static Post buscarPorId(Long id){
        try {
            Query query = JPA.em().createQuery("SELECT p FROM Post p WHERE p.id = :id");
            query.setParameter("id", id);
            return (Post) query.getSingleResult();
        } catch (NoResultException e){
            return null;
        }
    }
    public static List<Post> buscarTodosPosts(Integer pagina, String palavraChave){
            String select = " SELECT p FROM Post p ";
            StringBuffer where = new StringBuffer(" WHERE 1=1 ");

            if (StringUtils.isNotEmpthOrNull(palavraChave)) {
                where.append(" AND UPPER(p.titulo) LIKE :palavraChave");
            }
            Query query = JPA.em().createQuery(select + where + " Order by p.id DESC ");
            query.setFirstResult((pagina - 1) * 2);
            query.setMaxResults(2);
            if (StringUtils.isNotEmpthOrNull(palavraChave)) {
                query.setParameter("palavraChave", "%" + palavraChave.trim().toUpperCase() + "%");
            }
            return query.getResultList();
    }

    public File recuperarArquivoSalvo(){
        return new File("C:/App/Post/" + id + "/" + "imagem.jpg");
    }

    public static List<Post> buscarAutorPorNome(Usuario post){
        try {
            Query query = JPA.em().createQuery("SELECT p FROM Post p JOIN p.post u where u.post = :post ");
            query.setParameter("post", post);
            return query.getResultList();
        } catch (Exception e){
            return null;
        }
    }

}
