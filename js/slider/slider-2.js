$(document).ready(function(){
	$('.slider_controls-button').on('click', function(e) { // при клике на блок с классом действует функция е
		e.preventDefault();
		//задаем переменные
		var
			$this = $(this), // чтобы несколько слайдеров на странице работали отдельно
			container = $this.closest('.slider-2'), /* сохраняем блок в котором слайдер, чтобы можно было делать несколько на странице*/
			list = container.find('.slider_list'), // сохранияем список слайдов
			items = container.find('.slider_item'), // сохраняем слайды отдельно
			activeSlide = items.filter('.active'), // сохраняем активный слайд
			nextSlide = activeSlide.next(), // сохраняем следующий от активного
			prevSlide = activeSlide.prev(), // сохраняем предидущий от активного
			firstSlide = items.first(), // сохраняем первый слайд для круговой прокурутки
			lastSlide = items.last(), // сохраняем последний слайд для круговой прокурутки
			sliderOffset = container.offset().left, // сохраняем смещение слайдера
			reqPos = 0; // сохраняем пустую переменную, для записи положения искомого слайда
			
		//задаем как работает	
		if ($(this).hasClass('slider_controls-button_next')) { // если при клике есть класс next листаем вправо
			if (nextSlide.length) { // закольцовка, если есть следующий слайд
				findReqPos(nextSlide); /* из положения следующего слайда вычитаем положение нашего слайда*/
				removeActiveClass(nextSlide); //добавляем у соседних убираем
			} else {
				findReqPos(firstSlide); /* из положения следующего слайда вычитаем положение нашего слайда*/
				removeActiveClass(firstSlide); //добавляем у соседних убираем
			}
			
		} else { // если при клике нет класс next листаем влево
			if (prevSlide.length) { // закольцовка, если есть предидущий слайд
				findReqPos(prevSlide); /* из положения следующего слайда вычитаем положение нашего слайда*/
				removeActiveClass(prevSlide); //добавляем у соседних убираем
			} else {
				findReqPos(lastSlide); /* из положения следующего слайда вычитаем положение нашего слайда*/
				removeActiveClass(lastSlide); //добавляем у соседних убираем
			}
		}
		list.css('left', '-=' + reqPos + 'px'); //заменяем значение left в css
		
		// сокращение написанного через функции
		function removeActiveClass (reqSlide) { // функция добавления класса active
			reqSlide.addClass('active').siblings().removeClass('active');
		}
		
		function findReqPos (slide) {
			reqPos = slide.offset().left - sliderOffset; 
		}
		
	});	
});