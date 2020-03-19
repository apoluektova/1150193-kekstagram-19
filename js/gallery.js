'use strict';

(function () {
  var photosContainer = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  // var createPhotos = window.data.createPhotos;

  // Отрисовка фотографий с описанием
  var renderPhotos = function (photoObject) {
    var photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photoObject.url;
    photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
    photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
    return photoItem;
  };

  // Добавление фотографий с описанием
  /* var createPhotosFragment = function (photos) {
    photos.forEach(function (item, index) {
      fragment.appendChild(renderPhotos(item));
      photos.setAttribute('picture-number', index);
    });
    photosContainer.appendChild(fragment);
  }; */
  var createPhotosFragment = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var photoElement = renderPhotos(photos[i]);
      photoElement.setAttribute('picture-number', i);
      fragment.appendChild(photoElement);
    }
    photosContainer.appendChild(fragment);
  };

  var onSuccess = function (data) {
    window.photosArray = data;
    createPhotosFragment(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '26px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onSuccess, onError);

  window.gallery = {
    photosContainer: photosContainer,
    createPhotosFragment: createPhotosFragment,
  };
}());
