(function() {

    angular
        .module('contract-web')
        .service('AuthService', AuthService);

    function AuthService(
        $q,
        ENVIRONMENT,
        _,
        ApiService
    ) {

        var _user = null;
        var _api = ApiService.get();
        
        var LOCAL_USER = "user";
        var LOCAL_TOKEN_KEY = "authToken";

        var authService = {
            signIn: signIn,
            isAuthenticated: isAuthenticated,
            signOut: signOut,
            getUser: getUser
        };

        function _storeToken(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        }

        function _storeUser(user) {
            window.localStorage.setItem(LOCAL_USER, JSON.stringify(user));
        }

        /**
         * Authenticates the User
         * 
         * @param {String} username
         * @param {String} password
         * @return {Promise}
         */
        function signIn(email, password) {
            var deferred = $q.defer();

            _api.auth.login({
                email: email,
                password: password
            })
            .then(function(response) {
                if (response.data.success) {
                    _storeToken(response.data.token);
                    _storeUser(response.data.user);
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response.data.message);
                }
            }, function(response) {
                deferred.reject(response);
            });


            return deferred.promise;
        }

        /**
         * Checks if the current user in sessions is authenticated
         * 
         * @return {Boolean}
         */
        function isAuthenticated() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            return angular.isDefined(token) && !_.isNull(token);
        }

        /**
         * Have the user sign out 
         */
        function signOut() {
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        }

        /**
         * Get's the user object from memory or local storage
         * @return {User}
         */
        function getUser() {
            if (!_user) {
                _user = JSON.parse(localStorage.getItem(LOCAL_USER));
            }

            return _user;
        }

        return authService;
    }

})();
