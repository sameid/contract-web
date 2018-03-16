(function() {

    angular
        .module('contract-web')
        .config(AppRoutes);

    function AppRoutes(
        $locationProvider,
        $stateProvider,
        $urlRouterProvider
    ) {

        /**
         * If the route does not exist, redirect the user to the 'login' route.
         */
        // $urlRouterProvider.otherwise('/login');
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app/app.layout.html',
                data: {
                    authenticate: true
                }
            })
            .state('app.403', {
                url: '/403',
                templateUrl: 'app/app.403.html'
            })
            .state('app.500', {
                url: '/500',
                templateUrl: 'app/app.500.html'
            })
            .state('app.login', {
                url: '/login',
                templateUrl: 'app/auth/views/login.view.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('app.reset', {
                url: '/reset',
                templateUrl: 'app/auth/views/reset.view.html',
                controller: 'ResetController',
                controllerAs: 'reset'
            })
            // .state('app.forgot', {
            //     url: '/forgot',
            //     templateUrl: 'app/auth/views/forgot.view.html',
            //     controller: 'ForgotController',
            //     controllerAs: 'forgot'
            // })
            .state('app.records', {
                url: '/records',
                templateUrl: 'app/record/views/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'ctrl'
            })
            .state('app.record', {
                url: '/create/:id',
                templateUrl: 'app/record/views/create.view.html',
                controller: 'CreateController',
                controllerAs: 'ctrl'
            })
            .state('app.settings', {
                abstract: true,
                url: '/settings',
                templateUrl: 'app/settings/views/settings.view.html',
                controller: 'SettingsController',
                controllerAs: 'ctrl'
            })
            .state('app.settings.drivers', {
                url: '/drivers',
                templateUrl: 'app/settings/views/settings.drivers.view.html',
                controller: 'SettingsDriversController',
                controllerAs: 'ctrl'
            })

        $locationProvider.html5Mode(false).hashPrefix('!');
    }

})();
