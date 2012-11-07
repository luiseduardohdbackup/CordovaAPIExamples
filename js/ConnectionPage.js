var ConnectionPage = function(){
    this.states = {};
        this.states[Connection.UNKNOWN]  = 'Unknown connection';
        this.states[Connection.ETHERNET] = 'Ethernet connection';
        this.states[Connection.WIFI]     = 'WiFi connection';
        this.states[Connection.CELL_2G]  = 'Cell 2G connection';
        this.states[Connection.CELL_3G]  = 'Cell 3G connection';
        this.states[Connection.CELL_4G]  = 'Cell 4G connection';
        this.states[Connection.NONE]     = 'No network connection';

    this.div = $('#connectionView');
}

ConnectionPage.prototype = {
    start: function(){
        this.watchId = window.setInterval(function(){
            this._updateNetworkState();
        }.bind(this), 1000);
    },
    stop: function(){
        window.clearInterval(this.watchId);
    },
    _updateNetworkState: function(){
        var state = this.states[navigator.network.connection.type]
        this.div.text(state);
    }


}
