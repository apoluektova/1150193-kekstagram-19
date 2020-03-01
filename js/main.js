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

// Сброс текущего эффекта
/* var resetCurrentEffect = function () {
  var emptyClass = '';
  image.classList.add(emptyClass);
}; */

// Переключение фильтров
var effectField = document.querySelector('.effects');
var onEffectChange = function (evt) {
  if (evt.target && evt.target.matches('#effect-none')) {
    hideSlider();
    image.classList.add('effects__preview--none');
  } else if (evt.target && evt.target.matches('#effect-chrome')) {
    image.classList.add('effects__preview--chrome');
  } else if (evt.target && evt.target.matches('#effect-sepia')) {
    image.classList.add('effects__preview--sepia');
  } else if (evt.target && evt.target.matches('#effect-marvin')) {
    image.classList.add('effects__preview--marvin');
  } else if (evt.target && evt.target.matches('#effect-phobos')) {
    image.classList.add('effects__preview--phobos');
  } else if (evt.target && evt.target.matches('#effect-heat')) {
    image.classList.add('effects__preview--heat');
  }
};

effectField.addEventListener('click', onEffectChange);
