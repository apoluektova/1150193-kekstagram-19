'use strict';

(function () {
  var editImageOverlay = window.util.editImageOverlay;
  var uploadForm = document.querySelector('.img-upload__form');
  var editImageCloseButton = editImageOverlay.querySelector('#upload-cancel');
  var uploadFileInput = document.querySelector('#upload-file');
  var isEscapeEvent = window.util.isEscapeEvent;
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
      isEscapeEvent(evt, editImageOverlayClose);
    }
  };

  // Функция открытия окна редактирования
  var openImageEditOverlay = function () {
    editImageOverlay.classList.remove('hidden');
    body.classList.add('modal-open');

    window.scale.controlValue.value = window.scale.DEFAULT_VALUE;
    removeEffect();
    hideSlider();
    setDefaultValues();
    setEffectListeners();

    editImageCloseButton.addEventListener('click', onEditImageOverlayClose);
    document.addEventListener('keydown', onEditImageOverlayEscPress);
  };

  // Функция закрытия окна редактирования
  var editImageOverlayClose = function () {
    editImageOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    removeEffectListeners();
    uploadForm.reset();
    editImageCloseButton.removeEventListener('click', onEditImageOverlayClose);
    document.removeEventListener('keydown', onEditImageOverlayEscPress);
  };

  // Обработчик закрытия окна редактирования
  var onEditImageOverlayClose = function () {
    editImageOverlayClose();
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
  };

  // Закрытие сообщения об успехе
  var closeSuccessMessage = function () {
    var successOverlay = document.querySelector('.success');
    var successMessageButton = document.querySelector('.success__button');
    successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    main.removeChild(successOverlay);
  };

  // Обработчик закрытия сообщения об успехе
  var onSuccessMessageCloseClick = function () {
    closeSuccessMessage();
  };

  // Обработчик закрытия успешной отправки формы
  var onSuccess = function () {
    editImageOverlayClose();
    createSuccessMessage();

    var successOverlay = document.querySelector('.success');
    var successMessageButton = document.querySelector('.success__button');
    var successField = successOverlay.querySelector('.success__inner');

    document.addEventListener('keydown', onSuccessMessageEscPress);
    successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
    successOverlay.addEventListener('click', function (evt) {
      if (evt.target !== successField) {
        closeSuccessMessage();
      }
    });
  };

  // Обработчик закрытия сообщения об успехе по Escape
  var onSuccessMessageEscPress = function (evt) {
    isEscapeEvent(evt, closeSuccessMessage);
  };

  // Создание сообщения об ошибке при отправке формы
  var createErrorMessage = function () {
    createStatusMessage(errorTemplate);
  };

  // Закрытие сообщения об ошибке при отправке
  var closeErrorMessage = function () {
    var errorOverlay = document.querySelector('.error');
    var errorMessageButton = document.querySelector('.error__button');
    errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
    document.removeEventListener('keydown', onErrorMessageEscPress);
    main.removeChild(errorOverlay);
  };

  // Обработчик закрытия сообщения об ошибке
  var onErrorMessageCloseClick = function () {
    closeErrorMessage();
  };

  // Обработчик закрытия сообщения об ошибке по Escape
  var onErrorMessageEscPress = function (evt) {
    isEscapeEvent(evt, closeErrorMessage);
  };

  // Обработчик закрытия сообщения об ошибке при отправке
  var onError = function () {
    onEditImageOverlayClose();
    createErrorMessage();

    var errorOverlay = document.querySelector('.error');
    var errorMessageButton = errorOverlay.querySelector('.error__button');
    var errorField = errorOverlay.querySelector('.error__inner');

    document.addEventListener('keydown', onErrorMessageEscPress);
    errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
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
    editImageOverlayClose();
  };

  // Обработчик открытия окна редактирования
  var onUploadChange = function () {
    openImageEditOverlay();
  };

  uploadFileInput.addEventListener('change', onUploadChange);
  uploadForm.addEventListener('submit', onFormSubmit);

  window.formUpload = {
    fileInput: uploadFileInput,
    createErrorMessage: createErrorMessage,
    closeErrorMessage: closeErrorMessage
  };
}());
