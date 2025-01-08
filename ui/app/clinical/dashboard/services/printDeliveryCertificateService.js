'use strict';

angular.module('bahmni.clinical')
    .service('printDeliveryCertificateService', ['$rootScope', '$translate', 'patientService', 'observationsService', 'programService', 'treatmentService', 'localeService', 'patientVisitHistoryService', 'conceptSetService', 'locationService',
        function ($rootScope, $translate, patientService, observationsService, programService, treatmentService, localeService, patientVisitHistoryService, conceptSetService, locationService) {
            var reportModel = {
                username: $rootScope.currentUser.username,
                hospitalLogo: '',
                hospitalName: '',
                hospitalVillage: '',
                patientInfo: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    birthDate: '',
                    sex: '',
                    patientId: '',
                    phoneNumber: '',
                    occupation: ''
                }
            };

            var patientUuid = '';

            this.getReportModel = function (_patientUuid) {
                patientUuid = _patientUuid;

                return new Promise(function (resolve, reject) {
                    var p1 = populatePatientDemographics();
                    var p2 = populateHospitalNameAndLogo();
                    var p3 = populateHospitalVillage();
                    var p4 = populatePatientOccupation();

                    Promise.all([p1, p2, p3, p4]).then(function () {
                        resolve(reportModel);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateHospitalVillage = function () {
                locationService.getAllByTag('Visit Location')
                    .then(function (response) {
                        reportModel.hospitalVillage = response.data.results[0].cityVillage;
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            };

            var populatePatientOccupation = function () {
                return new Promise(function (resolve, reject) {
                    patientService.getPatient(patientUuid).then(function (response) {
                        var patientData = response.data;
                        patientData.person.attributes.forEach(function (attribute) {
                            if (attribute.attributeType.display === "occupation") {
                                var occupation = attribute.value.display;
                                reportModel.patientInfo.occupation = occupation;
                                return;
                            }
                        });

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
                        const birthdate = new Date(patient.birthdate);
                        const formattedDate = formatDateToYMD(birthdate);
                        reportModel.patientInfo.birthDate = formattedDate;
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            function formatDateToYMD (date) {
                if (!(date instanceof Date) || isNaN(date)) {
                    throw new Error("Invalid Date object");
                }
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                return year + '/' + month + '/' + day;
            }
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
