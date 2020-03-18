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

  // Функция закрытия окна по Escape
  var onPopupEscPress = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  // Функция открытия любого окна
  var openPopup = function (popup) {
    popup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Функция закрытия любого окна
  var closePopup = function (popup) {
    popup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.util = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    getRandomInteger: getRandomInteger,
    onPopupEscPress: onPopupEscPress,
    openPopup: openPopup,
    closePopup: closePopup,
    editImageOverlay: editImageOverlay,
    imagePreview: imagePreview,
    image: image
  };
})();
