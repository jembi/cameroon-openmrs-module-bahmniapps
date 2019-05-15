'use strict';

angular.module('bahmni.registration')
    .factory('registrationCardPrinter', ['printer', '$rootScope', function (printer, $rootScope) {
        var print = function (templatePath, patient, obs, encounterDateTime) {
            templatePath = templatePath || "views/nolayoutfound.html";
            printer.print(templatePath, {patient: patient, hospitalName: $rootScope.hospitalName, today: new Date(), obs: obs || {}, encounterDateTime: encounterDateTime });
        };

        return {
            print: print
        };
    }]);
