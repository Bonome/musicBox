(function () {
    var menu = angular.module('vanillaPlayer', []);

    menu.directive("vanillaPlayer", function ($mdSidenav, $state) {
        return {
            restrict: 'E',
            templateUrl: './src/vanillaPlayer/view/vanilla-player.html',
            controller: function () {
                var self = this;

                (function init() {
                    Vanilla.replace('audio');
                })();
            },
            controllerAs: 'player',
            bindToController: true
        };
    });
})();