/**
* MG Slider
*
* @author  Maja Grbac
* 
*/
class MGSlider {
	slider = null;
	sliderWrapper = null;
	slidesCurrent = null;
	slidesOrig = null;
	btnPrev = null;
	btnNext = null;
	activeSlide = null;
	lastSlide = null;
	firstSlide = null;
	slideWidth = null;
	slideMargin = null;
	positionX = 0;

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

    	constructor(options) {
		this.options = $.extend(true, {}, this.defaultOptions, options);
		this.setElements();
		this.initSlider();
	}

	calcElementWidth(el) {
		return parseFloat(el.outerWidth());
	}
	
	calcElementMargin(el) {
		return parseFloat(el.css('marginLeft'));
	}
	
	getCurrentSlides() {
		return $('#' + this.options.selectors.sliderId +' .slider-wrapper .slide').length ? $('#' + this.options.selectors.sliderId +' .slider-wrapper .slide') : null;
	}
	
	updateCurrentSlides() {
		this.slidesCurrent = this.getCurrentSlides();
	}
	
	prependLastEl(slides) {
		this.lastSlide = slides.last();
		this.lastSlide.prependTo(this.sliderWrapper); 
		
		this.updateCurrentSlides();
	}

	appendFirstEl(slides) {
		this.firstSlide = slides.first();
		this.firstSlide.appendTo(this.sliderWrapper); 
		
		this.updateCurrentSlides();
	}

	removeActiveClass(slide) {
		if (slide) {
			slide.removeClass(this.options.classes.activeSlide);	
		}
	}  
	
	setActiveSlide(slide) {
		if (slide) {
			this.removeActiveClass(this.activeSlide);
			slide.addClass(this.options.classes.activeSlide);
			this.activeSlide = slide;
		}
	}
	
	slidePrev() {
		this.lastSlide = this.slidesCurrent.last();
		this.slideWidth = this.calcElementWidth(this.lastSlide);
		this.slideMargin = this.calcElementMargin(this.lastSlide);
		let newPositionX = - this.slideWidth - this.slideMargin;
		this.positionX = newPositionX;

		this.sliderWrapper.animate({
			marginRight: 0
		  }, 500, () => {
				this.sliderWrapper.css('marginRight', this.positionX);
				this.prependLastEl(this.slidesCurrent);
				this.btnPrev.prop('disabled', false);
		});
		this.setActiveSlide(this.activeSlide.prev());
	}
	
	slideNext() {
		this.slideWidth = this.calcElementWidth(this.activeSlide);
		this.slideMargin = this.calcElementMargin(this.activeSlide);
		let newPositionX = this.positionX - this.slideWidth - this.slideMargin;
		this.positionX = - this.slideWidth - this.slideMargin;

		this.setActiveSlide(this.activeSlide.next());
		
		this.sliderWrapper.animate({
			marginRight: newPositionX
		  }, 500, () => {
				this.sliderWrapper.css('marginRight', this.positionX);
				this.appendFirstEl(this.slidesCurrent);
				this.btnNext.prop('disabled', false);
		  });
	}

	initEvents(){
		let btnPrevEl = this.btnPrev;
		let btnNextEl = this.btnNext;

		if (btnPrevEl) {
			btnPrevEl.on('click', () => {
				btnPrevEl.prop('disabled', true);
				this.slidePrev();
			});
		}
		
		if (btnNextEl) {
			btnNextEl.on('click', () => {
				btnNextEl.prop('disabled', true);
				this.slideNext();
			});
		}
	}

	initSlider() {
		if (!this.slider) {
			this.logCall('missing slider node: #' + this.options.selectors.sliderId);
			return;
		}
		if (!this.slidesOrig) {
			this.logCall('missing slides');
			return;
		}

		this.setActiveSlide(this.slidesOrig.first());
		
		this.prependLastEl(this.slidesOrig);
		this.positionX = - this.calcElementWidth(this.lastSlide) - this.calcElementMargin(this.lastSlide);
		this.sliderWrapper.css('marginRight', this.positionX);

		this.initEvents();
	}

	setElements() {
		this.slider = $('#' + this.options.selectors.sliderId).length ? $('#' + this.options.selectors.sliderId) : null;
		this.sliderWrapper = $('#' + this.options.selectors.sliderId +' .slider-wrapper').length ? $('#' + this.options.selectors.sliderId +' .slider-wrapper') : null;
		this.slidesOrig = $('#' + this.options.selectors.sliderId +' .slider-wrapper .slide').length ? $('#' + this.options.selectors.sliderId +' .slider-wrapper .slide') : null;
		this.btnPrev = $('#' + this.options.selectors.btnPrevId).length ? $('#' + this.options.selectors.btnPrevId) : null;
		this.btnNext = $('#' + this.options.selectors.btnNextId).length ? $('#' + this.options.selectors.btnNextId) : null;
	}

}
