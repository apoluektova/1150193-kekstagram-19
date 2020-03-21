'use strict';

// TODO: Если случайные данные больше не нужны их генерацию нужно удалить везде

(function () {
  var MESSAGES = ['В целом всё неплохо. Но не всё.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'];
  var NAMES = ['Ариадна', 'Беовульф', 'Виссарион', 'Геннадий', 'Дездемона', 'Евпатий'];
  var PHOTOS_NUMBER = 25;
  var randomInteger = window.util.getRandomInteger;

  // Создание комментариев
  var createComments = function () {
    var comments = [];
    for (var i = 0; i < randomInteger(1, 10); i++) {
      comments[i] = {
        avatar: 'img/avatar-' + randomInteger(1, 6) + '.svg',
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
        likes: randomInteger(15, 200),
        comments: createComments(),
        number: i
      };
    }
    return photoDescriptions;
  };

  window.data = {
    createComments: createComments,
    createPhotos: createPhotoArray
  };
})();
