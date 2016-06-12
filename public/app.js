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
    var app = angular.module('mbApp', ['ngMaterial', 'ngMdIcons', 'ui.router', 'sideMenu', 'vanillaPlayer', 'library', 'settings', 'artist', 'album'])
            .config(function ($mdThemingProvider, $mdIconProvider, $stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise('/library/artists');

                $stateProvider
                        // LIBRARY STATES AND NESTED VIEWS ========================================
                        .state('library', {
                            url: '/library/artists',
                            templateUrl: './src/library/view/library.html',
                            controller: 'LibraryController',
                            controllerAs: 'lib'
                        })

                        // DETAILS ARTIST STATES AND NESTED VIEWS ========================================
                        .state('artist', {
                            url: '/library/:artistName',
                            templateUrl: './src/artist/view/artist.html',
                            controller: 'ArtistController',
                            controllerAs: 'artist'
                        })

                        // DETAILS ALBUM STATES AND NESTED VIEWS ========================================
                        .state('album', {
                            url: '/library/:artistName/:albumName',
                            templateUrl: './src/album/view/album.html',
                            controller: 'AlbumController',
                            controllerAs: 'album'
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
                        .icon("previous", "./assets/svg/chevron_left.svg", 24);
//                        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
//                        .icon("twitter", "./assets/svg/twitter.svg", 512)
//                        .icon("phone", "./assets/svg/phone.svg", 512);

//                $mdThemingProvider.theme('default')
//                        .primaryPalette('grey')
//                        .accentPalette('deep-orange');

                var customPrimary = {
                    '50': '#8e9397',
                    '100': '#80868b',
                    '200': '#74797e',
                    '300': '#676d71',
                    '400': '#5b6063',
                    '500': '#4f5356',
                    '600': '#434649',
                    '700': '#37393b',
                    '800': '#2a2d2e',
                    '900': '#1e2021',
                    'A100': '#9ba0a3',
                    'A200': '#a8acaf',
                    'A400': '#b6b9bb',
                    'A700': '#121314',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200',
                    'contrastStrongLightColors': '300 400'
                };
                $mdThemingProvider
                        .definePalette('customPrimary',
                                customPrimary);

                var customAccent = {
                    '50': '#d3ee81',
                    '100': '#cbea6a',
                    '200': '#c3e754',
                    '300': '#bbe43e',
                    '400': '#b3e127',
                    '500': '#a5d21d',
                    '600': '#93bc1a',
                    '700': '#82a517',
                    '800': '#708f14',
                    '900': '#5f7811',
                    'A100': '#daf197',
                    'A200': '#e2f4ae',
                    'A400': '#eaf7c4',
                    'A700': '#4d620e'
                };
                $mdThemingProvider
                        .definePalette('customAccent',
                                customAccent);

                var customWarn = {
                    '50': '#fbd8ca',
                    '100': '#f9c6b2',
                    '200': '#f7b49b',
                    '300': '#f5a383',
                    '400': '#f3916c',
                    '500': '#F18054',
                    '600': '#ef6e3c',
                    '700': '#ed5d25',
                    '800': '#e64e13',
                    '900': '#ce4611',
                    'A100': '#fde9e1',
                    'A200': '#fffbf9',
                    'A400': '#ffffff',
                    'A700': '#b73e0f'
                };
                $mdThemingProvider
                        .definePalette('customWarn',
                                customWarn);

                $mdThemingProvider.theme('default')
                        .primaryPalette('customPrimary')
                        .accentPalette('customAccent')
                        .warnPalette('customWarn');

            }).controller('AppController', ['$mdSidenav', '$log', '$window', AppController]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $mdSidenav
     * @param $log
     * @param $window
     * @constructor
     */
    function AppController($mdSidenav, $log, $window) {
        var self = this;

        self.toggleList = toggleUsersList;
        self.goBack = goBack;
        
        /**
         * hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
        
        /**
         * go back to previous "page"
         */
        function goBack() {
            $window.history.back();
        }
    }
})();