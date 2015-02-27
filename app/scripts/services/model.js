(function() {
  'use strict';

  angular.module('fsJsApp')
    .factory('Model', ModelFactory);

  function ModelFactory() {
    return function(name) {
      this.name = name;
      this.edit = false;
      this.selected = false;
    }
  }

})();
