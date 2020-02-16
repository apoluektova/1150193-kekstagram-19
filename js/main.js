'use strict';

var MESSAGES = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var NAMES = ['Ариадна', 'Беовульф', 'Виссарион', 'Геннадий', 'Дездемона', 'Евпатий'];
var PHOTOS_NUMBER = 25;

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
