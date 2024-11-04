'use strict';
angular.module('bahmni.clinical')
    .controller('replacementCertificateController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isReplacementCertificate = $rootScope.isReplacementCertificate;
            $scope.data = $rootScope.data;
        }]);
