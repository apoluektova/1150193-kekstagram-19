'use strict';

(function () {
  var editImageForm = document.querySelector('.img-upload__overlay');
  var imagePreview = editImageForm.querySelector('.img-upload__preview');
  var image = imagePreview.querySelector('img');
  var effectField = document.querySelector('.effects');
  var hideSlider = window.slider.hideSlider;

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
    if (evt.target.id === 'effect-none') {
      hideSlider();
    }
  };

  // Переключение фильтров
  effectField.addEventListener('click', onEffectChange);

  window.effect = {
    editImageForm: editImageForm,
    image: image
  };
})();
