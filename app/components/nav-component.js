(function() {

    angular
        .module('contract-web')
        .component('navBar', {
            templateUrl: "app/components/nav.component.html",
            controller: NavController
        });

    function NavController(
        $state,
        AuthService,
        NotifyService
    ) {

        var vm = this;
        // vm.$onDestroy = $onDestroy;
        vm.$onChanges = $onChanges;
        vm.$onInit = $onInit;
        vm.isAuthenticated = AuthService.isAuthenticated;
        vm.signOut = signOut;

        function $onInit() {
            var user = AuthService.getUser();
            vm.name = user.firstname + " " + user.lastname;
        }

        function $onChanges() {

        }

        function signOut() {
            AuthService.signOut();
            NotifyService.info("Signed out successfully.")
            $state.go('app.login');
        }

    }

})();
