(function() {

    angular
        .module('contract-web')
        .service('RecordService', RecordService);

    function RecordService(
        ApiService,
        $q
    ) {

        var _api = ApiService.get();

        var recordService = {
            getAllRecords: getAllRecords,
            getRecord: getRecord,
            deleteRecord: deleteRecord,
            saveRecord: saveRecord
        };

        function getAllRecords() {
            return _api.record.getRecords();
        }

        function getRecord(id) {
            var deferred = $q.defer();

            _api.record.getRecord({
                id: id
            }).then(function(response) {
                if (response.data.success) {
                    deferred.resolve(response.data.data);   
                } else {
                    deferred.reject(response.data.message);
                }
            }, function(response) {
                deferred.reject(response.data.message);
            });

            return deferred.promise;
        }

        function deleteRecord() {
            return _api.record.deleteRecord({
                id: id
            })
        }

        function saveRecord(record, id) {
            var deferred = $q.defer();

            if (!id) {
                _api.record.createRecord({
                    sampleData: record.sample_data
                }).then(function(response) {
                    if (response.data.success) {
                        deferred.resolve(response.data.message);   
                    } else {
                        deferred.reject(response.data.message);
                    }
                }, function(response) {
                    deferred.reject(response.data.message);
                });

                return deferred.promise;
            }

            _api.record.updateRecord({
                id: id,
                sampleData: record.sample_data
            }).then(function(response) {
                if (response.data.success) {
                    deferred.resolve(response.data.message);   
                } else {
                    deferred.reject(response.data.message);
                }
            }, function(response) {
                deferred.reject(response.data.message);
            });

            return deferred.promise;
        }

        return recordService;

    }

})();
