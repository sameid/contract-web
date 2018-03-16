(function() {
    angular
        .module('contract-web')
        .constant('AUTH_EVENTS', {
            notAuthenticated: 'auth-not-authenticated'
        })
        .constant('ENVIRONMENTS', [
            'DEVELOPMENT',
            'PRODUCTION'
        ])
        .constant('API_ENDPOINT', {
            'DEVELOPMENT': 'http://localhost:4000/api',
            'PRODUCTION': "http://portal.srjca.com:4000/api"
        })
        .constant('ENVIRONMENT', 'DEVELOPMENT')
        .constant("ERROR_CODES", {
            INVALID_TOKEN: "INVALID_TOKEN",
            FAILED_AUTHENTICATE_TOKEN: "FAILED_AUTHENTICATE_TOKEN",
            ROUTE_BLOCKED: "ROUTE_BLOCKED",
            ACCESS_DENIED: "ACCESS_DENIED",
            INTERNAL_ERROR: "INTERNAL_ERROR",
            AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED",
            USER_DOES_NOT_EXIST: "USER_DOES_NOT_EXIST",
            INVALID_RESET_TOKEN: "INVALID_RESET_TOKEN",
            VALIDATION_ERROR: "VALIDATION_ERROR",
            FILES_ERROR: "FILES_ERROR"
        });
})();
