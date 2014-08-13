'use strict';

describe("TreatmentController", function () {

    beforeEach(module('bahmni.clinical'));
    var scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.currentBoard = {extension: {}};
        $rootScope.contextChangeHandler = {add: function () {
        }};

        $controller('TreatmentController', {
            $scope: scope,
            $rootScope: $rootScope,
            treatmentService: null,
            contextChangeHandler: $rootScope.contextChangeHandler,
            registerTabService: null,
            treatmentConfig: {}
        });
    }));

    it("should copy over existing treatment into array of new treatments", function () {
        var treatment = {someObject: true};
        scope.treatment = treatment;
        scope.add();
        expect(scope.treatments.length).toBe(1);
        expect(scope.treatments[0]).toBe(treatment);
    });

    it("should empty treatment on add", function () {
        scope.treatment = {someObject: true};
        scope.add();
        expect(scope.treatment.someObject).toBeFalsy();
    });
});