var Listagem = function () {
    const URL_VISUALIZAR_LISTAGEM = '/pessoa/visualizar/listagem';

    var visualizar = function (id){
        $.ajax({
            method: 'POST',
            url: URL_VISUALIZAR_LISTAGEM,
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