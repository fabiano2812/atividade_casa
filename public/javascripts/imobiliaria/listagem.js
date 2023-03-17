var Listagem = function (){
    const URL_VISUALIZAR_LISTAGEM_IMOBILIARIA = '/imobiliaria/visualizar/listagem';

    var visualizar = function (id){
        $.ajax({
            method: 'POST',
            url: URL_VISUALIZAR_LISTAGEM_IMOBILIARIA,
            data: {
                id: id
            },
            success: function (html) {
                Popup.show({
                    title: 'Listagem',
                    content: html,
                    aoAbrir: () =>{
                    }
                })
            }
        });
    }
    return{
        abrirPopup: function (id){
            visualizar(id);
        }
    }
}()