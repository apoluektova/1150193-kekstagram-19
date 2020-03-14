'use strict';

var MESSAGES = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var NAMES = ['Ариадна', 'Беовульф', 'Виссарион', 'Геннадий', 'Дездемона', 'Евпатий'];
var PHOTOS_NUMBER = 25;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var RADIX = 10;
var SCALE_STEP = 25;
var MIN_SCALE_VALUE = 25;
var MAX_SCALE_VALUE = 100;
var DEFAULT_SCALE_VALUE = '100%';
var REGULAR = /^#?[а-яёa-z\d]+$/;
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
      comments: createComments(),
      number: i
    };
  }
  return photoDescriptions;
};

var commentsArray = createComments();
var photoArray = createPhotoArray();

// Отрисовка фотографий с описанием
var template = document.querySelector('#picture').content.querySelector('.picture');
var renderPhotos = function (photoObject) {
  var photoItem = template.cloneNode(true);
  photoItem.querySelector('.picture__img').src = photoObject.url;
  photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
  photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
  photoItem.setAttribute('data-number', photoObject.number);
  return photoItem;
};

// Добавление фотографий с описанием
var photosList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
photoArray.forEach(function (item) {
  fragment.appendChild(renderPhotos(item));
});
photosList.appendChild(fragment);

// Отрисовка одного комментария
var commentsList = document.querySelector('.social__comments');
var commentElement = commentsList.querySelector('.social__comment');
var renderComments = function (commentsBlock) {
  var commentItem = commentElement.cloneNode(true);
  commentItem.querySelector('.social__picture').src = commentsBlock.avatar;
  commentItem.querySelector('.social__picture').alt = commentsBlock.name;
  commentItem.querySelector('.social__text').textContent = commentsBlock.message;
  return commentItem;
};

// Отрисовка списка комментариев
var commentsFragment = document.createDocumentFragment();
commentsArray.forEach(function (item) {
  commentsFragment.appendChild(renderComments(item));
});
commentsList.innerHTML = '';
commentsList.appendChild(commentsFragment);

// Отображение первой фотографии из массива в полноэкранном режиме
var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var bigPictureImage = bigPicture.querySelector('img');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');

// Отрисовка полноразмерного изображения
var renderBigPhoto = function (bigPhoto) {
  openPopup(bigPicture);
  body.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPictureImage.src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  return bigPicture;
};

// Функция закрытия окна полноразмерного изображения по Escape
var onBigPictureEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    bigPicture.classList.add('hidden');
  }
};

// Обработчик клика по списку фотографий
var onBigPictureOpenClick = function (evt) {
  if (evt.target.parentNode.classList.contains('picture')) {
    var pictureNumber = evt.target.parentNode.getAttribute('data-number');
    renderBigPhoto(photoArray[pictureNumber]);
  }
  document.addEventListener('keydown', onBigPictureEscPress);
};

photosList.addEventListener('click', onBigPictureOpenClick);

// Обработчик нажатия по Enter на фотографию
var onBigPictureOpenEnter = function (evt) {
  var focusedPicture = document.activeElement.classList.contains('picture');
  if (evt.key === ENTER_KEY && focusedPicture) {
    var pictureNumber = document.activeElement.getAttribute('data-number');
    renderBigPhoto(photoArray[pictureNumber]);
  }
  document.addEventListener('keydown', onBigPictureEscPress);
};

photosList.addEventListener('keydown', onBigPictureOpenEnter);

// Обработчик закрытия окна полноразмерного изображения
var onBigPictureCancelClick = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

bigPictureClose.addEventListener('click', onBigPictureCancelClick);

var uploadFileInput = document.querySelector('#upload-file');
var editImageForm = document.querySelector('.img-upload__overlay');
var editImageFormClose = editImageForm.querySelector('#upload-cancel');

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

// Функция закрытия любого окна
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

/* var createErrorMessage = function (message) {
  var errorMessages = [];
  errorMessage.push(message);
  return errorMessages;
}; */

/* var checkHashtagValidity = function () {
  var hashtagString = hashtagInput.value.toLowerCase();
  var hashtagsArray = hashtagString.split(' ');
  var errorMessagesArray = [];
  for (var i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i];
    if (hashtag[0] !== '#') {
      errorMessagesArray.push('Хэш-тег должен начинаться с символа # (решетка)');
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorMessagesArray.push('Хэш-тег не может состоять более чем из ' + MAX_HASHTAG_LENGTH + ' символов');
    } else if (hashtag.length === 1) {
      errorMessagesArray.push('Хэш-тег не может состоять из одного символа');
    } else if (!hashtag.match(REGULAR)) {
      errorMessagesArray.push('Хэш-тег должен состоять только из букв и цифр');
    } else if (i !== hashtagsArray.indexOf(hashtag)) {
      errorMessagesArray.push('Один и тот же хэш-тег не может быть исползован дважды');
    } else if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      errorMessagesArray.push('Нельзя указывать более ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов');
    }
  }
  return errorMessagesArray;
}; */

