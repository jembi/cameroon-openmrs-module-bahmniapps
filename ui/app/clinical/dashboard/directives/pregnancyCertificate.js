'use strict';

angular.module('bahmni.clinical')
    .directive('pregnancyCertificate', function () {
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
                ispregnantCertificate: "="
            },
            templateUrl: "dashboard/views/pregnancyCertificate.html"
        };
    });
