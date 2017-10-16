function Faq(el) {
  this.el = el;
  this.isOpen = false;
  this.init();
}

Faq.prototype.init = function () {
  this.isOpen = this.el.classList.contains('faq--open');

  this.el.addEventListener('click', this.toggle.bind(this));
};

Faq.prototype.toggle = function () {
  this.isOpen = !this.isOpen;
  
  if (this.isOpen) {
    this.el.classList.remove('faq--open');
  } else {
    this.el.classList.add('faq--open');
  }
};

const faqs = document.querySelectorAll('.faq');

faqs.forEach(function (el) {
   new Faq(el);
});