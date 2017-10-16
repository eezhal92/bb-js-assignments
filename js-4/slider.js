/**
 * Neonga Eo Javascript Assignment No. 4
 *
 * Author: https://github.com/eezhal92
 */

;(function (root, factory) {
  // This is window global factory
  // @todo learn about js modules, like amd, commonjs ;)
  root.NESlider = factory();
})(this, function () {
  /**
   * Write with ES 5 syntax ;)
   */

  function el(selector) {
    return document.querySelector(selector);
  }

  function findChildren(element, selector) {
    return element.querySelectorAll(selector);
  };

  function createSlide(index) {
    var slide = document.createElement('div');
    
    slide.classList.add('ne-slide');
    slide.setAttribute('data-index', index);
    
    return slide;
  }

  function createSlideTrack() {
    var slideTrack = document.createElement('div');
    
    slideTrack.classList.add('ne-slide-track');

    return slideTrack;
  }

  function createSlideList() {
    var slideList = document.createElement('div');
    
    slideList.classList.add('ne-slide-list');

    return slideList;
  }

  function wrapImagesToSlides(imageEls, width) {
    var slidesFragment = document.createDocumentFragment();

    Array.prototype.forEach.call(imageEls, function (el, i) {
      var slide = createSlide(i);
      
      el.setAttribute('style', 'width: ' + width + 'px;');

      slide.appendChild(el);
      slidesFragment.appendChild(slide);
    });

    return slidesFragment;
  }

  function generateTargetPositions(options) {
    var positions = [];

    for (var i = 0; i < options.imageCount; i++) {
      if (i === 0) {
        positions.push(0);
      } else {
        positions.push(-(i * options.width));
      }
    }
    
    return positions;
  }

  var DEFAULT_WIDTH = 480;

  function Slider(options) {
    this.options = Object.assign({}, options, {
      width: options.width || DEFAULT_WIDTH,
    });

    this.currentIndex = 0;
    this.imagesCount = 0;
    this.firstSlide = null;

    this.makeSlider();
  }

  Slider.prototype.makeSlider = function makeSlider() {
    var target = el(this.options.target);
    var images = findChildren(target, 'img');

    this.target = target;
    this.imageCount = images.length;
    this.lastImageIndex = this.imageCount - 1;

    target.classList.add('ne-slider');
    target.style = 'width: ' + this.options.width + 'px; margin: 0 auto;';
    
    // create images wrapper
    var imageSlides = wrapImagesToSlides(images, this.options.width);

    // create track
    var slideTrack = createSlideTrack();
    
    // append slides to track
    slideTrack.appendChild(imageSlides);
    
    // create list
    var slideList = createSlideList();
    
    // append track to list
    slideList.appendChild(slideTrack);
    
    // append list to target
    target.appendChild(slideList);
    
    // create nav and its listeners
    this.createAndAppendNavButtons(target, slideList);
  }

  Slider.prototype.createAndAppendNavButtons = function createAndAppendNavButtons(target, slideList) {
    var self = this;
    
    function createNavButton(direction) {
      var configs;

      switch (direction) {
        case 'prev':
          configs = { text: 'Prev', styleClass: 'ne-nav-prev', clickHandler: self.prev.bind(self) };
          break;
        case 'next':
          configs = { text: 'Next', styleClass: 'ne-nav-next', clickHandler: self.next.bind(self) };
          break;  
        default:
          throw Error('Argument is invalid. Accepted value: `prev` or `next`');
          break;
      }

      var button = document.createElement('button');
      var text = document.createTextNode(configs.text);

      button.appendChild(text);
      button.classList.add(configs.styleClass);

      button.addEventListener('click', configs.clickHandler);

      return button;    
    }

    var prevButton = createNavButton('prev');
    var nextButton = createNavButton('next');

    target.insertBefore(prevButton, slideList);
    target.appendChild(nextButton);
  }

  Slider.prototype.next = function next() {
    if (this.currentIndex < this.lastImageIndex) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }

    this.moveSlides();
  }

  Slider.prototype.prev = function prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = this.lastImageIndex;
    }

    this.moveSlides();
  }

  Slider.prototype.moveSlides = function moveSlides() {
    var targetPositions = generateTargetPositions({
      imageCount: this.imageCount,
      width: this.options.width,
    });

    var slides = findChildren(this.target, '.ne-slide');
    var targetPosition = targetPositions[this.currentIndex];
    var animationStyle = 'transition: transform 300ms ease; transform: translateX(' + targetPosition +'px)';

    Array.prototype.forEach.call(slides, function (el) {
      el.setAttribute('style', animationStyle);
    });
  }

  return Slider;
});