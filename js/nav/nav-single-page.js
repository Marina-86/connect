$(document).ready(function() {
	// с анимацией если пользователь использует меню
	$('.nav_item-link').on('click', function(e) {
		e.preventDefault();
		
		showSection($(this).attr('href'), true);	
	});
	
	// без анимации, если пользователь прошел по ссылке со стороннего ресурса
	showSection(window.location.hash, false);
});

$(window).scroll(function(){
	checkSection();
	
});
function showSection(section, isAnimate){ // показывем нужную
	var
		direction = section.replace(/#/, ''), // определяем какая секция нужна
		
		// фильтруем какую секцию показать
		reqSection = $('.section_one-page').filter('[data-section="' + direction + '"]'),
		reqSectionPos = reqSection.offset().top;
	
	if(isAnimate){
		$('body, html').animate({scrollTop: reqSectionPos}, 500);
	}else{
		$('body, html').scrollTop(reqSectionPos);
	}
}
function checkSection(){ // определяем видно ли на экране секцию на которую кликаем
	$('.section_one-page').each(function(){ // с помощью функции each пройдемся по всем секциям
		
		var
			$this = $(this),
			topEdge = $this.offset().top - 200, // находим верхний край секции
			bottomEdge = topEdge + $this.height(), // находим нижний край секции
			wScroll = $(window).scrollTop(); // определяем до куда прокручена страница
			
		if (topEdge < wScroll && bottomEdge > wScroll) { // если края есть в окне, то видим эту секцию
			var 
				currentId = $this.data('section'),
				
				// определяем какую ссылку сделать активной
				reqLink = $('.nav_item-link').filter('[href="#' + currentId + '"]');
			
			// присваиваем класс active в меню
			reqLink.closest('.nav_item').addClass('active')
				.siblings().removeClass('active');
			window.location.hash = currentId;	
		}	
	});
}