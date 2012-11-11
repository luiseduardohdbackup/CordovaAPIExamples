var FilePage = function(){
    this.div = $('#fileView');
    this.console = $('#fileConsole');
    this.writeButton = $('#writeFile');

    this.writeButton.onButtonTap(this.writeStr.bind(this));
}



FilePage.prototype = {
    start: function(){
        this.console.prepend("-------File View Loaded-------<br>");
        this.readFile();
    },
    readFile: function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onGotReadFS.bind(this), this.onReadFail.bind(this));
    },
    stop: function(){

    },
    onGotReadFS: function(fileSystem){
        fileSystem.root.getFile("somefile.txt", null, this.onGotReadFileEntry.bind(this), this.onReadFail.bind(this));
    },
    onGotReadFileEntry: function(fileEntry) {
        fileEntry.file(this.onGotReadFile.bind(this), this.onReadFail.bind(this));
    },
    onGotReadFile: function(file){
        this.readData(file);
    },
    readData: function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            this.console.prepend("File contents: " + evt.target.result + "<br>");
        }.bind(this);

        reader.readAsText(file);
    },
    writeStr: function() {
        this.strToWrite = $('#textfield').val();
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onGotWriteFS.bind(this), this.onWriteFail.bind(this));
    },
    onReadFail: function(evt) {
        this.console.prepend("Read failed. Does a file exist?<br>");
    },
    onGotWriteFS: function(fileSystem) {
        fileSystem.root.getFile("somefile.txt", { create: true }, this.onGotWriteFileEntry.bind(this), this.onWriteFail.bind(this));
    },
    onGotWriteFileEntry: function(fileEntry) {
        fileEntry.createWriter(this.onGotWriteFile.bind(this), this.onWriteFail.bind(this));
    },
    onGotWriteFile: function(writer) {
        this.console.prepend("Write succeed<br>");
        writer.write(this.strToWrite);
        this.strToWrite = "";
        this.readFile();
    },
    onWriteFail: function(evt) {
        this.console.prepend("Write failed :(<br>");
    }
}

