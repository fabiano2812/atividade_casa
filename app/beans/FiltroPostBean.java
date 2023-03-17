package beans;

import beans.search.FiltroBaseBean;
import models.Pessoa;
import models.Post;

public class FiltroPostBean extends FiltroBaseBean<Post> {

    public String PalavraChave;

    public String titulo;

    public FiltroPostBean() {
    }

    public String getPalavraChave() {
        return PalavraChave;
    }

    public void setPalavraChave(String palavraChave) {
        PalavraChave = palavraChave;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
}
