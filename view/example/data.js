var resourceListOptions, resourceData, testData, testOptions, serverData, serverDataModel;
var shouter = new ko.subscribable();

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
    });
};

var testModel = function(resourceList) {
    testOptions = ko.observableArray();
    var resourceListArray = Object.keys(resourceList).map(function (key) {return resourceList[key]});
    for(var resourceIndex in resourceListArray) {
        testOptions.push(resourceListArray[resourceIndex]);
    }
    testData = ko.observable();
};

var getResourceIDData = function (resourceName) {
    console.log('Selected Value ' + resourceName);
};

$.get('/resource', function(data) {
    ko.applyBindings(new masterVM(data));
    resourceData.subscribe(function(selectedResource) {
        getResourceIDData(selectedResource);
    });

    testData.subscribe(function(selectedResource) {
        getResourceIDData(selectedResource);
    });

});

var masterVM = function(data) {
    resourceListModel =  new resourceListModel(data),
    testModel = new testModel(data);
    serverDataModel = new serverDataModel();
};
// This makes Knockout get to work
