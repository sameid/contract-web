(function() {

    angular
        .module('contract-web')
        .service('NotifyService', NotifyService);

    function NotifyService(
        ngNotify
    ) {

        var notifyService = {
            error: error,
            info: info,
            success: success
        };

        function _notify(message, type) {
            ngNotify.set(message, {
                type: type
            })
        }

        function error(message) {
            _notify(message, "error");
        }

        function success(message) {
            _notify(message, "success");
        }

        function info(message) {
            _notify(message, "info");
        }

        return notifyService;

    }

})();
