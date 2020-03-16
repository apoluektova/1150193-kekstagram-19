'use strict';

(function () {
  var ENTER_KEY = window.util.ENTER_KEY;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('img');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var body = document.querySelector('body');
  var commentsList = document.querySelector('.social__comments');
  var commentElement = commentsList.querySelector('.social__comment');
  var commentsFragment = document.createDocumentFragment();
  var photoArray = window.data.photoArray;
  var commentsArray = window.data.commentsArray;
  var photosList = window.gallery.photosList;
  var openPopup = window.util.openPopup;
  var onPopupEscPress = window.util.onPopupEscPress;

  // Отрисовка одного комментария
  var renderComments = function (commentsBlock) {
    var commentItem = commentElement.cloneNode(true);
    commentItem.querySelector('.social__picture').src = commentsBlock.avatar;
    commentItem.querySelector('.social__picture').alt = commentsBlock.name;
    commentItem.querySelector('.social__text').textContent = commentsBlock.message;
    return commentItem;
  };

  // Отрисовка списка комментариев
  var createCommentsFragment = function () {
    commentsArray.forEach(function (item) {
      commentsFragment.appendChild(renderComments(item));
    });
    commentsList.innerHTML = '';
    commentsList.appendChild(commentsFragment);
  };

  createCommentsFragment();

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

  // Обработчик клика по списку фотографий
  var onBigPictureOpenClick = function (evt) {
    if (evt.target.parentNode.classList.contains('picture')) {
      var pictureNumber = evt.target.parentNode.getAttribute('data-number');
      renderBigPhoto(photoArray[pictureNumber]);
    }
    document.addEventListener('keydown', onBigPictureEscPress);
  };


  // Обработчик нажатия по Enter на фотографию
  var onBigPictureOpenEnter = function (evt) {
    var focusedPicture = document.activeElement.classList.contains('picture');
    if (evt.key === ENTER_KEY && focusedPicture) {
      var pictureNumber = document.activeElement.getAttribute('data-number');
      renderBigPhoto(photoArray[pictureNumber]);
    }
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  photosList.addEventListener('click', onBigPictureOpenClick);
  photosList.addEventListener('keydown', onBigPictureOpenEnter);
  bigPictureClose.addEventListener('click', onBigPictureCancelClick);

  window.bigPicture = {
    body: body
  };
})();
