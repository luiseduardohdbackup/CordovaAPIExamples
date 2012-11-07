var App = function(){
    window.util = new Util();
    this.setup();   
}

App.prototype = {
    setup: function(){


        this.transitioner = new Transitioner();

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
        this.transitioner.slideFromRight(this.list, newView.div);
        this.transitioner.fadeIn(this.backButton);
    },

    switchBack: function(){
        if (this.currentView === undefined){
            navigator.app.exitApp();
        }
        this.transitioner.fadeOut(this.backButton);
        this.transitioner.slideFromLeft(this.list, this.currentView.div, function(){
            this.currentView.stop();
            delete this.currentView;
        }.bind(this));
    }
}
