var resourceListOptions, resourceData;

var getResourceIDData = function (resourceName) {
    console.log('Selected Value ' + resourceName);
};

$.get('/resource', function(data) {
    ko.applyBindings(new resourceListModel(data));
    resourceData.subscribe(function(selectedResource) {
        getResourceIDData(selectedResource);
    });
});

var resourceListModel = function(resourceList) {
    resourceListOptions = ko.observableArray();
    var resourceListArray = Object.keys(resourceList).map(function (key) {return resourceList[key]});
    for(var resourceIndex in resourceListArray) {
        resourceListOptions.push(resourceListArray[resourceIndex]);
    }
    resourceData = ko.observable();
};

// This makes Knockout get to work
