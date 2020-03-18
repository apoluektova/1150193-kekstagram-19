// модуль, который работает с формой редактирования изображения
'use strict';

(function () {
  var editImageForm = window.effect.editImageForm;
  var editImageFormClose = editImageForm.querySelector('#upload-cancel');
  var uploadFileInput = document.querySelector('#upload-file');
  var openPopup = window.util.openPopup;
  var closePopup = window.util.closePopup;
  var onPopupEscPress = window.util.onPopupEscPress;
  var body = window.bigPicture.body;
  var hashtagInput = window.validation.hashtagInput;
  var commentInput = window.validation.commentInput;
  var image = window.util.image;
  var originalEffect = editImageForm.querySelector('[value="none"]');
  var hideSlider = window.slider.hide;
  var removeEffect = window.effect.remove;
  var setDefaultValues = window.slider.setDefault;
  var setEffectListeners = window.effect.setListeners;
  var removeEffectListeners = window.effect.removeListeners;

  // Функция закрытия окна редактирования по Escape
  var onEditImageFormEscPress = function (evt) {
    var active = document.activeElement;
    if (hashtagInput !== active && commentInput !== active) {
      onPopupEscPress(evt, onEditImageFormClose);
    }
  };

  // Функция открытия окна редактирования
  var onEditImageFormOpen = function () {
    openPopup(editImageForm);
    body.classList.add('modal-open');

    window.scale.controlValue.value = window.scale.DEFAULT_VALUE;
    removeEffect();
    hideSlider();
    setDefaultValues();
    setEffectListeners();

    editImageFormClose.addEventListener('click', onEditImageFormClose);
    document.addEventListener('keydown', onEditImageFormEscPress);
  };

  // Функция закрытия окна редактирования
  var onEditImageFormClose = function () {
    closePopup(editImageForm);
    body.classList.remove('modal-open');
    removeEffectListeners();
    editImageForm.reset();
    editImageFormClose.removeEventListener('click', onEditImageFormClose);
    document.removeEventListener('keydown', onEditImageFormEscPress);
  };

  uploadFileInput.addEventListener('change', onEditImageFormOpen);
}());
