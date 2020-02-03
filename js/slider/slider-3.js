
var sliderMy =(function(){ // создаем модуль слайдер для использования, в названии не должно быть тире
//private - пишутся методы не доступные вне модуля

/*создаем флаг для контроля анимации, который будет менять свое значение в зависимости от того выполняется анимция или нет, и все действия связанные с анимацией выполняем если он true*/

var 
	flag = true,
	timerDuration = 3000,
	timer = 0;


return {
	init: function () { // функция инциализации модуля
		var _this = this;
		
		// создаем точки
		_this.createDots();
		
		// включаем автопрокрутку
		_this.autoSwitch();
		
		$('.slider-my_controls-button').on('click', function(e) { // при клике на блок с классом действует функция е
			e.preventDefault();
			
			var 
				$this = $(this), // слайд который надо пододвинуть
				slides = $this.closest('.slider-my').find('.slider-my_item'), // сохраняем все слайды, ищем их в контейнере
				activeSlide = slides.filter('.active'), // ищем активный, чтобы знать относительно чего двигать
				nextSlide = activeSlide.next(), // ищем следующий слайд
				prevSlide = activeSlide.prev(), // ищем предидущий слайд
				firstSlide = slides.first(), // если нет следующего, переходим к первому - закольцовка
				lastSlide = slides.last(); // если нет предидущего
			
			_this.clearTimer();
				
			if ($this.hasClass('slider-my_controls-button_next')){ // если нажали на кнопку следующий
			
				if(nextSlide.length) { // закольцовка, если есть следующий слайд
					_this.moveSlide(nextSlide, 'forward'); // вызываем функцию движения слайдов с параметрами nextSlide, 'forward' - движение вперед
				}else{
					_this.moveSlide(firstSlide, 'forward'); // если нет следующего, двигаем первый
				}
				
				
			}else{
				if(prevSlide.length) { // закольцовка, если есть следующий слайд
					_this.moveSlide(prevSlide, 'backward'); // вызываем функцию движения слайдов с параметрами prevSlide, 'backward' - движение назад
				}else{
					_this.moveSlide(lastSlide, 'backward'); // если нет предидущего, двигаем последний
				}
			}
 			
		});	
		
		// добавляем клик по точкам
		$('.slider-my_dots-item').on('click', function(e) { // при клике на блок с классом действует функция е
			e.preventDefault();
		
			var
				$this = $(this),
				dots = $this.closest('.slider-my_dots').find('.slider-my_dots-item'), // сохраняем точки
				activeDot = dots.filter('.active'), // сохраняем активный класс
				dot = $this.closest('.slider-my_dots-item'), // сохраняем точки
				curDotNum = dot.index(), // сохраняем положение точки
				
				// определяем направление движения с помощью if
				direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward';
				
				// ищем активный слайд
				reqSlide = $this.closest('.slider-my').find('.slider-my_item').eq(curDotNum);
			// вызываем метод движения слайда с параметрами, активный слайд и направление движения
			if(!dot.hasClass('active')){
				_this.clearTimer();
				_this.moveSlide(reqSlide, direction);
			}
			
		});
		
	},
	moveSlide: function(slide, direction){ //функция которая двигает слайды, принимает параметры слайд и направление движения слайда
		// задаем переменные
		var 
			_this = this,
			container = slide.closest('.slider-my'), // ищем контейнер со слайдером
			slides = container.find('.slider-my_item'), // ищем слайды в контейнере
			activeSlide = slides.filter('.active'), // ищем активный, фильтруем по active
			slideWidth = slides.width(), // сщхраняеи ширину слайда
			duration = 500, // время анимации
			reqCssPosition = 0, // положение слайда
			reqSlideStrafe = 0; // сохраняем пиксели на которые смещается слайд
		
		if(flag){
			
			flag = false;
			
			if(direction ==='forward'){ // если листается вперед
			reqCssPosition = slideWidth;
			reqSlideStrafe = -slideWidth;
			}else if (direction ==='backward'){ // если листается назад
				reqCssPosition = -slideWidth;
				reqSlideStrafe = slideWidth;
			}
			
			slide.css('left', reqCssPosition).addClass('inslide'); // после проверки условий, в css задается left равный смещению и дается класс inside действующему слайду
			
			//двигаем действующий слайд в контейнер
			var movableSlide = slides.filter('.inslide'); // ищем слайд с классом inside
			
			activeSlide.animate({left: reqSlideStrafe}, duration); // смещаем активный слайд
			
			movableSlide.animate({left: 0}, duration, function(){// двигаем следующий в зону видимости и возвращаем предидущий в первоначальное состаяние
				var $this = $(this);
				
				slides.css('left', '0').removeClass('active'); //задаем первоначальный left, забираем класс active
				
				$this.toggleClass('inslide active'); // заменяем текщему слайду класс inslide на active
				
				_this.setActiveDot(container.find('.slider-my_dots')); // переключение активного класса в точках
				
				flag = true;
				
			}); 	
		}
		
				
	},
	
	
	// добавляем точки соответственно слайдеру
	createDots: function(){
		var
			_this = this,
			container = $('.slider-my'); // сохраняем контейнер гда лежит слайдер
		
		var 
			dotMarkup = '<div class="slider-my_dots-item">\
							<a href="#!" class="slider-my_dots-link"></a>\
						</div>'; // сохраняем разметку для точек
		
		container.each(function(){ // если несколько на странице чтобы точки добавлялись соответственно каждому слайдеру
			var 
				$this = $(this),
				slides = $this.find('.slider-my_item'), // сохраняем количество слайдов 
				dotContainer = $this.find('.slider-my_dots'); // сохраняем контейнер под точки
			
			for(var i=0; i < slides.length; i++){
				dotContainer.append(dotMarkup);
			}
			
			_this.setActiveDot(dotContainer);
		});	
	},
	
	// определяем активный слайд
	setActiveDot: function(container) {
		var 
			// ищем все салйды
			slides = container.closest('.slider-my_list-wrap').find('.slider-my_item');
		// ищем точку соответствующую активному слайду
		container
			.find('.slider-my_dots-item')
			.eq(slides.filter('.active').index())
			.addClass('active')
			.siblings()
			.removeClass('active');
	},
	
	//автопрокрутка
	autoSwitch: function(){
		var
			_this = this,
		
		timer = setInterval(function(){
			var 
				slides = $('.slider-my_list .slider-my_item'), //сохраняем слайды
				activeSlide = slides.filter('.active'), //ищем активный
				nextSlide = activeSlide.next(), // сохраняем следующий слайд
				firstSlide = slides.first(); // сохраняем первый слайд
			if(nextSlide.length) { // закольцовка, если есть следующий слайд
				_this.moveSlide(nextSlide, 'forward'); // вызываем функцию движения слайдов с параметрами nextSlide, 'forward' - движение вперед
			}else{
				_this.moveSlide(firstSlide, 'forward'); // если нет следующего, двигаем первый
			}
			
		}, timerDuration);	
		
	},
	// астановка таймера при нажатии на кнопку
	clearTimer: function(){
		if (timer){
			clearInterval(timer);
			this.autoSwitch();
		}
	}
}	
}());


$(document).ready(function(){
	if ($('.slider-my').length) { // после загрузки страницы проверяем есть ли слайдер на странице
		sliderMy.init(); // если есть инициализируем его
	}
});	