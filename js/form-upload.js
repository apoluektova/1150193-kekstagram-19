// модуль, который работает с формой редактирования изображения
'use strict';

(function () {
  var editImageOverlay = window.util.editImageOverlay;
  var uploadForm = document.querySelector('.img-upload__form');
  var editImageOverlayClose = editImageOverlay.querySelector('#upload-cancel');
  var uploadFileInput = document.querySelector('#upload-file');
  var openPopup = window.util.openPopup;
  var closePopup = window.util.closePopup;
  var onPopupEscPress = window.util.onPopupEscPress;
  var body = window.bigPicture.body;
  var hashtagInput = window.validation.hashtagInput;
  var commentInput = window.validation.commentInput;
  var hideSlider = window.slider.hide;
  var removeEffect = window.effect.remove;
  var setDefaultValues = window.slider.setDefault;
  var setEffectListeners = window.effect.setListeners;
  var removeEffectListeners = window.effect.removeListeners;

  // Функция закрытия окна редактирования по Escape
  var onEditImageOverlayEscPress = function (evt) {
    var active = document.activeElement;
    if (hashtagInput !== active && commentInput !== active) {
      onPopupEscPress(evt, onEditImageOverlayClose);
    }
  };

  // Функция открытия окна редактирования
  var onEditImageOverlayOpen = function () {
    openPopup(editImageOverlay);
    body.classList.add('modal-open');

    window.scale.controlValue.value = window.scale.DEFAULT_VALUE;
    removeEffect();
    hideSlider();
    setDefaultValues();
    setEffectListeners();

    editImageOverlayClose.addEventListener('click', onEditImageOverlayClose);
    document.addEventListener('keydown', onEditImageOverlayEscPress);
  };

  // Функция закрытия окна редактирования
  var onEditImageOverlayClose = function () {
    closePopup(editImageOverlay);
    body.classList.remove('modal-open');
    removeEffectListeners();
    uploadForm.reset();
    editImageOverlayClose.removeEventListener('click', onEditImageOverlayClose);
    document.removeEventListener('keydown', onEditImageOverlayEscPress);
  };

  // Обработчик отправки формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();
  };

  uploadFileInput.addEventListener('change', onEditImageOverlayOpen);
  uploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadForm), function (response) {
      editImageOverlay.classList.add('hidden');
    });
    evt.preventDefault();
  });
}());
