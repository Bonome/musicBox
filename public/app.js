/* 
 * Copyright (C) 2015 bonome
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function () {
    var app = angular.module('mbApp', ['ngMaterial', 'ngMdIcons', 'ui.router', 'sideMenu', 'library', 'settings', 'artist'])
            .config(function ($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/library');

                $stateProvider

                        // LIBRARY STATES AND NESTED VIEWS ========================================
                        .state('library', {
                            url: '/library',
                            templateUrl: './src/library/view/library.html',
                            controller: 'LibraryController',
                            controllerAs: 'lib'
                        })
                        
                        // DETAILS ARTIST STATES AND NESTED VIEWS ========================================
                        .state('artist', {
                            url: '/artist',
                            templateUrl: './src/artist/view/artist.html',
                            controller: 'ArtistController',
                            controllerAs: 'artist'
                        })

                        // SETTINGS PAGE AND MULTIPLE NAMED VIEWS =================================
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