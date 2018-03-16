(function() {

    angular
        .module('contract-web')
        .controller('SettingsController', SettingsController);

    function SettingsController(
    ) {
        var vm = this;

        activate();

        function activate(){
            console.log("reached");
        }

    }

})();
