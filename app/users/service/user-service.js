	(function() {

    angular
        .module('contract-web')
        .service('UserService', UserService);

    function UserService(
        $q
    ) {

        var userService = {
        };

        return userService;
    }

})();
