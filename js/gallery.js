'use strict';

(function () {
  var RANDOM_PHOTOS = 10;
  var photosContainer = document.querySelector('.pictures');
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var imageFilters = document.querySelector('.img-filters');
  var defaultFilter = imageFilters.querySelector('#filter-default');
  var randomFilter = imageFilters.querySelector('#filter-random');
  var discussedFilter = imageFilters.querySelector('#filter-discussed');

  // Отрисовка фотографий с описанием
  var renderPhotos = function (photoObject) {
    var photoItem = template.cloneNode(true);
    photoItem.querySelector('.picture__img').src = photoObject.url;
    photoItem.querySelector('.picture__likes').textContent = photoObject.likes;
    photoItem.querySelector('.picture__comments').textContent = photoObject.comments.length;
    return photoItem;
  };

  var createPhotosFragment = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var photoElement = renderPhotos(photos[i]);
      photoElement.setAttribute('picture-number', i);
      fragment.appendChild(photoElement);
    }
    photosContainer.appendChild(fragment);
  };

  // Смена состояний кнопок фильтров
  var changeActiveFilter = function (filter) {
    var currentFilter = imageFilters.querySelector('.img-filters__button--active');
    currentFilter.classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
  };

  // Удаление фотографий
  var removePhotos = function () {
    var currentPhotos = photosContainer.querySelectorAll('.picture');
    currentPhotos.forEach(function (photo) {
      photosContainer.removeChild(photo);
    });
  };

  // Отображение дефолтных фотографий
  var getDefaultPhotos = function () {
    var photosArrayCopy = window.photosArray.slice();
    var defaultPhotos = photosArrayCopy;
    createPhotosFragment(defaultPhotos);
    window.filterPhotos = defaultPhotos;
  };

  // Функция перемешивания массива
  var shufflePhotosArray = function (array) {
    var j;
    var temp;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  // Создание массива 10 случайных фотографий
  var getRandomPhotos = function () {
    var photoArrayCopy = window.photosArray.slice();
    var randomPhotos = shufflePhotosArray(photoArrayCopy).slice(0, RANDOM_PHOTOS);
    createPhotosFragment(randomPhotos);
    window.filterPhotos = randomPhotos;
  };

  // Сортировка фотографий по количеству комментариев
  var sortPhotosByComments = function (array) {
    array.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    return array;
  };

  // Создание массива обсуждаемых фотографий
  var getDiscussedPhotos = function () {
    var photosArrayCopy = window.photosArray.slice();
    var discussedPhotos = sortPhotosByComments(photosArrayCopy);
    createPhotosFragment(discussedPhotos);
    window.filterPhotos = discussedPhotos;
  };

  // Обработчик изменения фильтров
  var onFilterClick = window.debounce(function (evt) {
    changeActiveFilter(evt.target);
    removePhotos();
    switch (evt.target) {
      case defaultFilter:
        getDefaultPhotos();
        break;
      case randomFilter:
        getRandomPhotos();
        break;
      case discussedFilter:
        getDiscussedPhotos();
        break;
      default:
        getDefaultPhotos();
    }
  });

  imageFilters.addEventListener('click', onFilterClick);

  var onSuccess = function (data) {
    window.photosArray = data;
    window.filterPhotos = data;
    createPhotosFragment(data);
    imageFilters.classList.remove('img-filters--inactive');
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
