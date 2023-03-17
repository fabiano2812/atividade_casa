if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
  var GenericComponents = function () {

    var init = function () {
      // DATE PICKER
      var $datePickers = $('.datepicker');

      if ($datePickers.length) {
        $datePickers.inputmask(undefined, { "clearIncomplete": true });

        $datePickers.datepicker({
          language: 'pt-BR',
          format: 'dd/mm/yyyy',
          orientation: "bottom left",
          autoclose: true,
          //todayBtn: true, comentado por conflito com componente de mascara
          clearBtn: true,
          todayHighlight: true,
          showOnFocus: true,
          assumeNearbyYear: true,
          templates: {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
          }
        });

        $datePickers.parent('.input-group').on('click', '.input-group-append', function(e){
          e.preventDefault();
          $(this).parent('.input-group').find('.datepicker').datepicker('show');
        });
      }

      var $timePickers = $('.timepicker');

      if ($timePickers.length) {
        $timePickers.inputmask(undefined, { "clearIncomplete": true });

        // FIXME: Desabilitamos o timepicker devido a formatação incorreta na máscara

        // $timePickers.timepicker({
        //     minuteStep: 1,
        //     showMeridian: false,
        //     explicitMode: true
        // });
        //
        // $timePickers.parent('.input-group').on('click', '.input-group-append', function(e){
        //     e.preventDefault();
        //     $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
        // });
      }

      // COLOR INPUT
      var $colorInputs = $('.color-input');

      if ($colorInputs.length) {
        $colorInputs.minicolors({
          position: 'bottom right',
          theme: 'bootstrap'
        });
      }

      // DECIMAL INPUT
      var $decimalInputs = $('.decimal-input');

      if ($decimalInputs.length) {
        $decimalInputs.maskMoney({
          thousands:'.',
          decimal:',',
          allowZero: true,
          affixesStay: false
        });
      }

      // INTEGER INPUT
      var $integerInputs = $('.integer-input');

      if ($integerInputs.length) {
        $integerInputs.on('input blur paste', function(){
          $(this).val($(this).val().replace(/\D/g, ''))
        });
      }

      // SPINNER INPUT
      $(".spinner-input").each(function() {
        var $input = $(this);
        var min = $input.data("min");
        var max = $input.data("max");

        if (!min) {
          min = 0;
        }

        if (!max) {
          max = 999999;
        }

        $input.TouchSpin({
          min: min,
          max: max,
          buttondown_class: "btn btn-secondary",
          buttonup_class: "btn btn-secondary",
          firstclickvalueifempty: min
        });
      });

      // MASK INPUT
      var $maskInputs = $('.mask-input');

      if ($maskInputs.length) {
        $maskInputs.inputmask(undefined, { "clearIncomplete": true });
      }

      // CLIPBOARD



      var clipboard = new ClipboardJS('[data-clipboard=true]');

      clipboard.on('success', function(e) {
        SnackBar.show("Copiado!", 4000);
      });
    };

    return {
      init: function () {
        init();
      }
    }

  }();
}
