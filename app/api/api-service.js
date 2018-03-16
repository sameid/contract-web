(function() {

    angular
        .module('contract-web')
        .service('ApiService', ApiService);

        function ApiService(
            $q,
            $http,
            $window,
            AngularSwaggerific
        ) {

            var _api;

            var apiService = {
               get: get
            };

            function activate() {
                _api = new AngularSwaggerific($window.API['swagger']);
            }

            activate();

            function get() {
                return _api;
            }

            return apiService;
        }

})();