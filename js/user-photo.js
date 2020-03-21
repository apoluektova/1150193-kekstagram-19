'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFileInput = window.formUpload.fileInput;
  var image = window.util.image;
  var effectField = window.effect.field;
  var effectsPreview = effectField.querySelectorAll('.effects__preview');
  var createErrorMessage = window.formUpload.createErrorMessage;
  var closeErrorMessage = window.formUpload.closeErrorMessage;

  uploadFileInput.addEventListener('change', function () {
    var file = uploadFileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = 'url(' + reader.result + ')';
        }
      });

      reader.readAsDataURL(file);
    } else {
      createErrorMessage();
    }
  });
})();
