
	define 
	class Popup
		constructor: ->
		@popups = $('.popup') // переменная this в нее сохраняем попапы
		@duration = 500 // продолжительность анимации
		
		do @popups.hide
		
	show: (popupId) ->
		@popups 
			.filter(popupId)
			.fadeIn @duration
			.css 'display', 'inline-block'
			
	init // инициализация окна
	
	$('.registration-trigger').on 'click', (e) ->
		e.preventDefault
		
		popup = new Popup
		popup.show '#registration'
	
