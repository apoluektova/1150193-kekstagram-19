'use strict';

(function () {
  var editImageForm = window.util.editImageForm;
  var image = window.util.image;
  var effectField = document.querySelector('.effects');
  var hideSlider = window.slider.hide;
  var showSlider = window.slider.show;
  var setDefaultValues = window.slider.setDefault;

  // Обрезка строки с айди эффекта до подстроки с названием эффекта
  var getSubString = function (string) {
    var subString = string.substring(string.lastIndexOf('-') + 1);
    return subString;
  };

  // Добавление эффекта на фото
  var applyEffect = function (element) {
    var effectId = element.id;
    var effectName = getSubString(effectId);
    if (element.id === 'effect-none') {
      hideSlider();
    } else {
      showSlider();
    }
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

  var onEffectChange = function (evt) {
    removeEffect();
    applyEffect(evt.target);
  };

  // Переключение фильтров
  var setEffectListeners = function () {
    effectField.addEventListener('click', onEffectChange);
  };

  var removeEffectListeners = function () {
    effectField.removeEventListener('click', onEffectChange);
  };

  window.effect = {
    editImageForm: editImageForm,
    image: image,
    getSubString: getSubString,
    remove: removeEffect,
    setListeners: setEffectListeners,
    removeListeners: removeEffectListeners
  };
})();
