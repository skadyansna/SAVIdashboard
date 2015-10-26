var resourceListOptions, resourceData, testData, testOptions, serverData, serverDataModel, d3Model;

var shouter = new ko.subscribable();

var d3Model =  function() {
    var self = this;
    self.cputime = ko.observable("NA");
    self.cpuUtilData = ko.observable("NA");
    self.diskephemeralsize=ko.observable("NA");
    self.diskreadbyte=ko.observable("NA");
    self.diskrootsize=ko.observable("NA");
    self.diskwritebytes=ko.observable("NA");
    self.diskwriterequests=ko.observable("NA");
    self.memory=ko.observable("NA");
    self.instance=ko.observable("NA");
    self.vcpus=ko.observable("NA");
    self.networkincomingbytes=ko.observable("NA");
    self.networkoutgoingbytes=ko.observable("NA");
    // Main Model
    function updateServerdata(serverSpecificData){
        self.cputime(parseFloat((serverSpecificData.cpuTime).split('e')[0]).toFixed(5));
        self.cpuUtilData(Math.round((serverSpecificData.cpu_Util).split('%')[0])+ ("%"));
        self.diskephemeralsize((serverSpecificData.diskephemeralSize).split('GB')[0]);
        self.diskreadbyte(parseFloat((serverSpecificData.diskreadBytes).split('e')[0]).toFixed(1));
        self.diskrootsize((serverSpecificData.diskrootSize).split('GB')[0]);
        self.diskwritebytes(parseFloat((serverSpecificData.diskwriteBytes).split('e')[0]).toFixed(1));
        self.diskwriterequests(parseFloat((serverSpecificData.diskwriteRequests).split('request')[0]).toFixed(1));
        self.instance(Math.round((serverSpecificData.instance).split('instance')[0]));
        self.memory(Math.round(serverSpecificData.memory.split("MB")[0]/1000));
        self.vcpus(Math.round((serverSpecificData.vcpus).split('vcpu')[0]));
        self.networkincomingbytes(serverSpecificData.networkincomingBytes);
        self.networkoutgoingbytes(serverSpecificData.networkoutgoingBytes);
    }

    shouter.subscribe(function(serverName) {
        $.ajax({
            type: 'GET',
            data: serverName,
            contentType: "application/json",
            dataType:'json',
            url:"http://localhost:3000/resourceNameInverse",
            success: function(data) {
                updateServerdata(data);
                canvas(data);
                barstacker(data);
                liquidFillGauge(data);
                console.log(data);
            },
            error: function(error) {
                console.log("some error in fetching the notifications");
            }
        });
        console.log('D3 Model Refreshed');
    }, this, "messageToPublish");
};
var serverDataModel = function () {
    this.message = ko.observable("This represents the server data.....");
    shouter.subscribe(function(newValue) {
        this.message(newValue);
    }, this, "messageToPublish");
};
var resourceListModel = function(resourceList) {
    resourceListOptions = ko.observableArray();
    var resourceListArray = Object.keys(resourceList).map(function (key) {return resourceList[key]});
    for(var resourceIndex in resourceListArray) {
        resourceListOptions.push(resourceListArray[resourceIndex]);
    }
    resourceData = ko.observable();
    resourceData.subscribe(function(newValue) {
        shouter.notifySubscribers(newValue, "messageToPublish");
        console.log('newValue');
    });
};
var getResourceIDData = function (resourceName) {
    console.log('Selected Value ' + resourceName);
};
$.get('/resource', function(data) {
    ko.applyBindings(new masterVM(data));
});
var masterVM = function(data) {
    resourceListModel =  new resourceListModel(data);
    serverDataModel = new serverDataModel();
    d3Model = new d3Model();
};
// This makes Knockout get to work