(function() {

    angular
        .module('contract-web')
        .controller('SettingsDriversController', SettingsDriversController);

    function SettingsDriversController(
    ) {
        var vm = this;

        activate();

        function activate(){
            console.log("reached");
        }

    }

})();
