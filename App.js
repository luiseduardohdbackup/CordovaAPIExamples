var App = function(){
    this.setup();   
}

App.prototype = {
    setup: function(){

        this.list = $('#list');

        this.backButton = $('#back');
        this.backButton.onButtonTap(this.switchBack.bind(this));

        this.accelerometerView = new AccelerometerPage();
        this.accelerometerButton = $('#gotoAccelerometer');
        this.accelerometerButton.onButtonTap(
                        this.createSwitchTo(this.accelerometerView));

        this.connectionView = new ConnectionPage();
        this.connectionButton = $('#gotoConnection');
        this.connectionButton.onButtonTap(
                        this.createSwitchTo(this.connectionView));

        this.deviceView = new DevicePage();
        this.deviceButton = $('#gotoDevice');
        this.deviceButton.onButtonTap(
                        this.createSwitchTo(this.deviceView));

        this.geolocationView = new GeolocationPage();
        this.geolocationButton = $('#gotoGeolocation');
        this.geolocationButton.onButtonTap(
                        this.createSwitchTo(this.geolocationView));

        document.addEventListener('backButton', this.switchBack.bind(this));
    },
    
    createSwitchTo: function(newView){
        return function(){
            this.switchTo(newView);
        }.bind(this);
    },

    switchTo: function(newView){
        newView.start();
        this.currentView = newView;
        window.util.transitioner.slideFromRight(this.list, newView.div);
        window.util.transitioner.fadeIn(this.backButton);
    },

    switchBack: function(){
        if (this.currentView === undefined){
            navigator.app.exitApp();
        }
        window.util.transitioner.fadeOut(this.backButton);
        window.util.transitioner.slideFromLeft(this.list, this.currentView.div, function(){
            this.currentView.stop();
            this.currentView = undefined;
        }.bind(this));
    }
}
