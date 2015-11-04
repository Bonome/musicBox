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

    angular
            .module('artist', [])
            .controller('ArtistController', [
                '$log', '$http', '$filter', '$state', '$stateParams',
                ArtistController
            ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $log
     * @param $http
     * @param $filter
     * @param $state
     * @param $stateParams
     * @constructor
     */
    function ArtistController($log, $http, $filter, $state, $stateParams) {
        var self = this;
        
        self.name = $stateParams.artistName;
        self.albums = [];

        self.getAlbums = getAlbumByArtist;
        self.albumDetails = albumDetails;

        (function init() {
            if (self.albums.length === 0) {
                self.getAlbums();
            }
        })();

        function getAlbumByArtist() {
            $http.get('album/' + $stateParams.artistName).success(function (albums) {
                self.albums = albums;
            });
        }

        function displayThumbnail(artist) {
            var path = artist.path_picture;
            if (path == null) {
                path = "../assets/svg/avatar.png";
            }
            return path;
        }

        function albumDetails(album) {
            $state.go('album');
        }

    }

})();
