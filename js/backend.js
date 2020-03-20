'use strict';


(function () {
  var Url = {
    GET: 'https://js.dump.academy/kekstagram/data',
    SEND: 'https://js.dump.academy/kekstagram'
  };
  var TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500
  };

  var checkRequestStatus = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case Code.NOT_FOUND_ERROR:
            onError('Ошибка 404: не найдено');
            break;
          case Code.SERVER_ERROR:
            onError('Ошибка 500: ошибка сервера');
            break;
          default:
            onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    checkRequestStatus(xhr, onSuccess, onError);
    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var send = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    checkRequestStatus(xhr, onSuccess, onError);
    xhr.open('POST', Url.SEND);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };
})();
