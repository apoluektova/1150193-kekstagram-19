'use strict';

(function () {
  var image = window.util.image;
  var effectField = document.querySelector('.effects');
  var hideSlider = window.slider.hide;
  var showSlider = window.slider.show;
  var setDefaultValues = window.slider.setDefault;

  // Обрезка строки с айди эффекта до подстроки с названием эффекта
  var getSubString = function (string) {
    return string.substring(string.lastIndexOf('-') + 1);
  };

  // Добавление эффекта на фото
  var applyEffect = function (element) {
    var effectId = element.id;
    var effectName = getSubString(effectId);
    element.id === 'effect-none' ? hideSlider() : showSlider()

    setDefaultValues();
    image.classList = '';
    image.classList.add('effects__preview--' + effectName);
  };

  // Удаление примененного ранее эффекта
  var removeEffect = function () {
    var currentEffect = image.className;
    if (currentEffect.match('effects__preview--')) {
      image.classList.remove(currentEffect);
    }
  };

  // Переключение фильтров
  var onEffectChange = function (evt) {
    removeEffect();
    applyEffect(evt.target);
  };

  var setEffectListeners = function () {
    effectField.addEventListener('click', onEffectChange);
  };

  var removeEffectListeners = function () {
    effectField.removeEventListener('click', onEffectChange);
  };

  window.effect = {
    image: image,
    getSubString: getSubString,
    remove: removeEffect,
    setListeners: setEffectListeners,
    removeListeners: removeEffectListeners,
    field: effectField
  };
})();
