(function() {

    angular
        .module('contract-web')
        .component('radioBoxes', {
            templateUrl: "app/components/radio.boxes.component.html",
            controller: RadioBoxesController,
            bindings: {
                list: "<",
                selected: "=",
                select: "<"
            }
        });

    function RadioBoxesController(
        _
    ) {

        var vm = this;
        // vm.$onDestroy = $onDestroy;
        vm.$doCheck = $doCheck;
        vm.$onInit = $onInit;
        vm.setSelected = setSelected;
        vm.uppercase = uppercase;
        vm.isItemSelected = isItemSelected;

        function $onInit() {
            vm.selectedItems = _.isArray(vm.selected) ? vm.selected : [vm.selected];
        }

        function $doCheck() {
            vm.selectedItems = _.isArray(vm.selected) ? vm.selected : [vm.selected];
        }

        /**
         * Set the Selected item
         * @param {String} selected
         */
        function setSelected(item) {
            if (!vm.select) {
                vm.selectedItems = [item];
                vm.selected = item;
                return;
            }

            if (_.includes(vm.selected, item)) {
                vm.selectedItems.splice(vm.selectedItems.indexOf(item), 1);
                return;
            }

            vm.selectedItems.push(item);
            vm.selected = vm.selectedItems;
        }

        function isItemSelected(item) {
            return _.includes(vm.selectedItems, item);
        }

        /**
         * Will make the first character upper case for display
         * @param  {String} item
         * @return {String}
         */
        function uppercase(item) {
            return item.charAt(0).toUpperCase() + item.slice(1);
        }

    }

})();
