var AccelerometerPage = function(){
    this.div = $('#accelerometerView');

    this.accelerometerX = $("#accelerometerX");
    this.accelerometerY = $("#accelerometerY");
    this.accelerometerZ = $("#accelerometerZ");
    

}

AccelerometerPage.prototype = {
    start: function(){
        this.watchId = navigator.accelerometer.watchAcceleration(
            this._setAcceleration.bind(this),
            this._error.bind(this), 
            { frequency: 100 });
    },
    
    stop: function(){
        navigator.accelerometer.clearWatch(this.watchId);
    },

    _setAcceleration: function(acceleration){
        this.accelerometerX.text('X: ' + acceleration.x);
        this.accelerometerY.text('Y: ' + acceleration.y);
        this.accelerometerZ.text('Z: ' + acceleration.z);
    },

    _error: function(){
        alert("accelerometer error");
    }
}
