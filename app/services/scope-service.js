(function() {

    angular
        .module('contract-web')
        .service('ScopeService', ScopeService);

    function ScopeService(
        $timeout
    ) {

        var scopeService = {
            apply: apply,
            done: done
        };

        /**
         * Apply a Third Party UI DOM action within the Angular Lifecycle 
         */
        function apply($scope, cb) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (cb && typeof cb === 'function') {
                    cb();
                }
            } else {
                $scope.$apply(cb);
            }
        }

        /**
         * Will execute the function when the Angular Lifecycle has completed
         * @param  {Function} cb 
         */
        function done(cb) {
            $timeout(cb);
        }

        return scopeService;

    }

})();
