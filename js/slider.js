'use strict';

(function () {
  var MAX_PERCENT_VALUE = 100;
  var DEFAULT_EFFECT_VALUE = 100;
  var slider = document.querySelector('.effect-level');
  var effectPin = slider.querySelector('.effect-level__pin');
  var effectLine = slider.querySelector('.effect-level__line');
  var effectDepth = slider.querySelector('.effect-level__depth');
  var effectValue = slider.querySelector('.effect-level__value');
  var image = window.util.image;

  var Effects = {
    none: '',
    chrome: {
      filter: 'grayscale',
      minValue: 0,
      maxValue: 1,
      units: ''
    },
    sepia: {
      filter: 'sepia',
      minValue: 0,
      maxValue: 1,
      units: ''
    },
    marvin: {
      filter: 'invert',
      minValue: 0,
      maxValue: 100,
      units: '%'
    },
    phobos: {
      filter: 'blur',
      minValue: 0,
      maxValue: 3,
      units: 'px'
    },
    heat: {
      filter: 'brightness',
      minValue: 1,
      maxValue: 3,
      units: ''
    }
  };

  var hideSlider = function () {
    slider.classList.add('hidden');
  };

  var showSlider = function () {
    if (slider.classList.contains('hidden')) {
      slider.classList.remove('hidden');
    }
  };

  // Проверка отображения слайдера
  var setSliderVisibility = function (effect) {
    if (effect === 'none') {
      hideSlider();
    } else {
      showSlider();
    }
  };

  // Сброс значений слайдера до дефолтных
  var setDefaultSliderValues = function () {
    effectPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    effectDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
    effectValue.value = DEFAULT_EFFECT_VALUE;
    window.scale.controlValue.value = window.scale.DEFAULT_VALUE;
    image.style.filter = '';
    image.style.transform = '';
  };

  // Выбор нужного эффекта (который соответствует классу изображения) и его параметров
  var findCurrentEffect = function () {
    var currentImageClass = image.className;
    var currentEffect = window.effect.getSubString(currentImageClass);
    return currentEffect;
  };

  // Вычисление глубины эффекта
  var getEffectDepth = function (pinValue) {
    var currentEffect = findCurrentEffect();
    var proportionValue = pinValue / MAX_PERCENT_VALUE;
    var effectDepthLevel = proportionValue * (Effects[currentEffect].maxValue - Effects[currentEffect].minValue) + Effects[currentEffect].minValue;
    return effectDepthLevel;
  };

  // Применение глубины эффекта
  var applyEffectDepth = function (pinValue) {
    var currentEffect = findCurrentEffect();
    var appliedFilter = Effects[currentEffect];
    image.style.filter = appliedFilter.filter + '(' + getEffectDepth(pinValue) + appliedFilter.units + ')';
  };

  // Перемещение ползунка
  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX - moveEvt.clientX;
      var endPinX = effectPin.offsetLeft - shiftX;
      startCoordX = moveEvt.clientX;

      if (endPinX >= 0 && endPinX <= effectLine.offsetWidth) {
        var pinPoint = endPinX / effectLine.offsetWidth;
        effectPin.style.left = endPinX + 'px';
        effectDepth.style.width = endPinX + 'px';
        effectValue.value = Math.round(pinPoint * MAX_PERCENT_VALUE);
        applyEffectDepth(effectValue.value);
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
    show: showSlider,
    hide: hideSlider,
    setVisibility: setSliderVisibility,
    setDefault: setDefaultSliderValues
  };
}());
