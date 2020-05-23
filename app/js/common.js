$(function () {

	let langSwitcher = {
		init() {
			$('.lang-swicher').click(function (e) {
				let langList = $(this).find('.lang-swicher__list'),
					langCurrent = $(this).find('.lang-swicher__current'),
					target = e.target;

				langList.toggleClass('lang-swicher__list_active');

				if (target.className == 'lang-swicher__item') {
					langCurrent.text(target.textContent);
				}
			})
		}
	}

	let scrollDown = {
		init(time) {
			$('.header__scrollDown').click(function (e) {
				$('html, body').animate({
					scrollTop: $('.header').outerHeight()
				 }, time);
			})
		}
	}


	scrollDown.init(1000);
	langSwitcher.init()

});
