'use strict';

(function () {
  // Скрытие слайдера
  var slider = document.querySelector('.effect-level');

  var hideSlider = function () {
    slider.classList.add('hidden');
  };

  // Изменение интенсивности эффекта с помощью слайдера
  var effectPin = slider.querySelector('.effect-level__pin');
  // var effectValue = slider.querySelector('.effect-level__value');
  var effectLine = slider.querySelector('.effect-level__line');
  var effectDepth = slider.querySelector('.effect-level__depth');

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      startCoordX = moveEvt.clientX;

      var endPinX = (effectPin.offsetLeft - shiftX);
      if (endPinX >= 0 && endPinX <= effectLine.offsetWidth) {
        effectPin.style.left = endPinX + 'px';
        effectDepth.style.width = endPinX + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    hideSlider: hideSlider
  };
}());
