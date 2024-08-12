'use strict';
angular.module('bahmni.clinical')
    .controller('pregnancyCertificateController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.ispregnantCertificate = $rootScope.ispregnantCertificate;
            $scope.data = $rootScope.data;
        }]);
