'use strict';

/* 
   Смысл понятия debounce - вызывать функцию НЕ ЧАЩЕ чем раз в N ms,
   т.е. при первом вызове мы исполняем функцию НЕМЕДЛЕННО, а затем последующие вызовы
   либо игнорируем N ms, либо исполняем через N ms (в зависимости от того что хотим получить)

   То что здесь написано называется throttling - откладывать исполнение функции до тех пор пока не пройдёт N ms
   с момента последнего вызова
*/ 

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
