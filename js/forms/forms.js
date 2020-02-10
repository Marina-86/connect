(function() {

  var app = {

    initialize : function () {
    this.modules();
    this.setUpListeners();
    },

    modules: function () {

    },

    setUpListeners: function () {
      $('form').on('submit', app.submitForm);

    },

    submitForm: function (e) {
      e.preventDefault();// меняет действие функции по умолчанию

      var form = $(this);

      if(app.validateForm(form) === false) return false; // метод будет проверять валидна форма или нет
      console.log('go in ajax');
    },

    validateForm: function (form){
      var input = form.find('input');
        valid = true; // по умолчанию форма валидна

      inputs.tooltip('destroy');

      $.each(inputs, function(index, val) {
        var input = $(val),
          val = input.val(),
          formGroup = input.parents('.form-group'),
          label = formGroup.find('label').text().toLowerCase(),
          textError = 'Введите '+ label;

        if(val.length===0){ // емли пользователь ничего не ввел
          formGroup.addClass('.form-control:invalid').removeClass('.form-control:valid'); // класс от bootstrap при ошибке
          input.tooltip({ // инициализация tooltip
            trigger: 'manual', // tooltip вызывается по команде
            placement: 'right', // показывать tooltip справа
            title: textError // текст выводимый в tooltip
          }).tooltip('chow'); // показать tooltip
          valid = false
        }else{
          formGroup.removeClass('.form-control:invalid').addClass('.form-control:valid');
          input.tooltip('hide');
        }

        return valid;
      });
    }

  }

  app.initialize();

}());
