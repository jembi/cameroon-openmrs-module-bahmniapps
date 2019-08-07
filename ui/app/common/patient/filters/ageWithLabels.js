'use strict';

angular.module('bahmni.common.patient')
.filter('ageLabels', ['$translate', function ($translate) {
    return function (age) {
        if (age.years) {
            return age.years + " " + $translate.instant("REGISTRATION_YEARS_TRANSLATION_KEY");
        }
        if (age.months) {
            return age.months + " " + $translate.instant("REGISTRATION_MONTHS_TRANSLATION_KEY");
        }
        return age.days + " " + $translate.instant("REGISTRATION_DAYS_TRANSLATION_KEY");
    };
}]);
