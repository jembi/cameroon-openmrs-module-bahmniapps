'use strict';
angular.module('bahmni.clinical')
    .controller('printDeliveryCertificateController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isDeliveryCertificate = $rootScope.isDeliveryCertificate;
            $scope.certificateData = $rootScope.deliveryCertificateData;
        }]);
