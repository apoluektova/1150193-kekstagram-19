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
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

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

  // Закрытие сообщения об отправке формы
  var closeSuccessMessage = function () {
    var successOverlay = document.querySelector('.success');
    main.removeChild(successOverlay);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
  };

  // Обработчик закрытия сообщения об успешной отправке
  var onSuccess = function () {
    onEditImageOverlayClose();
    createSuccessMessage();

    var successOverlay = document.querySelector('.success');
    var successMessageButton = successOverlay.querySelector('.success__button');
    var successField = successOverlay.querySelector('.success__inner');

    document.addEventListener('keydown', onSuccessMessageEscPress);
    successMessageButton.addEventListener('click', closeSuccessMessage);
    successOverlay.addEventListener('click', function (evt) {
      if (evt.target !== successField) {
        closeSuccessMessage();
      }
    });
  };

  // Обработчик закрытия сообщения об успехе по Escape
  var onSuccessMessageEscPress = function (evt) {
    onPopupEscPress(evt, closeSuccessMessage);
  };

  // Создание сообщения об отправке формы
  var createStatusMessage = function (template) {
    var statusMessage = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(statusMessage);
    main.appendChild(fragment);
  };

  // Создание сообщения об успешной отправке формы
  var createSuccessMessage = function () {
    createStatusMessage(successTemplate);
    var successMessageButton = document.querySelector('.success__button');
    successMessageButton.addEventListener('click', onSuccess);
  };

  // Создание сообщения об ошибке при отправке формы
  var createErrorMessage = function () {
    createStatusMessage(errorTemplate);
    var errorMessageButton = document.querySelector('.error__button');
    errorMessageButton.addEventListener('click', onError);
  };

  // Закрытие сообщения об ошибке при отправке
  var closeErrorMessage = function () {
    var errorOverlay = document.querySelector('.error');
    main.removeChild(errorOverlay);
    document.removeEventListener('keydown', onErrorMessageEscPress);
  };

  // Обработчик закрытия сообщения об ошибке по Escape
  var onErrorMessageEscPress = function (evt) {
    onPopupEscPress(evt, closeErrorMessage);
  };

  // Обработчик закрытия сообщения об ошибке при отправке
  var onError = function () {
    onEditImageOverlayClose();
    createErrorMessage();

    var errorOverlay = document.querySelector('.error');
    var errorMessageButton = errorOverlay.querySelector('.error__button');
    var errorField = errorOverlay.querySelector('.error__inner');

    document.addEventListener('keydown', onErrorMessageEscPress);
    errorMessageButton.addEventListener('click', closeSuccessMessage);
    errorOverlay.addEventListener('click', function (evt) {
      if (evt.target !== errorField) {
        closeErrorMessage();
      }
    });
  };

  // Обработчик отправки формы
  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(uploadForm), onSuccess, onError);
    onEditImageOverlayClose();
  };

  uploadFileInput.addEventListener('change', onEditImageOverlayOpen);
  uploadForm.addEventListener('submit', onFormSubmit);
}());
