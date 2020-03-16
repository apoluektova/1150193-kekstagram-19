'use strict';

(function () {
  var photosList = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var photoArray = window.data.photoArray;

  // Отрисовка фотографий с описанием
  var renderPhotos = function (photoObject) {
    var photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photoObject.url;
    photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
    photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
    photoItem.setAttribute('data-number', photoObject.number);
    return photoItem;
  };

  // Добавление фотографий с описанием
  var createPhotosFragment = function () {
    photoArray.forEach(function (item) {
      fragment.appendChild(renderPhotos(item));
    });
    photosList.appendChild(fragment);
  };

  createPhotosFragment();

  window.gallery = {
    photosList: photosList
  };
}());
