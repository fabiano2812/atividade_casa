package beans;

import beans.search.FiltroBaseBean;
import beans.search.UsuarioBean;
import models.Pessoa;
import models.Usuario;

public class ComentarioBean extends FiltroBaseBean<Pessoa> {

    public Long id;

    public String nome;

    public String descricao;

    public UsuarioBean autor;

    public ComentarioBean() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
