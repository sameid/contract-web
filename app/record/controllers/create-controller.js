(function() {

    angular
        .module('contract-web')
        .controller('CreateController', CreateController);

    function CreateController(
        $scope,
        $stateParams,
        $state,
        CREATE_CONFIG,
        RecordService,
        NotifyService
    ) {
        var vm = this;

        vm.isRecordValid = isRecordValid;
        vm.createRecord = createRecord;
        vm.getRecordId = getRecordId;

        activate();

        function activate(){

            // View State
            vm.loading = false;
            vm.edit = false;

            if ($stateParams.id === CREATE_CONFIG.defaults.new) {
            
                _initRecord();
            
            } else {

                vm.loading = true;
                vm.edit = true;
                
                RecordService
                    .getRecord($stateParams.id)
                    .then(function(record) {
                        _initRecord(record);
                    })
                    .catch(function(err) {

                    })
                    .finally(function() {
                        vm.loading = false;
                    })
            }

            _initLabels();

        }

        /**
         * Initializes the copy for the view 
         */
        function _initLabels() {
            vm.labels = {
                title: "Create a Record ...",
                save: "Create Record",
                saving: "Creating record ...",
                saved: "Successfully created your record!",
                savingError: "An error occured trying to create your record."
            }

            if (vm.edit) {
                vm.labels = {
                    title: "Edit Record: ",
                    save: "Update Record",
                    saving: "Updating record ...",
                    saved: "Successfully updated your record!",
                    savingError: "An error occured trying to update your record.",
                    sendConfirmation: "Send Confirmation"
                }
            }
        }

        /**
         * Creates a new record with valid init data
         *
         * @param {Record} r
         */
        function _initRecord(r) {
            var _r = {
                sample_data: ""
            };

            if (angular.isDefined(r)) {
                _r = r;
            }

            vm.record = {
                id: _r.id || null,
                sample_data: _r.sample_data,
            };
        }

        /**
         * Get the record id in uppercase.
         * 
         * @return {String}
         */
        function getRecordId() {
            if (!vm.edit || !vm.record){
                return "";
            }

            return vm.record.id;
        }

        /**
         * Indicates whether the form for the record is valid
         * 
         * @return {Boolean}
         */
        function isRecordValid() {
            return $scope.createRecordForm.$valid;
        }

        /**
         * Creates the record
         */
        function createRecord() {
            vm.loading = true;

            NotifyService.info(vm.labels.saving);

            RecordService
                .saveRecord(vm.record, vm.record.id)
                .then(function(result) {
                    NotifyService.success(vm.labels.saved);
                })
                .catch(function(error) {
                    NotifyService.error(vm.labels.savingError);
                })
                .finally(function() {
                    vm.loading = false;
                    if (!vm.edit) {
                        $state.go('app.records');
                    }

                });
        }


    }

})();
