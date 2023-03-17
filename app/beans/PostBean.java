package beans;

import beans.search.UsuarioBean;
import models.Post;

import java.util.Date;
import java.util.List;

public class PostBean {

    private Long id;

    public String dataFmt;

    private String titulo;

    private String descricao;

    public UsuarioBean autor;

    public Post post;

    public Boolean possuiFoto = Boolean.FALSE;

    public Date data = new Date();

    public List<ComentarioBean> comentarios;

    public String getDataFmt() {
        return dataFmt;
    }

    public List<ComentarioBean> getComentarios() {
        return comentarios;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Boolean getPossuiFoto() {
        return possuiFoto;
    }

    public void setPossuiFoto(Boolean possuiFoto) {
        this.possuiFoto = possuiFoto;
    }

    public void setComentarios(List<ComentarioBean> comentarios) {
        this.comentarios = comentarios;
    }

    public void setDataFmt(String dataFmt) {
        this.dataFmt = dataFmt;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
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

    public UsuarioBean getAutor() {
        return autor;
    }

    public void setAutor(UsuarioBean autor) {
        this.autor = autor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
