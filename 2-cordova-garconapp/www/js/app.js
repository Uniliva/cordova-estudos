$('.collection-item').on('click', function () {


    var $badge = $('.badge', this);
    if ($badge.length == 0) {
        $badge = $('<span class="badge brown-text">0</span>')
            .appendTo(this);
    }
    $badge.text(parseInt($badge.text()) + 1);

    ///mostra um mensagem rapida
    var nomeProduto = this.firstChild.textContent;
    Materialize.toast(nomeProduto + ' adicionado', 1000);
});

$('.collection').on('click', ".badge", function () {
    this.remove();
    return false;
});

$('#btn-confirmar').on('click', function () {
    var texto = '';
    $('.badge').parent().each(function () {
        var produto = this.firstChild.textContent;
        var quantidade = this.lastChild.textContent;
        texto += quantidade + " : " + produto + ",";
    });

    $('#resumo').text(texto);
});

$('.modal-trigger').leanModal();

$('.acao-limpar').on('click', function () {
    $('#numero-mesa').val('');
    $('.badge').remove();
});

$('.scan-qrcode').click(function(){
    cordova.plugins.barcodeScanner.scan(function (resultado){     
        if(resultado.text){ 
            Materialize.toast('Mesa ' + resultado.text, 2000);
            $('#numero-mesa').val(resultado.text);     
        }
    },function(erro){
        Materialize.toast(erro,2000,"red-text");
    });
});

$(".acao-finalizar").click(function(){
    $.ajax({
        url: "https://cozinha.herokuapp.com/novo-pedido",
        data: {
            mesa:$("#numero-mesa").val(),
            pedido:$("#resumo").text()
        },
        success: function(resposta){ 
            Materialize.toast(resposta,2000);
            $("#numero-mesa").val(" ");
            $(".badge").remove();
        },
        error: function(erro){
            Materialize.toast(erro.responseText,2000,"red-text");
        }
      });
});