/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        console.log('Init called');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        // DEBUG
        console.log('Unique device ID: ' + app.uinqueID());
        var font_size = "" + screen.height / 33 + "px";
        document.body.style.fontSize = font_size;
        console.log('Font-size scale: ' + font_size);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */

        console.log('Received Event: ' + id);
        
        /*
        console.log('Device Name: '     + device.name );
        console.log('Device PhoneGap: ' + device.phonegap );
        console.log('Device Platform: ' + device.platform );
        console.log('Device UUID: '     + device.uuid );
        console.log('Device Version: '  + device.version );
        console.log('Device Hostname: '  + window.location.host );
        */
    },

    // Get unique ID (works for Android and FirefoxOS)
    uinqueID: function() {
        if (device.uuid) { return device.uuid; }
        if (window.location.host) { return window.location.host; }
        return 'unknown';
    },

    // Test function
    testEvent: function() {
        // Test
        var onPrompt = function onPrompt(results) {
          navigator.notification.vibrate(500);
          /*alert("You selected button number " + 
            results.buttonIndex + 
            " and entered " + results.input1);
          */
          if (results.buttonIndex == 1) {
            // Take a picture
            app.takePicture();
          } else {
            // Show geolocation
            app.getLocation();
          }
        }
        navigator.notification.vibrate(500);
        navigator.notification.prompt(
          'Enter Name', // message
          onPrompt, // callback to invoke
          'Prompt Test', // title
          ['Photo', 'Location'], // buttonLabels
          'HLP?' // defaultText
        );
    },

    // Take a picture
    takePicture: function() {
        navigator.camera.getPicture(app.showPicture, app.pictureError, {
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, // Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100
        });
    },

    // Show picture
    showPicture: function (src) {
        // var img = document.createElement('img');
        var img = document.getElementById('requestimage');
        img.src = "data:image/jpeg;base64," + src;
        console.log("Photo data: data:image/jpeg;base64," + src);
        // document.appendChild(img);
        // document.body.insertBefore(img, document.getElementById('app'));
        
        // requestimage.parentNode.replaceChild(img, requestimage.childNodes[0]);
        return true;
    },

    // Picture error
    pictureError: function () { console.log("Photo failed"); },

    // Get location
    getLocation: function() {      
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Latitude: ' + position.coords.latitude + '\n' + 
            'Longitude: ' + position.coords.longitude + '\n');
            app.showMapMarker(position.coords.latitude, position.coords.longitude);
            document.getElementById('latitude').value = position.coords.latitude
            document.getElementById('longitude').value = position.coords.longitude
        }, function (error) {
            console.log('Error getting GPS Data');
            navigator.notification.vibrate(500);
        });
    },

    // Show map marker
    showMapMarker: function(latitude, longitude) {
        var map_canvas = document.getElementById("map_canvas");
        var map_confirm = document.getElementById("map_confirm");
        var mapOptions = {
            zoom: 18, // 13 = city, 15 = center, 18 = block, 20 = street
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(map_canvas, mapOptions);
        var mapBounds = new google.maps.LatLngBounds();
        var latitudeAndLongitudeOne = new google.maps.LatLng(latitude, longitude);

        var markerOne = new google.maps.Marker({
            position: latitudeAndLongitudeOne,
            map: map
        });

        // mapBounds.extend(latitudeAndLongitudeOne);
        // map.fitBounds(mapBounds);

        map_canvas.style.display = 'block';
        map_confirm.style.display = 'block';
    },

    // Hide the map again
    hideMap: function() {
        var map_canvas = document.getElementById("map_canvas");
        var map_confirm = document.getElementById("map_confirm");
        map_canvas.style.display = 'none';
        map_confirm.style.display = 'none';
    }
};
