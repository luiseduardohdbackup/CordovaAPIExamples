var GeolocationPage = function(){
    this.div = $('#geolocationView');
}

GeolocationPage.prototype = {
    start: function(){
        this.watchId = navigator.geolocation.watchPosition(
            this._setPosition.bind(this),
            this._error.bind(this), 
            { frequency: 1000 });
    },
    
    stop: function(){
        navigator.geolocation.clearWatch(this.watchId);
    },

    _setPosition: function(position){
        var html = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: '          + position.coords.longitude        + '<br />' +
                            'Altitude: '           + position.coords.altitude         + '<br />' +
                            'Accuracy: '           + position.coords.accuracy         + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy + '<br />' +
                            'Heading: '            + position.coords.heading          + '<br />' +
                            'Speed: '              + position.coords.speed            + '<br />' +
                            'Timestamp: '          + position.timestamp          + '<br />';
        this.div.html(html);
    },

    _error: function(){
        alert("geolocation error");
    }
}
