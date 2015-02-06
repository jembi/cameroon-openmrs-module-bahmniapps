'use strict';

describe('Disposition DisplayControl', function () {
    var q,
        dispositions,
        compile,
        mockBackend,
        rootScope,
        deferred,
        simpleHtml = '<disposition id="disposition" params="section" patient-uuid="patientUuid"></disposition>';

    var dispositions = [
        {
            "code": "ABSCONDING",
            "voided": false,
            "voidReason": null,
            "conceptName": "Absconding",
            "dispositionDateTime": "2014-12-16T16:06:49.000+0530",
            "additionalObs": [
                {
                    "voided": false,
                    "concept": {
                        "uuid": "5723b2f2-9bc6-11e3-927e-8840ab96f0f1",
                        "conceptClass": null,
                        "shortName": null,
                        "units": null,
                        "dataType": null,
                        "name": "Disposition Note",
                        "set": false
                    },
                    "uuid": "666e89b0-05f2-4037-955e-186d412f9da5",
                    "voidReason": null,
                    "groupMembers": [],
                    "observationDateTime": null,
                    "orderUuid": null,
                    "value": "notes",
                    "comment": null
                }
            ],
            "existingObs": "a26a8c32-6fc1-4f5e-8a96-f5f5b05b87de",
            "providers": [
                {
                    "uuid": "d390d057-ec33-45c1-8342-9e23d706aa4d",
                    "name": "Surajkumar Surajkumar Surajkumar"
                }
            ]
        }
    ];

    beforeEach(module('bahmni.clinical'), function($provide){
        var _spinner = jasmine.createSpyObj('spinner',['forPromise','then']);
        _spinner.forPromise.and.callFake(function(){
            deferred = q.defer();
            deferred.resolve({data: dispositions});
            return deferred.promise;
        });

        _spinner.then.and.callThrough({data: dispositions});

        $provide.value('spinner', _spinner);
    });

    beforeEach(inject(function ($compile, $httpBackend, $rootScope,$q) {
        compile = $compile;
        mockBackend = $httpBackend;
        rootScope = $rootScope;
        q = $q;
    }));

    it('should call dispositons by visit when visitUuid is passed', function () {
        var scope = rootScope.$new();

        scope.section = {
            visitUuid: "1234"
        };

        mockBackend.expectGET('displaycontrols/disposition/views/disposition.html').respond("<div>dummy</div>");
        mockBackend.expectGET('/openmrs/ws/rest/v1/bahmnicore/disposition/visit?visitUuid=1234').respond(dispositions);

        var element = compile(simpleHtml)(scope);

        scope.$digest();
        mockBackend.flush();

        var compiledElementScope = element.isolateScope();
        scope.$digest();

        expect(compiledElementScope.dispositions).not.toBeUndefined();
        expect(compiledElementScope.dispositions).toEqual(dispositions);
    });

    it('should call dispositions by patient when visitUuid is NOT passed', function () {
        var scope = rootScope.$new();

        scope.section = {
            numberOfVisits: 4
        };
        scope.patientUuid="123456"

        mockBackend.expectGET('displaycontrols/disposition/views/disposition.html').respond("<div>dummy</div>");
        mockBackend.expectGET('/openmrs/ws/rest/v1/bahmnicore/disposition/patient?numberOfVisits=4&patientUuid=123456').respond(dispositions);

        var element = compile(simpleHtml)(scope);

        scope.$digest();
        mockBackend.flush();

        var compiledElementScope = element.isolateScope();
        scope.$digest();

        expect(compiledElementScope.dispositions).not.toBeUndefined();
        expect(compiledElementScope.dispositions).toEqual(dispositions);

    });

    it('should return noDispositions message when dispositions are not available', function () {
        var scope = rootScope.$new();

        scope.section = {
            numberOfVisits: 4
        };
        scope.patientUuid="123456"

        mockBackend.expectGET('displaycontrols/disposition/views/disposition.html').respond("<div>dummy</div>");
        mockBackend.expectGET('/openmrs/ws/rest/v1/bahmnicore/disposition/patient?numberOfVisits=4&patientUuid=123456').respond([]);

        var element = compile(simpleHtml)(scope);

        scope.$digest();
        mockBackend.flush();

        var compiledElementScope = element.isolateScope();
        scope.$digest();

        expect(compiledElementScope.dispositions).not.toBeUndefined();
        expect(compiledElementScope.noDispositionsMessage).toEqual(Bahmni.Clinical.Constants.messageForNoDisposition);

    });

    it('should return noDispositions message when dispositions are not available', function () {
        var scope = rootScope.$new();

        scope.section = {
            numberOfVisits: 4
        };
        scope.patientUuid="123456"

        mockBackend.expectGET('displaycontrols/disposition/views/disposition.html').respond("<div>dummy</div>");
        mockBackend.expectGET('/openmrs/ws/rest/v1/bahmnicore/disposition/patient?numberOfVisits=4&patientUuid=123456').respond([]);

        var element = compile(simpleHtml)(scope);

        scope.$digest();
        mockBackend.flush();

        var compiledElementScope = element.isolateScope();
        scope.$digest();

        expect(compiledElementScope.dispositions).not.toBeUndefined();
        expect(compiledElementScope.noDispositionsMessage).toEqual(Bahmni.Clinical.Constants.messageForNoDisposition);

    });

});