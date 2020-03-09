'use strict';

var MESSAGES = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var NAMES = ['Ариадна', 'Беовульф', 'Виссарион', 'Геннадий', 'Дездемона', 'Евпатий'];
var PHOTOS_NUMBER = 25;
var ESC_KEY = 'Escape';
var RADIX = 10;
var SCALE_STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var DEFAULT_SCALE_VALUE = '100%';
var REGULAR = /^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/g;
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS_NUMBER = 5;

// Получение случайного числа из заданного промежутка
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание комментариев
var createComments = function () {
  var comments = [];
  for (var i = 0; i < getRandomInteger(1, 10); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
      name: NAMES[Math.floor(Math.random() * NAMES.length)]
    };
  }
  return comments;
};

// Создание объекта из фотографии и ее описания
var createPhotoArray = function () {
  var photoDescriptions = [];
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    photoDescriptions[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInteger(15, 200),
      comments: createComments()
    };
  }
  return photoDescriptions;
};

var photoArray = createPhotoArray();

// Отрисовка фотографий с описанием
var template = document.querySelector('#picture').content.querySelector('.picture');
var renderPhotos = function (photoObject) {
  var photoItem = template.cloneNode(true);
  photoItem.querySelector('.picture__img').src = photoObject.url;
  photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
  photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
  return photoItem;
};

// Добавление фотографий с описанием
var photosList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
photoArray.forEach(function (item) {
  fragment.appendChild(renderPhotos(item));
});
photosList.appendChild(fragment);


var uploadFileInput = document.querySelector('#upload-file');
var editImageForm = document.querySelector('.img-upload__overlay');
var editImageFormClose = editImageForm.querySelector('#upload-cancel');
var body = document.querySelector('body');

// Функция закрытия окна по Escape
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    editImageForm.classList.add('hidden');
  }
};

// Функция открытия любого окна
var openPopup = function (popup) {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Функция открытия окна редактирования
var onUploadFileChange = function () {
  openPopup(editImageForm);
  body.classList.add('modal-open');
};

// Функция закрытия окна редактирования
var onUploadCancelClick = function () {
  closePopup(editImageForm);
  body.classList.remove('modal-open');
  uploadFileInput = '';
};

uploadFileInput.addEventListener('change', onUploadFileChange);
editImageFormClose.addEventListener('click', onUploadCancelClick);

// Баг - если закрываю окно редактирования по ESC, а потом открываю заново и выбираю ту же фотографию - окно не открывается - то есть событие change не срабатывает после ESC

// Редактирование размера изображения
var scaleMinus = editImageForm.querySelector('.scale__control--smaller');
var scalePlus = editImageForm.querySelector('.scale__control--bigger');
var scaleValue = editImageForm.querySelector('.scale__control--value');
var imagePreview = editImageForm.querySelector('.img-upload__preview');
var image = imagePreview.querySelector('img');

// Преобразование значения масштаба
var getValue = function () {
  var value = parseInt(scaleValue.value, RADIX);
  return value;
};

// Уменьшение масштаба
var decreaseScaleValue = function () {
  if (getValue() > MIN_SCALE_VALUE && (getValue() - SCALE_STEP) > MIN_SCALE_VALUE) {
    scaleValue.value = (getValue() - SCALE_STEP) + '%';
  } else {
    scaleValue.value = MIN_SCALE_VALUE + '%';
  }
};

// Увеличение масштаба
var increaseScaleValue = function () {
  if (getValue() < MAX_SCALE_VALUE && (getValue() + SCALE_STEP) < MAX_SCALE_VALUE) {
    scaleValue.value = (getValue() + SCALE_STEP) + '%';
  } else {
    scaleValue.value = MAX_SCALE_VALUE + '%';
  }
};

// Масштабирование изображения
var scaleImage = function () {
  image.style.transform = 'scale(' + (parseInt(scaleValue.value, RADIX) / 100) + ')';
};

var onScaleMinusClick = function () {
  decreaseScaleValue();
  scaleImage();
};

var onScalePlusClick = function () {
  increaseScaleValue();
  scaleImage();
};

scaleValue.value = DEFAULT_SCALE_VALUE;

scaleMinus.addEventListener('click', onScaleMinusClick);
scalePlus.addEventListener('click', onScalePlusClick);

// Скрытие слайдера
var slider = document.querySelector('.effect-level');
var hideSlider = function () {
  slider.classList.add('hidden');
};

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
var effectField = document.querySelector('.effects');
effectField.addEventListener('click', onEffectChange);

// Изменение интенсивности эффекта с помощью слайдера
var effectPin = slider.querySelector('.effect-level__pin');
// var effectValue = slider.querySelector('.effect-level__value');
var effectLine = slider.querySelector('.effect-level__line');
var effectDepth = slider.querySelector('.effect-level__depth');

effectPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordX - moveEvt.clientX;
    startCoordX = moveEvt.clientX;

    var endPinX = (effectPin.offsetLeft - shiftX);
    if (endPinX >= 0 && endPinX <= effectLine.offsetWidth) {
      effectPin.style.left = endPinX + 'px';
      effectDepth.style.width = endPinX + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

// Валидация
var hashtagInput = document.querySelector('.text__hashtags');
var hashtagString = hashtagInput.value.toLowerCase();

var hashtagsArray = hashtagString.split(' ');

/* var createErrorMessage = function (message) {
  var errorMessages = [];
  errorMessage.push(message);
  return errorMessages;
}; */

var checkHashtagValidity = function () {
  var errorMessagesArray = [];
  for (var i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i];
    if (hashtag[0] !== '#') {
      errorMessagesArray.push('Хэш-тег должен начинаться с символа # (решетка)');
    } else if (!REGULAR.test(hashtag[i])) {
      errorMessagesArray.push('Хэш-тег должен состоять только из букв и цифр');
    } else if (hashtag.length === 1) {
      errorMessagesArray.push('Хэш-тег не может состоять из одного символа');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorMessagesArray.push('Хэш-тег не может состоять более чем из' + MAX_HASHTAG_LENGTH + 'символов');
    } else if (!hashtag === hashtagsArray.indexOf(hashtag)) {
      errorMessagesArray.push('Один и тот же хэш-тег не может быть исползован дважды');
    } else if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      errorMessagesArray.push('Нельзя указывать более' + MAX_HASHTAGS_NUMBER + 'хэш-тегов');
    }
  }
  return errorMessagesArray;
};

var onHashtagInput = function () {
  var errors = checkHashtagValidity();
  hashtagInput.setCustomValidity(errors);
};

hashtagInput.addEventListener('change', onHashtagInput);
