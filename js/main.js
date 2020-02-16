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

var commentsArray = createComments();
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

// Отображение первой фотографии из массива в полноэкранном режиме
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

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

// Отрисовка полноразмерного изображения
var renderBigPhoto = function (bigPhoto) {
  bigPicture.querySelector('.big-picture__img').src = bigPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;
  return bigPicture;
};

renderBigPhoto(photoArray[0]);

var socialCommentCount = document.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
var commentsLoader = document.querySelector('.comments-loader');
var body = document.querySelector('body');
body.classList.add('modal-open');
commentsLoader.classList.add('hidden');
