'use strict';

angular.module('bahmni.common.displaycontrol.patientprofile')
    .filter('reverseNames', function () {
        return function (input) {
            if (input.length > 0 && input.indexOf(" ") >= 0) {
                var names = input.split(" ");
                return names[1] + " " + names[0];
            } else {
                return "";
            }
        };
    });
