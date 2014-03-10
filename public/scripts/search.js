(function () {
    'use strict';

    angular.module('search', []);

    angular.module('search').controller('SearchCtrl', ['$scope', '$http', '$document', '$window', function ($scope, $http, $document, $window) {
        function handleError(response) {
            $scope.errors = response.data.errors;
        }

        $scope.search = function () {
            $scope.errors = [];
            $scope.username = "";
            $http.get('/api/search', {
                params: {
                    q: $scope.query
                }
            }).then(function (response) {
                $scope.statuses = response.data.statuses;
            }, handleError);
        };

        $scope.user = function () {
            $scope.errors = [];
            $scope.query = "";
            $http.get('/api/user', {
                params: {
                    username: $scope.username
                }
            }).then(function (response) {
                $scope.statuses = response.data;
            }, handleError);
        };

        $scope.goToUser = function (username) {
            $scope.errors = [];
            $scope.query = "";
            $scope.username = username;
            $scope.user();
        };

        $scope.getSelectedText = function () {
            $scope.errors = [];
            $scope.username = "";
            $scope.query = "";
            if ($window.getSelection) {
                $scope.query = $window.getSelection().toString();
            } else if ($document.getSelection) {
                $scope.query = $document.getSelection().toString();
            } else if ($document.selection) {
                $scope.query = $document.selection.createRange().text;
            }
        };
    }]);
}());
