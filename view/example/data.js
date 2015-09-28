
var shouter = new ko.subscribable();

var d3Model =  function() {
    this.cpu = ko.observable("NA");
    this.cpuUtilData = ko.observable("NA");
    shouter.subscribe(function(newValue) {
        console.log('D3 Model Refreshed');
        this.cpu(Math.random() * 100);
        this.cpuUtilData(Math.random() * 100);
    }, this, "serverNameSelectionChange");
};

var serverDataModel = function () {
    this.message = ko.observable("This represents the server data.....");
    shouter.subscribe(function(newValue) {
        this.message(newValue);
    }, this, "serverNameSelectionChange");
};

var resourceListModel = function(resourceList) {
    this.resourceListOptions = ko.observableArray();
    var resourceListArray = Object.keys(resourceList).map(function (key) {return resourceList[key]});
    for(var resourceIndex in resourceListArray) {
        this.resourceListOptions.push(resourceListArray[resourceIndex]);
    }
    this.resourceData = ko.observable();
    this.resourceData.subscribe(function(newValue) {
        shouter.notifySubscribers(newValue, "serverNameSelectionChange");
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
