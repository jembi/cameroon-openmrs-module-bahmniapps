'use strict';
angular.module('bahmni.clinical')
    .controller('printHospitalizationReportController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isHospitalizationReport = $rootScope.isHospitalizationReport;
            $scope.certificateData = $rootScope.hospitalizationReportData;
            console.log($scope.certificateData);
        }]);
