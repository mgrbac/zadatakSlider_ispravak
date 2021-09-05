/**
* MG Slider
*
* @author  Maja Grbac
* 
*/
class MGSlider {
    constructor(options) {
		let _this = this,
		slider = null,
		sliderWrapper = null,
		slidesCurrent = null,
		slidesOrig = null,
		btnPrev = null,
		btnNext = null,
		activeSlide = null,
		lastSlide = null,
		firstSlide = null,
		slideWidth = null,
		slideMargin = null,
		positionX = 0,
		
		defaultOptions = {
			selectors: {
				sliderId: 'slider-1',
				btnPrevId: 'slide-prev',
				btnNextId: 'slide-next',
			},
			classes: {
				activeSlide: 'active',
			},
			debug: false,
		}; 
		
		this.init = () => {
			options = $.extend(true, {}, defaultOptions, options);
			_this.setElements()
			_this.initSlider();
		}; 

		this.calcElementWidth = (el) => parseFloat(el.outerWidth());

		this.calcElementMargin = (el) => parseFloat(el.css('marginLeft'));
		
		this.getCurrentSlides = () => $('#' + options.selectors.sliderId +' .slider-wrapper .slide').length ? $('#' + options.selectors.sliderId +' .slider-wrapper .slide') : null;
		
		this.updateCurrentSlides = () => slidesCurrent = _this.getCurrentSlides();
		
		this.prependLastEl = (slides) => {
			lastSlide = slides.last();
			lastSlide.prependTo(sliderWrapper); 
			
			_this.updateCurrentSlides();
		}; 

		this.appendFirstEl = (slides) => {
			firstSlide = slides.first();
			firstSlide.appendTo(sliderWrapper); 
			
			_this.updateCurrentSlides();
		}; 


		this.removeActiveClass = (slide) => {
			if (slide) {
				slide.removeClass(options.classes.activeSlide);	
			}
		};     
		
		this.setActiveSlide = (slide) => {
			if (slide) {
				_this.removeActiveClass(activeSlide);
				slide.addClass(options.classes.activeSlide);
				activeSlide = slide;
			}
		}; 
		
		this.slidePrev = () => {
			lastSlide = slidesCurrent.last();
			slideWidth = _this.calcElementWidth(lastSlide);
			slideMargin = _this.calcElementMargin(lastSlide);
			let newPositionX = - slideWidth - slideMargin;
			positionX = newPositionX;

			sliderWrapper.animate({
				marginRight: 0
			  }, 500, () => {
					sliderWrapper.css('marginRight',positionX);
					_this.prependLastEl(slidesCurrent);
					btnPrev.prop('disabled', false);
			});
			_this.setActiveSlide(activeSlide.prev());
		}; 
		
		this.slideNext = () => {
			slideWidth = _this.calcElementWidth(activeSlide);
			slideMargin = _this.calcElementMargin(activeSlide);
			let newPositionX = positionX - slideWidth - slideMargin;
			positionX = - slideWidth - slideMargin;

			_this.setActiveSlide(activeSlide.next());
			
			sliderWrapper.animate({
				marginRight: newPositionX
			  }, 500, () => {
					sliderWrapper.css('marginRight',positionX);
					_this.appendFirstEl(slidesCurrent);
					btnNext.prop('disabled', false);
			  });
		}; 

		this.initEvents = () => {
			if (btnPrev) {
				btnPrev.on('click', () => {
					btnPrev.prop('disabled', true);
					_this.slidePrev();
				});
			}
			if (btnNext) {
				btnNext.on('click', () => {
					btnNext.prop('disabled', true);
					_this.slideNext();
				});
			}
		}; 

		this.initSlider = () => {
			if (!slider) {
				_this.logCall('missing slider node: #' + options.selectors.sliderId);
				return;
			}
			if (!slidesOrig) {
				_this.logCall('missing slides');
				return;
			}

			_this.setActiveSlide(slidesOrig.first());
			
			_this.prependLastEl(slidesOrig);
			positionX = - _this.calcElementWidth(lastSlide) - _this.calcElementMargin(lastSlide);
			sliderWrapper.css('marginRight', positionX);

			_this.initEvents();
		}; 

		this.setElements = () => {
			slider = $('#' + options.selectors.sliderId).length ? $('#' + options.selectors.sliderId) : null;
			sliderWrapper = $('#' + options.selectors.sliderId +' .slider-wrapper').length ? $('#' + options.selectors.sliderId +' .slider-wrapper') : null;
			slidesOrig = $('#' + options.selectors.sliderId +' .slider-wrapper .slide').length ? $('#' + options.selectors.sliderId +' .slider-wrapper .slide') : null;
			btnPrev = $('#' + options.selectors.btnPrevId).length ? $('#' + options.selectors.btnPrevId) : null;
			btnNext = $('#' + options.selectors.btnNextId).length ? $('#' + options.selectors.btnNextId) : null;
		}; 

		this.init();
	}
}