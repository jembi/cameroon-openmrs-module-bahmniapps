'use strict';

Bahmni.Common.VisitControl = function (visitTypes, defaultVisitTypeName, encounterService,
                                       $translate, visitService, $rootScope) {
    var self = this;
    self.visitTypes = visitTypes;
    self.visitTypes = _.map(self.visitTypes, function (currentObj) {
        currentObj.visitKey = currentObj.name;
        return currentObj;
    });
    self.defaultVisitTypeName = defaultVisitTypeName;
    self.defaultVisitType = visitTypes.filter(function (visitType) {
        return visitType.name === defaultVisitTypeName;
    })[0];

    self.startButtonText = function (visitType) {
        visitType.name = $translate.instant(visitType.name);
        return $translate.instant('REGISTRATION_START_VISIT', {visitType: visitType.name});
    };
    self.startVisit = function (visitType) {
        self.onStartVisit();
        self.selectedVisitType = visitType;
    };

    self.createVisitOnly = function (patientUuid, visitLocationUuid, allLocationData, visitTypeLocationMapping) {
        allLocationData = allLocationData.results;
        var visitType = self.selectedVisitType || self.defaultVisitType;
        var visitKey = visitType.visitKey;
        var actualLocationUuid, correctVisitLocation;
        var correctVisitObj = {};
        correctVisitObj = _.map(visitTypeLocationMapping, function (currentObj) {
            if (currentObj.hasOwnProperty(visitKey)) {
                return currentObj;
            }
        });
        correctVisitObj = _.filter(correctVisitObj);
        var currentCorrectVisitObj = correctVisitObj[0];
        for (var propName in currentCorrectVisitObj) {
            if (currentCorrectVisitObj.hasOwnProperty(propName)) {
                correctVisitLocation = currentCorrectVisitObj[propName];
            }
        }
        actualLocationUuid = _.map(allLocationData, function (currentObj) {
            if (currentObj.display == correctVisitLocation) {
                return currentObj.uuid;
            }
        });
        actualLocationUuid = _.filter(actualLocationUuid);
        var visitDetails = {
            patient: patientUuid,
            visitType: visitType.uuid,
            location: actualLocationUuid[0]
        };
        $rootScope.actualLocationUuid = actualLocationUuid[0];
        return visitService.createVisit(visitDetails);
    };
};
