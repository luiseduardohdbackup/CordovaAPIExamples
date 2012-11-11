var FilePage = function(){
    this.div = $('#fileView');
    this.console = $('#fileConsole');
    window.filePage = this;

    this.shouldRun = true;
}



FilePage.prototype = {
    start: function(){
        this.shouldRun = true;
        this.console.append("-------File View Loaded-------<br>");
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onGotReadFS.bind(this), this.onReadFail.bind(this));
    },
    stop: function(){
        this.shouldRun = false;
    },
    onGotReadFS: function(fileSystem){
        if (this.shouldRun)
            fileSystem.root.getFile("somefile.txt", null, this.onGotReadFileEntry.bind(this), this.onReadFail.bind(this));
    },
    onGotReadFileEntry: function(fileEntry) {
        if (this.shouldRun)
            fileEntry.file(this.onGotReadFile.bind(this), this.onReadFail.bind(this));
    },
    onGotReadFile: function(file){
        if (this.shouldRun)
            this.readData(file);
    },
    readData: function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            this.console.append("File contents: " + evt.target.result + "<br>");
        }.bind(this);

        if (this.shouldRun)
            reader.readAsText(file);
    },
    writeStr: function() {
        this.strToWrite = $('#textfield').val();
        if (this.shouldRun)
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onGotWriteFS.bind(this), this.onWriteFail.bind(this));
    },
    onReadFail: function(evt) {
        if (this.shouldRun) {
            this.console.append("Read failed. Does a file exist?<br>");
        }
    },
    onGotWriteFS: function(fileSystem) {
        if (this.shouldRun)
            fileSystem.root.getFile("somefile.txt", { create: true }, this.onGotWriteFileEntry.bind(this), this.onWriteFail.bind(this));
    },
    onGotWriteFileEntry: function(fileEntry) {
        if (this.shouldRun)
            fileEntry.createWriter(this.onGotWriteFile.bind(this), this.onWriteFail.bind(this));
    },
    onGotWriteFile: function(writer) {
        if (this.shouldRun) {
            this.console.append("Write succeed<br>");
            writer.write(this.strToWrite);
            this.strToWrite = "";
        }
    },
    onWriteFail: function(evt) {
        if (this.shouldRun) {
            this.console.append("Write failed :(<br>");
        }
    }
}

action="javascript:submitTheForm()"

