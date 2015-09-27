/**
 * Created by kadyan on 15-09-04.
 */
// Here's my data model
///get the ajax call here to give me the data to fill my model

function AppViewModel() {
    var self = this;
    self.viewModel = ko.mapping.fromJS({});
    self.ResourceId=ko.observable();

    ButtonClicked = function(data) {
        //making the ajax call to get the data from the file
        $.get("/home", function (data) {
            ko.mapping.fromJS(data, self.viewModel);
            self.viewModel = ko.mapping.toJS(self.viewModel);
            self.ResourceId = self.viewModel.ResourceId;
            
            //console.log(self.viewModel);
            return self.viewModel;
        });
}
}
// Activates knockout.js
ko.applyBindings(new AppViewModel());
