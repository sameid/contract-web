(function() {

    angular
        .module('contract-web')
        .component('error', {
            templateUrl: "app/components/error.component.html",
            controller: ErrorController
        });

    function ErrorController(
    ) {

        var vm = this;
        // vm.$onDestroy = $onDestroy;
        vm.$onChanges = $onChanges;
        vm.$onInit = $onInit;

        function $onInit() {

        }

        function $onChanges() {

        }

    }

})();
