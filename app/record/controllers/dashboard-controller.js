(function() {

    angular
        .module('contract-web')
        .controller('DashboardController', DashboardController);

    function DashboardController(
        $state,
        DASHBOARD_CONFIG,
        RecordService,
        NotifyService
    ) {
        var vm = this;

        vm.viewRecord = viewRecord;
        vm.getSortDirection = getSortDirection;
        vm.sortBy = sortBy;
        vm.isSortBy = isSortBy;

        activate();

        function activate(){
            vm.search = "";
            vm.items = [];
            vm.totalCount = 0;

            vm.property = "sampleData";
            vm.desc = false;
            _getRecords();
        }

        /**
         * Retrieves all the records
         */
        function _getRecords() {
            vm.loading = true;

            RecordService
                .getAllRecords()
                .then(function(result) {
                    vm.items = result.data.data;
                    vm.totalCount = result.data.data.length;
                })
                .catch(function(err) {
                    console.log(err);
                    NotifyService.error("An error occured trying load records.")
                })
                .finally(function() {
                    vm.loading = false;
                })
        }

        /**
         * Opens the records using the id
         * 
         * @param {Record} record
         */
        function viewRecord(record) {
            $state.go('app.record', {
                id: record.id
            })
        }

        /**
         * Changes the sort by property
         * 
         * @param {String} property
         */
        function sortBy(property) {
            vm.desc = !vm.desc;
            vm.property = property;
        }

        /**
         * Determines the current sort by property
         * 
         * @param {String} property
         */
        function isSortBy(property) {
            return vm.property === property;
        }

        /**
         * Determins the direction the sort 
         */
        function getSortDirection() {
            return vm.desc ? "up" : "down";
        }

    }

})();
