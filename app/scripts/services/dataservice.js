(function () {
  'use strict';

  angular.module('fsJsApp')
    .factory('dataService', DataService);


  function DataService(Model) {

    var PREFIX = 'fsJs-data';

    var defaultData = [
      new Model('Sample.txt'),
      new Model('Other.doc'),
      new Model('Third.jpg'),
      new Model('Fourth.js')
    ];

    // Public API here
    return {
      getData: function () {
        var data = JSON.parse(localStorage.getItem(PREFIX));
        return  data && data.length ? data : angular.copy(defaultData);
      },
      saveData: function(data) {
        localStorage.setItem(PREFIX, JSON.stringify(data));
      }
    };
  }

})();
