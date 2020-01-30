//работают все способы

//способ по порядковому номеру
/*
$(document).ready(function() {
	$('.tabs_controls-link').on('click', function(e){
		e.preventDefault(); //запрещает переход по ссылке
		var item = $(this).closest('.tabs_controls-item'),
			contentItem = $('.tabs_item'),
			itemPosition = item.index(); //поиск элемента по позиции, item.index()-возвращает порядок элемента в наборе
		contentItem.eq(itemPosition) // поиск соответствующего элемента
			.add(item) // закоментированное вконце тоже работает, делает тоже самое
			.addClass('active') // добавить класс active при клике
			.siblings()
			.removeClass('active'); // убрать класс active с другого элемента
			
			//item.addClass('active')
			//.siblings()
			//.removeClass('active');
			
	});
});
*/

//способ по идентификатору data
$(document).ready(function() {
	$('.tabs_controls-link').on('click', function(e){
		e.preventDefault(); //запрещает переход по ссылке
		var item = $(this).closest('.tabs_controls-item'),
			contentItem = $('.tabs_item'),
			itemPosition = item.data('class'); //поиск элемента по позиции, item.index()-возвращает порядок элемента в наборе
		contentItem.filter('.tabs_item-' + itemPosition) // поиск соответствующего элемента
			.add(item) // закоментированное вконце тоже работает, делает тоже самое
			.addClass('active') // добавить класс active при клике
			.siblings()
			.removeClass('active'); // убрать класс active с другого элемента
			
			//item.addClass('active')
			//.siblings()
			//.removeClass('active');
			
	});
});