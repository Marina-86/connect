
 $(document).ready(function() {
	var delay_popup = 5000; //задаем переменные время через кот появляется окно задержка 5 секунд
	var span = document.getElementsByClassName('close_modal-time_window')[0]; // переменная закрытия окна
	var modal = document.getElementById('my_modal-time');
	
	
	
	setTimeout("document.getElementById('my_modal-time').style.display='block', $('body').addClass('modal-open')", delay_popup); // открываем окно, и запрещаем прокрутку тела сайта
	
	
	span.onclick = function () { // функция закрытия при нажатии на крестик
		modal.style.display = 'none';
		$('body').removeClass('modal-open'); // включаем прокрутку
	}

	window.onclick = function (event) { // функция закрытия при нажатии на серый фон
		if (event.target == modal) {
			modal.style.display = 'none';
			$('body').removeClass('modal-open'); // включаем прокрутку
		}
	}
	
 });







