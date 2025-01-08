'use strict';
angular.module('bahmni.clinical')
    .controller('printAuthorizationOfTubalLegationController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {
            $scope.isTubalLegationReport = $rootScope.isTubalLegationReport;
            $scope.certificateData = $rootScope.tubalLegationReportData;
        }]);
