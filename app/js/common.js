$(function () {

	class customSlider {
		constructor(slider, time) {
			this.slider = slider;
			this.totalSlides = slider.find('.custom-slider__slide').length;
			this.pagination = slider.find('.custom-slider-pagination');
			this.activeSlide = 1;
			this.height = 100;
			this.time = time ? time * 1000 : 0

			this.init();
		}

		nextSilde() {
			if (this.activeSlide >= this.totalSlides) {
				this.activeSlide = 1;
			} else {
				this.activeSlide += 1;
			}
			this.creatSlider();
		}

		createPagination() {
			let self = this;

			self.pagination.find('span').remove();

			for (let slide = 1; slide <= self.totalSlides; slide++) {
				let active = (slide == self.activeSlide ? 'active' : '');
				let item = $('<span/>', {
					"class": active,
					"data-index-slide": slide,
				})

				self.pagination.append(item);
			}

			this.pagination.find('span').click(function () {
				self.activeSlide = parseInt($(this).attr('data-index-slide'));
				self.creatSlider();
			})
		}

		creatSlider() {
			var self = this;
			if (self.activeSlide !== 0) {
				this.slider.find('.custom-slider__slide').each(function () {
					if ($(this).attr('index') == self.activeSlide) {
						$(this).parent().prepend($(this));
					}
				});
			}
			this.slider.find('.custom-slider__slide').each(function () {
				let slide = $(this),
					index = slide.index();

				slide.css({
					'left': (index * 3) + '%',
					'height': self.height - (index * 5) + '%',
					'top': (index * 5) / 2 + '%',
					'z-index': self.totalSlides - index
				});
			});

			self.createPagination();
		}

		init() {
			this.slider.find('.custom-slider__slide').each(function () {
				$(this).attr('index', $(this).index() + 1)
			});

			this.creatSlider();

			this.slider.find('.custom-slider-navigation__next')[0].addEventListener("click", () => {
				this.nextSilde();
			});

			if (this.time) {
				var timer = setInterval(() => {
					this.nextSilde();
				}, this.time);

				this.slider.find('.custom-slider-navigation__next, .custom-slider__slide, .custom-slider-pagination').mouseenter(() => {
					clearInterval(timer);
				});

				this.slider.find('.custom-slider-navigation__next, .custom-slider__slide, .custom-slider-pagination').mouseleave(() => {
					timer = setInterval(() => {
						this.nextSilde();
					}, this.time);
				})

			}

		}
	}

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

	let sectionNav = {
		init() {
			$('.header-menu a, .footer-menu a').click(function(e) {
				let link = $(this).attr('href');

				if (link.match(/^#/)) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: $(link).offset().top
					}, 1000);
				}
			})

		}
	}

	let tabs = {
		init() {
			$('.accordion .accordion__title').click(function(){
				let item = $(this).parent(),
					allItem = item.parent().find('.accordion__item');
					if (!item.hasClass('active')) {
						allItem.removeClass('active');
						item.addClass('active');
						allItem.find('.accordion__content').slideUp();
						item.find('.accordion__content').slideDown();
					}
			})

			$('.accordion .accordion__item').first().find('.accordion__title').trigger('click');
		}
	}

	let headerMenu = {

		init() {
			$('#mobile-menu').click(function(){
				var btn = $(this),
					menu = $('#header-menu'),
					body = $('body');
		
				btn.toggleClass('is-active');
				menu.toggleClass('header-menu_active');
				body.toggleClass('overflow-hidden');

				menu.click(function(e){
					let target = e.target.nodeName;
					if (target == 'A') {
						btn.removeClass('is-active');
						menu.removeClass('header-menu_active');
						body.removeClass('overflow-hidden');
					}
				});
			});
		}
	}


	let sliderAbout = new customSlider($('.custom-slider'), 3);

	scrollDown.init(1000);
	langSwitcher.init();
	sectionNav.init();	
	tabs.init();
	headerMenu.init();


});
