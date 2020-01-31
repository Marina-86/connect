//модальное окно открытие по клику
$(document).ready(function() {
	var modal = document.getElementById("my_modal");
	var btn = document.getElementById("btn_modal_window");
	var span = document.getElementsByClassName("close_modal_window")[0];

	btn.onclick = function () {
		modal.style.display = "block";
		$('body').addClass('modal-open');
	}

	span.onclick = function () {
		modal.style.display = "none";
		$('body').removeClass('modal-open');
	}

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
			$('body').removeClass('modal-open');
		}
	}
});

