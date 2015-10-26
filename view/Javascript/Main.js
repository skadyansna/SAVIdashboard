/**
 * Created by kadyan on 15-08-31.
 */
//ajax call that gets the data and then on the success i have a document load
    //$.get("/serverdata", function (data) {
    //    sucess:var gridster;
$(document).ready(function() {
    $(function () {
        gridster = $(".gridster > ul").gridster({
            widget_margins: [5, 5],
            widget_base_dimensions: [300, 360],
            numColumns: 5
        })
    });
});






