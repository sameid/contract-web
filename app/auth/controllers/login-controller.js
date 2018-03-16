(function() {

    angular
        .module('contract-web')
        .controller('LoginController', LoginController);

    function LoginController(
        AuthService,
        NotifyService,
        $state,
        ngNotify
    ) {
        var vm = this;

        vm.login = login;

        activate();

        function activate(){
            vm.email = "";
            vm.password = "";
        }

        function login(){
            AuthService.signIn(vm.email, vm.password)
                .then(function(response){
                    $state.go('app.records');
                    var user = AuthService.getUser();
                    NotifyService.success('Welcome back, ' + user.firstname + " " + user.lastname  + ".");
                })
                .catch(function(err){
                    NotifyService.error(err);
                })
        }

    }

})();
