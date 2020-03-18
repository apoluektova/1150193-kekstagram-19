'use strict';

(function () {
  var editImageForm = window.util.editImageForm;
  var image = window.util.image;
  var effectField = document.querySelector('.effects');
  var hideSlider = window.slider.hide;
  var showSlider = window.slider.show;

  // Обрезка строки с айди эффекта до подстроки с названием эффекта
  var getSubString = function (string) {
    var subString = string.substring(string.lastIndexOf('-') + 1);
    return subString;
  };

  // Добавление эффекта на фото
  var applyEffect = function (element) {
    var effectId = element.id;
    var effectName = getSubString(effectId);
    image.classList = '';
    image.classList.add('effects__preview--' + effectName);
  };

  var onEffectChange = function (evt) {
    applyEffect(evt.target);
    evt.target.id === 'effect-none' 
      ? hideSlider()
      : showSlider()
  };

  // Переключение фильтров
  effectField.addEventListener('click', onEffectChange);

  window.effect = {
    editImageForm: editImageForm,
    image: image,
    getSubString: getSubString
  };
})();
