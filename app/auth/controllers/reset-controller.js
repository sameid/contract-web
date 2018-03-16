(function() {

    angular
        .module('contract-web')
        .controller('ResetController', ResetController);

    function ResetController(
        AuthService,
        NotifyService,
        $state,
        $scope
    ) {
        var vm = this;

        vm.resetPassword = resetPassword;

        activate();

        function activate(){
            
            vm.loading = true;
            vm.error = false;

            AuthService
                .forgotPassword()
                .then(function(response) {
                    if (response.sentVerificationCode) {
                        return;
                    }

                    vm.error = true;
                })
                .catch(function() {
                    vm.error = true
                })
                .finally(function() {
                    vm.loading = false;
                })


            vm.verificationCode = "";
            vm.newPassword = "";
        }

        function resetPassword() {
            if ($scope.resetForm.$invalid){
                NotifyService.error("You've entered an invalid verifcation code or password.");
                return;
            }

            AuthService
                .resetPassword(vm.verificationCode, vm.newPassword)
                .then(function(response){
                    console.log(response);
                    NotifyService.success("Successfully reset your password!");

                    //TODO: populate email and add login message/..
                    // $state.go('app.login');
                })
                .catch(function(err){
                    console.log(err);
                    NotifyService.error("An error occured trying to reset your password.")
                })
        }

    }

})();
