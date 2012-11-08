var CameraPage = function(){
    this.div = $('#cameraView');
    this.takePictureButton = $('#takePicture');
    this.takePictureButton.onButtonTap(this.takePicture.bind(this))
}

CameraPage.prototype = {
    start: function(){

    },
    
    stop: function(){

    },

    takePicture: function(){
        var pictureSource = navigator.camera.PictureSourceType;
        var destinationType = navigator.camera.DestinationType;

        navigator.camera.getPicture(
                    this.onPhotoDataSuccess.bind(this), 
                    this.onFail.bind(this), 
                    {quality: 50,
                     destinationType: destinationType.DATA_URL,
                     sourceType: pictureSource });
    },

    onPhotoDataSuccess: function(imageData){
        var pic = $('#picture');
        pic.attr('src', 'data:image/jpeg;base64,' + imageData);
    },

    onFail: function(message){
        alert('Taking picture failed because: ' + message);
    }
}
