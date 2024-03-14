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
                    patientId: ''
                },
                tbComorbidity: '',
                tarvNumber: '',
                prescriber: '',
                prescriptionDate: '',
                orders: [],
                labTestsInfo: {
                    protocol: '',
                    theurapeuticLine: '',
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
                    var p3 = populateTARVAndTBComorbidity();
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
            var populatePatientDemographics = function () {
                return new Promise(function (resolve, reject) {
                    patientService.getPatient(patientUuid).then(function (response) {
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

            var populateVirologyResults = function () {
                return new Promise(function (resolve, reject) {
                    const conceptNamesToExtract = ['Protocol', 'Therapeutic line', 'Value VL (cp/mL)', 'Value VL (log10 cp/mL)', 'Date of Results', 'Sample collection date', 'Nature of collection', 'Sample Code', 'Technique', 'Machine used', 'Date of Results 1', 'Date of Results 2', 'Date of Results 3','Value VL (cp/mL) 1','Value VL (cp/mL) 2', 'Value VL (cp/mL) 3'];
                    observationsService.fetch(patientUuid, conceptNamesToExtract)
                        .then(function (response) {
                            const concepts = response.data || [];
                            conceptNamesToExtract.forEach(function (conceptName) {
                                const foundConcept = concepts.find(function (obs) {
                                    return obs.concept.name === conceptName;
                                });
                                if (foundConcept) {
                                    if (conceptName === 'Protocol') {
                                        reportModel.labTestsInfo.protocol = foundConcept.valueAsString;
                                    } else if (conceptName === 'Therapeutic line') {
                                        reportModel.labTestsInfo.theurapeuticLine = foundConcept.valueAsString;
                                    } else if (conceptName === 'Value VL (cp/mL)') {
                                        reportModel.labTestsInfo.value_vl = foundConcept.valueAsString;
                                        reportModel.labTestsInfo.value_vl_log10 = Math.log10(reportModel.labTestsInfo.value_vl);
                                    } else if (conceptName === 'Value VL (log10 cp/mL)') {
                                        // reportModel.labTestsInfo.value_vl_log10 = foundConcept.valueAsString;
                                    } else if (conceptName === 'Date of Results') {
                                        reportModel.labTestsInfo.resultsDate = foundConcept.valueAsString;
                                    } else if (conceptName === 'Sample collection date') {
                                        reportModel.labTestsInfo.collectionDate = foundConcept.valueAsString;
                                    } else if (conceptName === 'Nature of collection') {
                                        reportModel.labTestsInfo.natureOfCollection = foundConcept.valueAsString;
                                    } else if (conceptName === 'Sample Code') {
                                        reportModel.labTestsInfo.sampleCode = foundConcept.valueAsString;
                                    } else if (conceptName === 'Technique') {
                                        reportModel.labTestsInfo.technique = foundConcept.valueAsString;
                                        reportModel.testType = reportModel.labTestsInfo.technique;
                                    } else if (conceptName === 'Machine used') {
                                        reportModel.labTestsInfo.machineUsed = foundConcept.valueAsString;
                                    } else if (conceptName === 'Date of Results 1') {
                                        reportModel.labTestsInfo.dateOne = foundConcept.valueAsString;
                                    } else if (conceptName === 'Date of Results 2') {
                                        reportModel.labTestsInfo.dateTwo = foundConcept.valueAsString;
                                    } else if (conceptName === 'Date of Results 3') {
                                        reportModel.labTestsInfo.dateThree = foundConcept.valueAsString;
                                    } else if (conceptName === 'Value VL (cp/mL) 1') {
                                        reportModel.labTestsInfo.vlResultsOne = foundConcept.valueAsString;
                                    } else if (conceptName === 'Value VL (cp/mL) 2') {
                                        reportModel.labTestsInfo.vlResultsTwo = foundConcept.valueAsString;
                                    } else if (conceptName === 'Value VL (cp/mL) 3') {
                                        reportModel.labTestsInfo.vlResultsThree = foundConcept.valueAsString;
                                    }
                                }
                            });
                            resolve();
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            };

            var populateTARVAndTBComorbidity = function () {
                return new Promise(function (resolve, reject) {
                    programService.getPatientPrograms(patientUuid).then(function (response) {
                        if (response.activePrograms && response.activePrograms.length > 0) {
                            var tarvNumber = response.activePrograms[0].attributes.map(function (item) {
                                if (item.name === 'PROGRAM_MANAGEMENT_ART_NUMBER') {
                                    return item.value;
                                }
                            }).filter(function (item) {
                                return item;
                            });

                            if (tarvNumber.length > 0) {
                                reportModel.tarvNumber = tarvNumber[0];
                            }

                            var tbComorbidity = response.activePrograms[0].attributes.map(function (item) {
                                if (item.name === 'PROGRAM_MANAGEMENT_PATIENT_COMORBIDITES') {
                                    return item.value.display === 'TB';
                                }
                            }).filter(function (item) {
                                return item;
                            });

                            if (tbComorbidity.length > 0) {
                                if (tbComorbidity[0]) {
                                    reportModel.tbComorbidity = 'OBS_BOOLEAN_YES_KEY';
                                } else {
                                    reportModel.tbComorbidity = 'OBS_BOOLEAN_NO_KEY';
                                }
                            } else {
                                reportModel.tbComorbidity = 'OBS_BOOLEAN_NO_KEY';
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
