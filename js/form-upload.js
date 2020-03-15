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
  var image = window.effect.image;
  var originalEffect = editImageForm.querySelector('[value="none"]');

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
    document.addEventListener('keydown', onEditImageFormEscPress);
    body.classList.add('modal-open');
    window.slider.hideSlider();
  };

  // Функция закрытия окна редактирования
  var onEditImageFormClose = function () {
    closePopup(editImageForm);
    document.removeEventListener('keydown', onEditImageFormEscPress);
    body.classList.remove('modal-open');
    uploadFileInput.value = '';
    image.style.filter = '';
    image.style.transform = '';
    window.scale.scaleValue.value = window.DEFAULT_SCALE_VALUE;
    hashtagInput.value = '';
    commentInput.value = '';
    originalEffect.checked = true;
  };

  uploadFileInput.addEventListener('change', onEditImageFormOpen);
  editImageFormClose.addEventListener('click', onEditImageFormClose);
}());
