(function() {

    angular
        .module('contract-web')
        .component('autocomplete', {
            templateUrl: "app/components/autocomplete.component.html",
            controller: AutocompleteController,
            bindings: {
                results: '=',
                visible: '=',
                onSelect: '='
            }
        });

    function AutocompleteController(
        $document,
        $timeout,
        $scope,
        $state
    ) {

        var vm = this;
        vm.$onInit = $onInit;
        vm.isVisible = isVisible;
        vm.highlight = highlight;
        vm.isHighlighted = isHighlighted;
        vm.select = select;

        function $onInit() {
            vm.results = [];
            vm.selectedIndex = 0;
            vm.trueVisible = false;

            // HACK - Super Hack to delay change so that select() call can happen.
            $scope.$watch('$ctrl.visible', function(visible) {
                $timeout(function() {
                    vm.trueVisible = visible;
                }, 100);
            });
        }

        /**
         * Indicates whether the Autocomplete Dropdown is visible.
         *
         * @return {Boolean}
         */
        function isVisible() {
            return vm.results && vm.results.length > 0 && vm.trueVisible;
        }

        /**
         * Will save the index of the current highlighted index
         *
         * @param {String} item
         */
        function highlight(item) {
            vm.selectedIndex = vm.results.indexOf(item);
        }

        /**
         * Indicates whether the item string passed is the current selected index
         *
         * @param {String} item
         * @return {Boolean}
         */
        function isHighlighted(item) {
            return vm.results.indexOf(item) === vm.selectedIndex;
        }

        /**
         * Saves the current string into in which the highlight is upon.
         */
        function select() {
            vm.onSelect(vm.results[vm.selectedIndex]);
            vm.trueVisible = false;
        }

    }

})();
