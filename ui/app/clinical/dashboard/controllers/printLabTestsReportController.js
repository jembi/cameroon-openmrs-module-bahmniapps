'use strict';
angular.module('bahmni.clinical')
    .controller('PrintLabTestsReportController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isLabTestsReport = $rootScope.isLabTestsReport;
            $scope.data = $rootScope.labTestsReportData;
        }]);
