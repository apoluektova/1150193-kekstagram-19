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
    var value = parseInt(scaleValue.value, RADIX);
    return value;
  };

  // Уменьшение масштаба
  var decreaseScaleValue = function () {
    if (getValue() > MIN_SCALE_VALUE && (getValue() - SCALE_STEP) > MIN_SCALE_VALUE) {
      scaleValue.value = (getValue() - SCALE_STEP) + '%';
    } else {
      scaleValue.value = MIN_SCALE_VALUE + '%';
    }
  };

  // Увеличение масштаба
  var increaseScaleValue = function () {
    if (getValue() < MAX_SCALE_VALUE && (getValue() + SCALE_STEP) < MAX_SCALE_VALUE) {
      scaleValue.value = (getValue() + SCALE_STEP) + '%';
    } else {
      scaleValue.value = MAX_SCALE_VALUE + '%';
    }
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
