var resourceListOptions, resourceData, testData, testOptions, serverData, serverDataModel, d3Model;

var shouter = new ko.subscribable();


var d3Model =  function() {
    var self = this;
    self.cpu = ko.observable("NA");
    self.cpuUtilData = ko.observable("NA");
    // Main Model
    function updateServerdata(serverSpecificData){
        self.cpu(serverSpecificData.cpuData);
        self.cpuUtilData(serverSpecificData.cpu_Util);
        self.diskephemeralsize = serverSpecificData.diskephemeralSize;
        self.diskreadbyte = serverSpecificData.diskreadBytes;
        self.diskrootsize = serverSpecificData.diskrootSize;
        self.diskwritebytes = serverSpecificData.diskwriteBytes;
        self.diskwriterequests = serverSpecificData.diskwriteRequests;
        self.instance = serverSpecificData.instance;
        self.memory = serverSpecificData.Memory;
        self.vcpus = serverSpecificData.vcpus;
        self.networkincomingbytes = serverSpecificData.networkincomingBytes;
        self.networkoutgoingbytes = serverSpecificData.networkoutgoingBytes;
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
