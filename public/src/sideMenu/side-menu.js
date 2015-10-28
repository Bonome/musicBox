(function () {
    var menu = angular.module('sideMenu', []);

    menu.directive("sideMenu", function ($mdSidenav, $state) {
        return {
            restrict: 'E',
            templateUrl: './src/sideMenu/view/side-menu.html',
            controller: function () {
                var self = this;
                self.iconColor = '#FF5722';
                self.selected = 'library';
                
                self.selectItem = selectMenuItem;
                self.toggleList = toggleMenuList;
                
                /**
                 * Select the current avatars
                 * @param item
                 */
                 function selectMenuItem(item) {
                    self.selected = item;
                    $state.go(item);
                    console.log(item);
                    self.toggleList();
                };

                /**
                 * hide or Show the 'left' sideNav area
                 */
                function toggleMenuList() {
                    $mdSidenav('left').toggle();
                }
            },
            controllerAs: 'menu',
            bindToController: true
        };
    });
})();