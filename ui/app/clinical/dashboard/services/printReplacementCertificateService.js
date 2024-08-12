'use strict';

angular.module('bahmni.clinical')
    .service('printReplacementCertificateService', ['$rootScope', '$translate', 'patientService', 'observationsService', 'programService', 'treatmentService', 'localeService', 'patientVisitHistoryService', 'conceptSetService', 'locationService',
        function ($rootScope, $translate, patientService, observationsService, programService, treatmentService, localeService, patientVisitHistoryService, conceptSetService, locationService) {
            var reportModel = {
                username: $rootScope.currentUser.username,
                hospitalLogo: '',
                hospitalName: '',
                hospitalVillage: '',
                leaveDays: '',
                doctor: '',
                startDate: '',
                patientInfo: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    sex: '',
                    patientId: '',
                    phoneNumber: ''
                }
            };

            var patientUuid = '';

            this.getReportModel = function (_patientUuid) {
                patientUuid = _patientUuid;

                return new Promise(function (resolve, reject) {
                    var p1 = populateStartDate();
                    var p2 = populateHospitalNameAndLogo();
                    var p3 = populateDoctor();
                    var p5 = populateNumberOfDays();
                    var p6 = populatePatientNames();

                    Promise.all([p1, p2, p3, p5, p6]).then(function () {
                        resolve(reportModel);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populatePatientNames = function () {
                return new Promise(function (resolve, reject) {
                    patientService.getPatient(patientUuid).then(function (response) {
                        var patientMapper = new Bahmni.PatientMapper($rootScope.patientConfig, $rootScope, $translate);
                        var patient = patientMapper.map(response.data);
                        reportModel.patientInfo.firstName = patient.givenName;
                        reportModel.patientInfo.lastName = patient.familyName;
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateNumberOfDays = function () {
                return new Promise(function (resolve, reject) {
                    var leaveDaysConceptName = 'Number of Days';
                    observationsService.fetch(patientUuid, [leaveDaysConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.leaveDays = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateDoctor = function () {
                return new Promise(function (resolve, reject) {
                    var leaveDaysConceptName = 'Physician’s name';
                    observationsService.fetch(patientUuid, [leaveDaysConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.doctor = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateStartDate = function () {
                return new Promise(function (resolve, reject) {
                    var startDayConceptName = 'Sick Leave Start';
                    observationsService.fetch(patientUuid, [startDayConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.startDate = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populatePatientDemographics = function () {
                return new Promise(function (resolve, reject) {
                    patientService.getPatient(patientUuid).then(function (response) {
                        response.data.person.attributes.forEach(function (attribute) {
                            if (attribute.display.includes("PERSON_ATTRIBUTE_TYPE_PHONE_NUMBER")) {
                                var phoneNumber = attribute.display.split('=')[1].trim();
                                reportModel.patientInfo.phoneNumber = phoneNumber;
                                return;
                            }
                        });

                        var patientMapper = new Bahmni.PatientMapper($rootScope.patientConfig, $rootScope, $translate);
                        var patient = patientMapper.map(response.data);
                        reportModel.patientInfo.firstName = patient.givenName;
                        reportModel.patientInfo.lastName = patient.familyName;
                        reportModel.patientInfo.sex = patient.gender;
                        reportModel.patientInfo.age = patient.age;
                        reportModel.patientInfo.patientId = patient.identifier;
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateHospitalNameAndLogo = function () {
                return new Promise(function (resolve, reject) {
                    localeService.getLoginText().then(function (response) {
                        reportModel.hospitalName = response.data.loginPage.hospitalName;
                        reportModel.hospitalLogo = response.data.loginPage.logo;
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
        }]);
