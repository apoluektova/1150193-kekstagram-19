'use strict';

var messages = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
var names = ['Ариадна', 'Беовульф', 'Виссарион', 'Геннадий', 'Дездемона', 'Евпатий'];
var photosNumber = 25;

// Получение случайного числа из заданного промежутка
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание комментариев
var createComments = function () {
  var comments = [];
  for (i = 0; i < getRandomInteger(1, 10); i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: messages[Math.floor(Math.random() * messages.length)],
      name: names[Math.floor(Math.random() * names.length)]
    };
  }
  return comments;
};

// Создание объекта из фотографии и ее описания
var createPhotoDescription = function () {
  var photoDescriptions = [];
  for (var i = 0; i < photosNumber; i++) {
    photoDescriptions[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInteger(15, 200),
      comments: createComments()
    };
  }
  return photoDescriptions;
};

var photoArray = createPhotoDescription();

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
for (var i = 0; i < photosNumber; i++) {
  fragment.appendChild(renderPhotos(photoArray[i]));
}
photosList.appendChild(fragment);
