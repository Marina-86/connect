$(document).ready(function() {
	var
		curScreen = 0,
		container = $('.maincontent'),
		pages = $('.page'),
		inScroll = false;
	$('.page:first-child').addClass('active');

	$('body').on('mousewheel', function(event) {

		var activePage = pages.filter('.active');


		if (!inScroll) {
			inScroll = true;
			if (event.deltaY > 0) {
					if (activePage.prev().length) {curScreen--;}
			} else {
					if (activePage.next().length) {curScreen++;}
			}
		}

		var
			position = (-curScreen*100) + '%';
		pages.eq(curScreen).addClass('active').siblings().removeClass('active');
		container.css('top', position);

		setTimeout(function () {
			inScroll = false;
		}, 1300);
	});
});
