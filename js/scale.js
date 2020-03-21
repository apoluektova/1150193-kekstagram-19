'use strict';

(function () {
  var RADIX = 10;
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var DEFAULT_SCALE_VALUE = '100%';
  var scaleMinus = window.util.editImageOverlay.querySelector('.scale__control--smaller');
  var scalePlus = window.util.editImageOverlay.querySelector('.scale__control--bigger');
  var scaleValue = window.util.editImageOverlay.querySelector('.scale__control--value');
  var image = window.util.image;

  // Преобразование значения масштаба
  var getValue = function () {
    return parseInt(scaleValue.value, RADIX);
  };

  // Уменьшение масштаба
  var decreaseScaleValue = function () {
    var next = getValue() - SCALE_STEP;
    scaleValue.value = (next < MIN_SCALE_VALUE ? MIN_SCALE_VALUE : next) + '%';
  };

  // Увеличение масштаба
  var increaseScaleValue = function () {
    var next = getValue() + SCALE_STEP;
    scaleValue.value = (next > MAX_SCALE_VALUE ? MAX_SCALE_VALUE : next) + '%';
  };

  // Масштабирование изображения
  var scaleImage = function () {
    image.style.transform = 'scale(' + (parseInt(scaleValue.value, RADIX) / 100) + ')';
  };

  var onScaleMinusClick = function () {
    decreaseScaleValue();
    scaleImage();
  };

  var onScalePlusClick = function () {
    increaseScaleValue();
    scaleImage();
  };

  scaleMinus.addEventListener('click', onScaleMinusClick);
  scalePlus.addEventListener('click', onScalePlusClick);

  window.scale = {
    controlValue: scaleValue,
    DEFAULT_VALUE: DEFAULT_SCALE_VALUE
  };
})();
