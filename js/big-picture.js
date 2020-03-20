'use strict';

(function () {
  var ENTER_KEY = window.util.ENTER_KEY;
  var MAX_COMMENT_NUMBER = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('img');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var body = document.querySelector('body');
  var commentsList = document.querySelector('.social__comments');
  var commentElement = commentsList.querySelector('.social__comment');
  var openPopup = window.util.openPopup;
  var onPopupEscPress = window.util.onPopupEscPress;
  var photosContainer = window.gallery.photosContainer;
  var commentsData = [];

  // Отрисовка одного комментария
  var renderComment = function (comment) {
    var commentItem = commentElement.cloneNode(true);
    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__picture').alt = comment.name;
    commentItem.querySelector('.social__text').textContent = comment.message;
    return commentItem;
  };

  // Создание фрагмента комментариев
  var addCommentsFragment = function (commentsArray) {
    commentsList.innerHTML = '';
    var fragment = document.createDocumentFragment();
    commentsArray.forEach(function (comment) {
      var newComment = renderComment(comment);
      fragment.appendChild(newComment);
    });
    return fragment;
  };

  // Загрузка комментариев
  var loadComments = function (commentsArray) {
    var loadedComments = commentsArray.splice(0, MAX_COMMENT_NUMBER);
    var commentsFragment = addCommentsFragment(loadedComments);
    commentsList.appendChild(commentsFragment);
  };

  // Обработчик загрузки комментариев
  var onCommentsLoaderClick = function () {
    loadComments(commentsData);
    if (commentsData.length === 0) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    }
  };

  // Отрисовка полноразмерного изображения
  var renderBigPhoto = function (bigPhoto) {
    openPopup(bigPicture);
    body.classList.add('modal-open');
    bigPictureImage.src = bigPhoto.url;
    bigPicture.querySelector('.likes-count').textContent = bigPhoto.likes;
    bigPicture.querySelector('.comments-count').textContent = bigPhoto.comments.length;
    bigPicture.querySelector('.social__caption').textContent = bigPhoto.description;

    return bigPicture;
  };

  // Обработчик закрытия окна полноразмерного изображения
  var onBigPictureCancelClick = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // Функция закрытия окна полноразмерного изображения по Escape
  var onBigPictureEscPress = function (evt) {
    onPopupEscPress(evt, onBigPictureCancelClick);
  };

  // Вывод полноразмерного изображения со списком комментариев
  var showBigPictureObject = function (pictureObject) {
    renderBigPhoto(pictureObject);
    socialCommentCount.classList.add('hidden');

    commentsData = pictureObject.comments.slice();
    if (pictureObject.comments.length > MAX_COMMENT_NUMBER) {
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    }
    loadComments(commentsData);
  };

  // Обработчик клика по списку фотографий
  var onBigPictureOpenClick = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var pictureNumber = evt.target.parentNode.getAttribute('picture-number');
      var currentPicture = window.photosArray[pictureNumber];
      showBigPictureObject(currentPicture);
    }
    document.addEventListener('keydown', onBigPictureEscPress);
  };


  // Обработчик нажатия по Enter на фотографию
  var onBigPictureOpenEnter = function (evt) {
    var focusedPicture = document.activeElement.classList.contains('picture');
    if (evt.key === ENTER_KEY && focusedPicture) {
      var pictureNumber = document.activeElement.getAttribute('picture-number');
      var currentPicture = window.photosArray[pictureNumber];
      showBigPictureObject(currentPicture);
    }
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  photosContainer.addEventListener('click', onBigPictureOpenClick);
  photosContainer.addEventListener('keydown', onBigPictureOpenEnter);
  bigPictureClose.addEventListener('click', onBigPictureCancelClick);

  window.bigPicture = {
    body: body
  };
})();