/* var checkHashtagValidity = function () {
  var hashtagString = hashtagInput.value.toLowerCase();
  var hashtagsArray = hashtagString.split(' ');

  var validityMessages = {
    hashMissing: 'Хэш-тег должен начинаться с символа # (решетка). ',
    hashtagTooLong: 'Хэш-тег не может состоять более чем из ' + MAX_HASHTAG_LENGTH + ' символов. ',
    hashtagTooShort: 'Хэш-тег не может состоять из одного символа. ',
    regularMismatch: 'Хэш-тег должен состоять только из букв и цифр. ',
    hashtagDuplicated: 'Один и тот же хэш-тег не может быть исползован дважды. ',
    tooManyHashtags: 'Нельзя указывать более ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов. '
  };

  var finalMessage = {};

  for (var i = 0; i < hashtagsArray.length; i++) {
    var hashtag = hashtagsArray[i];
    if (hashtag[0] !== '#') {
      finalMessage.hashMissing = validityMessages.hashMissing;
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      finalMessage.hashTooLong = validityMessages.hashtagTooLong;
    } else if (hashtag.length === 1) {
      finalMessage.hashTooShort = validityMessages.hashtagTooShort;
    } else if (!hashtag.match(REGULAR)) {
      finalMessage.regularMismatch = validityMessages.regularMismatch;
    } else if (i !== hashtagsArray.indexOf(hashtag)) {
      finalMessage.hashtagDuplicated = validityMessages.hashtagDuplicated;
    } else if (hashtagsArray.length > MAX_HASHTAGS_NUMBER) {
      finalMessage.tooManyHashtags = validityMessages.tooManyHashtags;
    }
  }
  return Object.keys(finalMessage);
}; */
var hashtagRules = [
  {show: false,
    check: function (string) {
      return !string.startsWith('#');
    },
    message: 'Хэш-тег должен начинаться с символа # (решетка). '
  },
  {show: false,
    check: function (string) {
      return string.length > MAX_HASHTAG_LENGTH;
    },
    message: 'Хэш-тег не может состоять более чем из ' + MAX_HASHTAG_LENGTH + ' символов. '
  },
  {show: false,
    check: function (string) {
      return string.length === 1;
    },
    message: 'Хэш-тег не может состоять из одного символа. '
  },
  {show: false,
    check: function (string) {
      return !REGULAR.test(string);
    },
    message: 'Хэш-тег должен состоять только из букв и цифр. '
  }
];

var hashtagArrayRules = [
  {show: false,
    check: function (array) {
      var duplicates = {};
      var duplicateExists = false;
      for (var i = 0; i < array.length; i++) {
        if (!(array[i] in duplicates)) {
          duplicates[array[i]] = true;
        } else {
          duplicateExists = true;
        }
      }
      return duplicateExists;
    },
    message: 'Один и тот же хэш-тег не может быть исползован дважды. '
  },
  {show: false,
    check: function (array) {
      return array.length > MAX_HASHTAGS_NUMBER;
    },
    messaage: 'Нельзя указывать более ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов. '
  }
];

var checkHashtagArray = function () {
  var hashtagString = hashtagInput.value.toLowerCase();
  var hashtagsArray = hashtagString.split(' ');

  for (var i = 0; i < hashtagArrayRules.length; i++) {
    if (!hashtagArrayRules.show) {
      hashtagArrayRules[i].show = hashtagArrayRules[i].check(hashtagsArray);
    }
  }
  return hashtagArrayRules;
};

var checkHashtagValidity = function () {

  var hashtagString = hashtagInput.value.toLowerCase();
  var hashtagsArray = hashtagString.split(' ');

  hashtagsArray.forEach(function (tag) {
    for (var i = 0; i < hashtagRules.length; i++) {
      if (!hashtagRules[i].show) {
        hashtagRules[i].show = hashtagRules[i].check(tag);
      }
    }
  });
  return hashtagRules;
};

var getArrayErrorMessage = function () {
  checkHashtagArray();
  var arrayErrorMessage = '';
  for (var i = 0; i < hashtagArrayRules; i++) {
    if (!hashtagArrayRules[i].show) {
      arrayErrorMessage += hashtagArrayRules[i].message;
    }
  }
  return arrayErrorMessage;
};

var getErrorMessage = function () {
  checkHashtagValidity();
  var errorMessage = getArrayErrorMessage();
  for (var i = 0; i < hashtagRules.length; i++) {
    if (hashtagRules[i].show) {
      errorMessage += hashtagRules[i].message;
    }
  }
  return errorMessage;
};


var onHashtagInput = function () {
  var errors = getErrorMessage();
  hashtagInput.setCustomValidity(errors);
};

hashtagInput.addEventListener('input', onHashtagInput);
