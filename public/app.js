(function () {
    var app = angular.module('mbApp', ['ngMaterial', 'ngMdIcons', 'ui.router', 'sideMenu', 'library', 'settings'])
            .config(function ($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/library');

                $stateProvider

                        // HOME STATES AND NESTED VIEWS ========================================
                        .state('library', {
                            url: '/library',
                            templateUrl: './src/library/view/library.html',
                            controller: 'LibraryController',
                            controllerAs: 'lib'
                        })

                        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
                        .state('settings', {
                            url: '/settings',
                            templateUrl: './src/settings/view/settings.html',
                            controller: 'SettingsController',
                            controllerAs: 'settings'
                        });

                $mdIconProvider
                        .defaultIconSet("./assets/svg/avatars.svg", 128)
                        .icon("menu", "./assets/svg/menu.svg", 24)
                        .icon("share", "./assets/svg/share.svg", 24)
                        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                        .icon("twitter", "./assets/svg/twitter.svg", 512)
                        .icon("phone", "./assets/svg/phone.svg", 512);

                $mdThemingProvider.theme('default')
                        .primaryPalette('blue-grey')
                        .accentPalette('deep-orange');

            }).controller('AppController', ['$mdSidenav', AppController]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $mdSidenav
     * @param $log
     * @constructor
     */
    function AppController($mdSidenav, $log) {
        var self = this;

        self.toggleList = toggleUsersList;

        /**
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
    }
})();