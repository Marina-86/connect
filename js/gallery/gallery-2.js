$(document).ready(function() {
	$('.slideshow_pic').on('click', function(e) { // при клике на блок с классом действует функция е
		e.preventDefault();
		
		var // задаем переменные
			$this = $(this), // чтобы несколько галлерей на странице работали отдельно
			item = $this.closest('.slideshow_item'), // сохраняем блок по которому кликаем
			container = $this.closest('.slideshow'), // сохраняем блок где лежит все
			display = container.find('.slideshow_display'), /* сохранияе блок для большой картинки, для этого находим в контейнере блок в котором она лежит*/
			path = item.find('img').attr('src'), /* при клике вырезаем путь и вставляем в блок с большой картинкой, для этого ищем в блоке по которому кликаем картику и забираем у нее путь*/
			duration = 300; // время анимации
			
		//задаем как работает
		if (!item.hasClass('active')){ // если при клике нет класса active
			item.addClass('active').siblings().removeClass('active'); //добавляем у соседних убираем
			
			display.find('img').fadeOut(duration, function() { // пишем функцию, из блока убирается картинка кот там стоит
			$(this).attr('src', path).fadeIn(duration); // вставляем новый путь
			});
		}
		
		
	});	
});