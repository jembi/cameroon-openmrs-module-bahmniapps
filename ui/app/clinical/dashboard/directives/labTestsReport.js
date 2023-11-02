'use strict';

angular.module('bahmni.clinical')
    .directive('labTestsReport', function () {
        var controller = function ($scope) {
            $scope.getCurrentDate = function () {
                return moment().format('DD/MM/YYYY');
            };

            $scope.getFullname = function () {
                if ($scope.isLabTestsReport) {
                    return $scope.data.patientInfo.lastName.substring(0, 3) + ' ' + $scope.data.patientInfo.firstName.substring(0, 3);
                } else {
                    return $scope.data.patientInfo.lastName + ' ' + $scope.data.patientInfo.firstName;
                }
            };
        };

        return {
            restrict: 'E',
            controller: controller,
            scope: {
                data: "=",
                // isLabTestsReport: "="
            },
            templateUrl: "dashboard/views/labTestsReport.html"
        };
    });
