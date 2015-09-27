/**
 * Created by kadyan on 15-08-31.
 */
//ajax call that gets the data and then on the success i have a document load
    //$.get("/serverdata", function (data) {
    //    sucess:var gridster;
$.get("/resource", function (data) {
        sucess:var gridster;
        var test;
        $(document).ready(function() {
            var cpu_utilization = 45 / 100;
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = 82.5;
            var startAngle = 0.8 * Math.PI;
            var endAngle = 2.2 * Math.PI;
            var counterClockwise = false;
            context.beginPath();
            context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
            context.lineWidth = 35;
            // line color
            context.strokeStyle = 'grey';
            context.stroke();
            //method displaying the value of the cpu_utilization
            var can = document.getElementById('myCanvas');
            var ctx = can.getContext('2d');
            var x1 = canvas.width / 2;
            var y1 = canvas.height / 2;
            var rad = 82.5;
            var startA = 0.8 * Math.PI;
            var endA = 0.8 * Math.PI + [2.2 * Math.PI - 0.8 * Math.PI] * cpu_utilization;
            var counterClockwise = false;
            ctx.beginPath();
            ctx.arc(x1, y1, rad, startA, endA, counterClockwise);
            ctx.lineWidth = 35;
            // line color
            ctx.strokeStyle = 'white';
            ctx.stroke();

            //Model for binding data with the html page
            var data =
            {
                "cpuData": "1.17e+14ns",
                "cpu_Util": "45%",
                "diskephemeralSize": "262.0B",
                "diskreadBytes": "232.0mb",
                "diskrootSize": "40.0GB",
                "diskwriteBytes": "828.0B",
                "diskwriteRequests": "126.0",
                "instance": "1.0",
                "Memory": "25",
                "vcpus": "2.0",
                "networkincomingBytes": "",
                "networkoutgoingBytes": ""
            }

            function ResourceData(data) {
                var self = this;
                //var viewModel = data.mapping.fromJS();
                //self.resourceid = data.ResourceId[0];
                //var test = ko.mapping.toJS(viewModel);
                self.cpu = data.cpuData
                self.cpu_util = data.cpu_Util;
                self.diskephemeralsize = data.diskephemeralSize;
                self.diskreadbyte = data.diskreadBytes;
                self.diskrootsize = data.diskrootSize;
                self.diskwritebytes = data.diskwriteBytes;
                self.diskwriterequests = data.diskwriteRequests;
                self.instance = data.instance;
                self.memory = data.Memory;
                self.vcpus = data.vcpus;
                self.networkincomingbytes = data.networkincomingBytes;
                self.networkoutgoingbytes = data.networkoutgoingBytes;
                self.min = 0;
                self.max = 100;
            }

            ko.applyBindings(new ResourceData(data));
            $(function () {
                gridster = $(".gridster > ul").gridster({
                            widget_margins: [5, 5],
                            widget_base_dimensions: [300, 360],
                            numColumns: 4
                })
            });
        });
});





