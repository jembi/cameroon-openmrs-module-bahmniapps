'use strict';

angular.module('bahmni.clinical')
    .directive('replacementCertificate', function () {
        var controller = function ($scope) {
            $scope.getCurrentDate = function () {
                return moment().format('DD/MM/YYYY');
            };

            $scope.getFullname = function () {
                return $scope.data.patientInfo.lastName + ' ' + $scope.data.patientInfo.firstName;
            };
        };

        return {
            restrict: 'E',
            controller: controller,
            scope: {
                data: "=",
                isReplacementCertificate: "="
            },
            templateUrl: "dashboard/views/medicalReplacementCertificate.html"
        };
    });
