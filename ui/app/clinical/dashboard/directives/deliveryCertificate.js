'use strict';

angular.module('bahmni.clinical')
    .directive('deliveryCertificate', function () {
        var controller = function ($scope) {
            $scope.getCurrentDate = function () {
                return moment().format('DD/MM/YYYY');
            };

            $scope.getFullname = function () {
                return $scope.certificateData.patientInfo.lastName + ' ' + $scope.certificateData.patientInfo.firstName;
            };
        };

        return {
            restrict: 'E',
            controller: controller,
            scope: {
                certificateData: "=",
                isDeliveryCertificateReport: "="
            },
            templateUrl: "dashboard/views/deliveryCertificate.html"
        };
    });
