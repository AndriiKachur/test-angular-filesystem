(function () {
  'use strict';

  angular.module('fsJsApp').controller('MainCtrl', MainController);

  function MainController($scope, dataService, Model) {

    /* adding new file feature */
    $scope.new = {
      fileName: null,
      show: false,
      addNew: function () {
        var name = $scope.new.fileName;
        if (name) {
          $scope.files.unshift(new Model(name));
        }
        $scope.new.fileName = null;
        $scope.new.show = false;
      }
    };

    /* editing files feature */
    $scope.edit = {
      ids: [],
      startEdit: function () {
        $scope.edit.ids = $scope.files.map(function (item) {
          return item.selected ? item : null;
        });
      },
      isEditing: function (index) {
        return !!$scope.edit.ids[index];
      },
      saveEdit: function (file, name, index) {
        file.name = name;
        $scope.edit.ids[index] = null;
      },
      cancel: function (index) {
        $scope.edit.ids[index] = null;
      }
    };

    $scope.removeFiles = function () {
      var result = confirm('Are you sure you want to remove selected files?');
      if (result) {
        $scope.files = $scope.files.map(function (item) {
          return item.selected ? null : item;
        }).filter(function (item) {
          return item;
        });
      }
    };

    $scope.$watch('files', function (data) {
      $scope.selectedCount = data.filter(function (item) {
        return item.selected;
      }).length;

      $scope.selectAll = $scope.selectedCount === data.length;

      dataService.saveData(data);
    }, true);


    $scope.toggleAll = function (newValue) {
      $scope.files.forEach(function (item) {
        item.selected = newValue;
      });
    };

    (function init() {
      $scope.files = dataService.getData();
    })();

  }

})();
