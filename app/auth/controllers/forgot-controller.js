(function() {

    angular
        .module('contract-web')
        .controller('ForgotController', ForgotController);

    function ForgotController(
        AuthService,
        $state,
        ngNotify
    ) {
        var vm = this;

        vm.sendForgot = sendForgot;

        activate();

        function activate(){
            vm.email = "";
        }

        function sendForgot(){
            AuthService.forgot(vm.email)
                .then(function(response){
                    // $state.go('app.dashboard');

                    //TODO add form element response....
                    console.log(response);
                    ngNotify.set('You have successfuly send a reset request', {
                        type: 'success'
                    })
                })
                .catch(function(response){
                    ngNotify.set(response.message, {
                        type: 'error'
                    })
                })
        }

    }

})();
