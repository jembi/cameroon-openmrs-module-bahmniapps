'use strict';
angular.module('bahmni.clinical')
    .controller('printHospitalizationCertificateController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isHospitalizationCertificate = $rootScope.isHospitalizationCertificate;
            $scope.certificateData = $rootScope.certificateData;
        }]);
