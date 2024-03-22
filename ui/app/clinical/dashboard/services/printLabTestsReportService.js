'use strict';

angular.module('bahmni.clinical')
    .service('printLabTestsReportService', ['$rootScope', '$translate', 'patientService', 'observationsService', 'programService', 'treatmentService', 'localeService', 'patientVisitHistoryService', 'conceptSetService',
        function ($rootScope, $translate, patientService, observationsService, programService, treatmentService, localeService, patientVisitHistoryService, conceptSetService) {
            var reportModel = {
                username: $rootScope.currentUser.username,
                hospitalLogo: '',
                hospitalName: '',
                patientInfo: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    sex: '',
                    weight: '',
                    patientId: '',
                    phoneNumber: ''
                },
                tbComorbidity: '',
                tarvNumber: '',
                prescriber: '',
                prescriptionDate: '',
                orders: [],
                labTestsInfo: {
                    protocol: '',
                    therapeuticLine: '',
                    value_vl: '',
                    value_vl_log10: '',
                    resultsDate: '',
                    collectionDate: '',
                    natureOfCollection: '',
                    sampleCode: '',
                    technique: '',
                    machineUsed: '',
                    viralLoadResult: '',
                    viralLoadResultComment: '',
                    dateOne: '',
                    dateTwo: '',
                    dateThree: '',
                    vlResultsOne: '',
                    vlResultsTwo: '',
                    vlResultsThree: '',
                    CodePLVT: ''
                },
                analyzer: '',
                validator: '',
                facility: '',
                receptionDate: '',
                verifier: '',
                testType: 'Generic HIV CV (Biocentric)'
            };

            var patientUuid = '';

            this.getReportModel = function (_patientUuid) {
                patientUuid = _patientUuid;

                return new Promise(function (resolve, reject) {
                    var p1 = populatePatientDemographics();
                    var p2 = populatePatientWeight();
                    var p3 = populateTARV();
                    var p4 = populatePrescriber();
                    var p5 = populateHospitalNameAndLogo();
                    var p6 = populateVirologyResults();
                    var p7 = populateVLReults();
                    var p8 = populateVLReultsComment();
                    var p9 = populateResultsAnalyzer();
                    var p10 = populateResultsValidator();
                    var p11 = populateFacilityName();
                    var p12 = populateResultsReceptionDate();
                    var p13 = populateResultsverifier();

                    Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p12, p13]).then(function () {
                        resolve(reportModel);
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateVLReults = function () {
                return new Promise(function (resolve, reject) {
                    var patientVLConceptName = 'VL Result';
                    observationsService.fetch(patientUuid, [patientVLConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.labTestsInfo.viralLoadResult = response.data[0].value.name;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateVLReultsComment = function () {
                return new Promise(function (resolve, reject) {
                    var patientVLCommentConceptName = 'Comments';
                    observationsService.fetch(patientUuid, [patientVLCommentConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.labTestsInfo.viralLoadResultComment = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populatePatientWeight = function () {
                return new Promise(function (resolve, reject) {
                    var patientWeightConceptName = 'Weight';

                    observationsService.fetch(patientUuid, [patientWeightConceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.patientInfo.weight = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateResultsAnalyzer = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Processed by';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.analyzer = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateFacilityName = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Health Facility';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.facility = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateResultsValidator = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Approved by';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.validator = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populateResultsReceptionDate = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Reception date';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.receptionDate = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };
            var populateResultsverifier = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Verified by';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.verifier = response.data[0].value;
                        }
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            };

            var populatePrescriber = function () {
                return new Promise(function (resolve, reject) {
                    var conceptName = 'Prescriber';

                    observationsService.fetch(patientUuid, [conceptName]).then(function (response) {
                        if (response.data && response.data.length > 0) {
                            reportModel.prescriber = response.data[0].value;
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
            function populateVirologyResults () {
                const conceptNamesToExtract = [
                    'Protocol', 'Therapeutic line', 'Value VL (cp/mL)', 'Value VL (log10 cp/mL)',
                    'Date of Results', 'Sample collection date', 'Nature of collection',
                    'Ext Lab Sample Code', 'Technique', 'Machine used', 'Date of Results 1',
                    'Date of Results 2', 'Date of Results 3', 'Value VL (cp/mL) 1',
                    'Value VL (cp/mL) 2', 'Value VL (cp/mL) 3', 'Code PLVT'
                ];
                try {
                    observationsService.fetch(patientUuid, conceptNamesToExtract)
                    .then(function (response) {
                        const concepts = response.data || [];
                        concepts.forEach(function (item) {
                            const conceptName = item.concept.name;
                            const valueAsString = item.valueAsString;
                            switch (conceptName) {
                            case 'Protocol':
                                reportModel.labTestsInfo.protocol = valueAsString;
                                break;
                            case 'Therapeutic line':
                                reportModel.labTestsInfo.therapeuticLine = valueAsString;
                                break;
                            case 'Value VL (cp/mL)':
                                reportModel.labTestsInfo.value_vl = valueAsString;
                                reportModel.labTestsInfo.value_vl_log10 = Math.log10(Number(valueAsString));
                                break;
                            case 'Date of Results':
                                reportModel.labTestsInfo.resultsDate = valueAsString;
                                break;
                            case 'Sample collection date':
                                reportModel.labTestsInfo.collectionDate = valueAsString;
                                break;
                            case 'Nature of collection':
                                reportModel.labTestsInfo.natureOfCollection = valueAsString;
                                break;
                            case 'Ext Lab Sample Code':
                                reportModel.labTestsInfo.sampleCode = valueAsString;
                                break;
                            case 'Code PLVT':
                                reportModel.labTestsInfo.CodePLVT = valueAsString;
                                break;
                            case 'Technique':
                                reportModel.labTestsInfo.technique = valueAsString;
                                reportModel.testType = reportModel.labTestsInfo.technique;
                                break;
                            case 'Machine used':
                                reportModel.labTestsInfo.machineUsed = valueAsString;
                                break;
                            case 'Date of Results 1':
                                reportModel.labTestsInfo.dateOne = valueAsString;
                                break;
                            case 'Date of Results 2':
                                reportModel.labTestsInfo.dateTwo = valueAsString;
                                break;
                            case 'Date of Results 3':
                                reportModel.labTestsInfo.dateThree = valueAsString;
                                break;
                            case 'Value VL (cp/mL) 1':
                                reportModel.labTestsInfo.vlResultsOne = valueAsString;
                                break;
                            case 'Value VL (cp/mL) 2':
                                reportModel.labTestsInfo.vlResultsTwo = valueAsString;
                                break;
                            case 'Value VL (cp/mL) 3':
                                reportModel.labTestsInfo.vlResultsThree = valueAsString;
                                break;
                            default:
                                break;
                            }
                        });
                        return Promise.resolve();
                    })
                    .catch(function (error) {
                        return Promise.reject(error);
                    });
                } catch (error) {
                    return Promise.reject(error);
                }
            }
            var populateTARV = function () {
                return new Promise(function (resolve, reject) {
                    programService.getPatientPrograms(patientUuid).then(function (response) {
                        if (response.activePrograms && response.activePrograms.length > 0) {
                            const hivProgram = response.activePrograms.find(function (program) {
                                return program.display === 'HIV_PROGRAM_KEY';
                            });
                            if (hivProgram) {
                                var tarvNumber = hivProgram.attributes.map(function (item) {
                                    if (item.name === 'PROGRAM_MANAGEMENT_1_ART_NUMBER') {
                                        return item.value;
                                    }
                                }).filter(function (item) {
                                    return item;
                                });

                                if (tarvNumber.length > 0) {
                                    reportModel.tarvNumber = tarvNumber[0];
                                }
                            }
                        }
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
