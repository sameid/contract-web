(function() {

    angular
        .module('contract-web', [
            // AngularJS Dependencies
            'ui.router',
            'ngNotify',
            'rt.debounce',
            'angular-swaggerific'
        ])
        
        .constant('_', window._) // Underscore
        .constant('md5', window.md5)
        .constant('moment', window.moment)
        .constant('numeral', window.numeral)

        .factory('ResponseInterceptorService', function () {
            return {
                responseError: function(response) {
                    if (response.status === 403) {
                        window.localStorage.removeItem("authToken");
                    }

                    return response;
                }
            };
        })

        .factory('RequestInterceptorService', function() {
            return {
                request: function (request) {
                    var token = window.localStorage.getItem("authToken");

                    if (token) {
                        request.headers['auth-token'] = token;
                    }

                    return request;
                }
            }
        })

        .config(function($httpProvider) {
            $httpProvider.interceptors.push('RequestInterceptorService');
            $httpProvider.interceptors.push('ResponseInterceptorService');
        })

        .run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
            $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
                if (!AuthService.isAuthenticated()) {
                    if (next.name !== 'app.login' && next.name !== 'app.reset' && next.name !== 'app') {
                        event.preventDefault();
                        $state.go('app.login');
                    }
                }
                else {
                    if (next.name == 'app.login') {
                        event.preventDefault();
                        $state.go('app.records');
                    }
                }
            });
        })

        .run(AppRun);

    function AppRun(
        $log,
        ngNotify
    ) {
        $log.log("Application module is initialized ...");

        ngNotify.config({
            theme: 'pure',
            position: 'bottom',
            duration: 4000,
            type: 'info',
            sticky: false,
            button: true,
            html: false
        });
    }

})();
