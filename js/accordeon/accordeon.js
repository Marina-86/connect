
$(document).ready(function() {
	$('.accordeon_trigger').on('click', function(e){ //при клике на элемент
		e.preventDefault();
		
		//создаем переменные
		var $this = $(this), //сохранение переменной this хорошая практика
			item = $this.closest('.accordeon_item'), // сохраняем меню верхнего уровня
			list = $this.closest('.accordeon_list'), // сохраняем список
			items = list.find('.accordeon_item'), // сохранияем пункты меню верхнего уровня
			content = item.find('.accordeon_inner'), // сохраняем содержимое пунктов верхнего уровня
			otherContent = list.find('.accordeon_inner'), // сохраняем остальной контент
			duration = 300; // время анимации
			
		// как работает
			
			if (!item.hasClass('active')) { // если нажимаемый пункт меню не активен
				items.removeClass('active'); // удаляем класс active у не активных
				item.addClass('active'); // присваиваем класс active
				
				otherContent.stop(true).slideUp(duration); // закрытие не активных выпадающих меню за время установленное в переменных, .stop() останавливает очередь анимации если произошло несколько нажатий подряд
				content.stop(true).slideDown(duration); // открытие выпадающего меню при нажатии за время установленное в переменных
			} else { // если пункт активен
				content.stop(true).slideUp(duration); // закрываем контент
				item.stop(true).removeClass('active'); // убираем класс active
			}
			
		
	});
});