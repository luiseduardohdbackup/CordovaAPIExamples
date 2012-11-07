var DevicePage = function(){

    this.div = $('#deviceView');

    $('#deviceName').text("name: " + window.device.name);
    $('#deviceCordova').text("cordova: " + window.device.cordova);
    $('#devicePlatform').text("platform: " + window.device.platform);
    $('#deviceUUID').text("uuid: " + window.device.uuid);
    $('#deviceVersion').text("version: " + window.device.version);
}

DevicePage.prototype = {
    start: function(){
        
    },
    stop: function(){
        
    }

}
