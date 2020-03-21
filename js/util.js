'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var editImageOverlay = document.querySelector('.img-upload__overlay');
  var imagePreview = editImageOverlay.querySelector('.img-upload__preview');
  var image = imagePreview.querySelector('img');

  // Получение случайного числа из заданного промежутка
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Закрытие окна по Escape
  var isEscapeEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomInteger: getRandomInteger,
    isEscapeEvent: isEscapeEvent,
    editImageOverlay: editImageOverlay,
    imagePreview: imagePreview,
    image: image
  };
})();
