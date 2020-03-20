'use strict';

(function () {
  var REGULAR = /^#?[а-яёa-z\d]+$/;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAGS_NUMBER = 5;
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var hashtagRules = [
    {
      check: function (string) {
        return !string.startsWith('#');
      },
      message: 'Хэш-тег должен начинаться с символа # (решетка). '
    },
    {
      check: function (string) {
        return string.length > MAX_HASHTAG_LENGTH;
      },
      message: 'Хэш-тег не может состоять более чем из ' + MAX_HASHTAG_LENGTH + ' символов. '
    },
    {
      check: function (string) {
        return string.length === 1;
      },
      message: 'Хэш-тег не может состоять из одного символа. '
    },
    {
      check: function (string) {
        return !REGULAR.test(string);
      },
      message: 'Хэш-тег должен состоять только из букв и цифр. '
    }
  ];

  var hashtagArrayRules = [
    {
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
    {
      check: function (array) {
        return array.length > MAX_HASHTAGS_NUMBER;
      },
      message: 'Нельзя указывать более ' + MAX_HASHTAGS_NUMBER + ' хэш-тегов. '
    }
  ];

  var getErrorMessage = function () {
    var hashtagString = hashtagInput.value.toLowerCase();
    var hashtagsArray = hashtagString.trim().split(' ');

    var failedArrayRules = hashtagArrayRules.filter(function (rule) {
      return rule.check(hashtagsArray);
    });
    var failedTagRules = hashtagRules.filter(function (rule) {
      return hashtagsArray.some(function (tag) {
        return rule.check(tag);
      });
    });

    return failedArrayRules
      .concat(failedTagRules)
      .map(function (rule) {
        return rule.message;
      })
      .join(' ');
  };

  var checkComment = function () {
    if (commentInput.maxlength) {
      commentInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    }
  };

  var onHashtagInput = function () {
    var errors = getErrorMessage();
    hashtagInput.setCustomValidity(errors);
  };

  var onCommentInput = function () {
    checkComment();
  };

  hashtagInput.addEventListener('input', onHashtagInput);
  commentInput.addEventListener('input', onCommentInput);

  window.validation = {
    hashtagInput: hashtagInput,
    commentInput: commentInput
  };
}());
