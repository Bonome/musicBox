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

    var library = angular
            .module('library', [])
            .controller('LibraryController', [
                '$log', '$http', '$filter', '$state',
                LibraryController
            ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $log
     * @param $http
     * @param $filter
     * @param $state
     * @constructor
     */
    function LibraryController($log, $http, $filter, $state) {
        var self = this;

        self.artists = [];

        self.getArtists = getAllArtists;
        self.displayName = displayName;
        self.artistDetails = artistDetails;

        (function init() {
            if (self.artists.length === 0) {
                self.getArtists();
            }
        })();

        function getAllArtists() {
            $http.get('artist').success(function (artists) {
                self.artists = artists;
            });
        }

        function displayName(artist) {
            var limit = 28;
            var name = artist.name;
            if (name.length > limit) {
                return $filter('limitTo')(name, limit) + "..";
            }
            return name;
        }
        function displayThumbnail(artist) {
            var path = artist.path_picture;
            if (path == null) {
                path = "../assets/svg/avatar.png";
            }
            return path;
        }

        function artistDetails(artist) {
            console.log(artist.name);
            $state.go('artist');
        }

    }

})();
