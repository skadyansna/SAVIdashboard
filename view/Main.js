/**
 * Created by kadyan on 15-08-31.
 */

//get()

//ajax call that gets the data and then on the success i have a document load


    //$.get("/serverdata", function (data) {
    //    sucess:var gridster;
var resourceListOptions, resourceName;
//var shouter = new ko.subscribable();

    $.get("/resource", function (resourceList) {
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

            ko.applyBindings(new masterViewModel(data));

            $(function () {
                gridster = $(".gridster > ul").gridster({
                            widget_margins: [5, 5],
                            widget_base_dimensions: [300, 360],
                            numColumns: 4
                })
            });
    /*!
     * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
     * Copyright (c) 2015, Curtis Bratton
     * All rights reserved.
     *
     * Liquid Fill Gauge v1.1
     */
            function liquidFillGaugeDefaultSettings() {
                return {
                    minValue: 0, // The gauge minimum value.
                    maxValue: 100, // The gauge maximum value.
                    circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
                    circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
                    circleColor: "#FFFFFF", // The color of the outer circle.
                    waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
                    waveCount: 1, // The number of full waves per width of the wave circle.
                    waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
                    waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
                    waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
                    waveHeightScaling: true, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
                    waveAnimate: true, // Controls if the wave scrolls or is static.
                    waveColor: "#FFFFFF", // The color of the fill wave.
                    waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
                    textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
                    textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
                    valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
                    displayPercent: true, // If true, a % symbol is displayed after the value.
                    textColor: "#000000", // The color of the value text when the wave does not overlap it.
                    waveTextColor: "#000000" // The color of the value text when the wave overlaps it.
                };
            }

            ///calling the function and passing the value when mapping data have to find a better way to do this
            //var gauge1 = loadLiquidFillGauge("fillgauge1",data.Memory);
            //var config1 = liquidFillGaugeDefaultSettings();
            //config1.circleColor = "#FFFFFF";
            //config1.textColor = "#FFFFFF";
            //config1.waveTextColor = "#000000";
            //config1.waveColor = "#FFFFFF";
            //config1.circleThickness = 0.2;
            //config1.textVertPosition = 0.2;
            //config1.waveAnimateTime = 1000;
            //var gauge1 = loadLiquidFillGauge("fillgauge1",data.Memory);
            var config1 = liquidFillGaugeDefaultSettings();
            config1.circleColor = "#FFFFFF";
            config1.textColor = "#FF4444";
            config1.waveTextColor = "#FFAAAA";
            config1.waveColor = "#FFDDDD";
            config1.circleThickness = 0.2;
            config1.textVertPosition = 0.2;
            config1.waveAnimateTime = 1000;
            var gauge2 = loadLiquidFillGauge("fillgauge2", 28, config1);
            var config2 = liquidFillGaugeDefaultSettings();
            config2.circleColor = "#D4AB6A";
            config2.textColor = "#553300";
            config2.waveTextColor = "#805615";
            config2.waveColor = "#AA7D39";
            config2.circleThickness = 0.1;
            config2.circleFillGap = 0.2;
            config2.textVertPosition = 0.8;
            config2.waveAnimateTime = 2000;
            config2.waveHeight = 0.3;
            config2.waveCount = 1;

            function loadLiquidFillGauge(elementId, value, config) {
        if (config == null) config = liquidFillGaugeDefaultSettings();

        var gauge = d3.select("#" + elementId);
        var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height"))) / 2;
        var locationX = parseInt(gauge.style("width")) / 2 - radius;
        var locationY = parseInt(gauge.style("height")) / 2 - radius;
        var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;

        var waveHeightScale;
        if (config.waveHeightScaling) {
            waveHeightScale = d3.scale.linear()
                .range([0, config.waveHeight, 0])
                .domain([0, 50, 100]);
        } else {
            waveHeightScale = d3.scale.linear()
                .range([config.waveHeight, config.waveHeight])
                .domain([0, 100]);
        }

        var textPixels = (config.textSize * radius / 2);
        var textFinalValue = parseFloat(value).toFixed(2);
        var textStartValue = config.valueCountUp ? config.minValue : textFinalValue;
        var percentText = config.displayPercent ? "%" : "";
        var circleThickness = config.circleThickness * radius;
        var circleFillGap = config.circleFillGap * radius;
        var fillCircleMargin = circleThickness + circleFillGap;
        var fillCircleRadius = radius - fillCircleMargin;
        var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);

        var waveLength = fillCircleRadius * 2 / config.waveCount;
        var waveClipCount = 1 + config.waveCount;
        var waveClipWidth = waveLength * waveClipCount;

        // Rounding functions so that the correct number of decimal places is always displayed as the value counts up.
        var textRounder = function (value) {
            return Math.round(value);
        };
        if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
            textRounder = function (value) {
                return parseFloat(value).toFixed(1);
            };
        }
        if (parseFloat(textFinalValue) != parseFloat(textRounder(textFinalValue))) {
            textRounder = function (value) {
                return parseFloat(value).toFixed(2);
            };
        }

        // Data for building the clip wave area.
        var data = [];
        for (var i = 0; i <= 40 * waveClipCount; i++) {
            data.push({x: i / (40 * waveClipCount), y: (i / (40))});
        }

        // Scales for drawing the outer circle.
        var gaugeCircleX = d3.scale.linear().range([0, 2 * Math.PI]).domain([0, 1]);
        var gaugeCircleY = d3.scale.linear().range([0, radius]).domain([0, radius]);

        // Scales for controlling the size of the clipping path.
        var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
        var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);

        // Scales for controlling the position of the clipping path.
        var waveRiseScale = d3.scale.linear()
            // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
            // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
            // circle at 100%.
            .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
            .domain([0, 1]);
        var waveAnimateScale = d3.scale.linear()
            .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
            .domain([0, 1]);

        // Scale for controlling the position of the text within the gauge.
        var textRiseScaleY = d3.scale.linear()
            .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
            .domain([0, 1]);

        // Center the gauge within the parent SVG.
        var gaugeGroup = gauge.append("g")
            .attr('transform', 'translate(' + locationX + ',' + locationY + ')');


        // Draw the outer circle.
        var gaugeCircleArc = d3.svg.arc()
            .startAngle(gaugeCircleX(0))
            .endAngle(gaugeCircleX(1))
            .outerRadius(gaugeCircleY(radius))
            .innerRadius(gaugeCircleY(radius - circleThickness));
        gaugeGroup.append("path")
            .attr("d", gaugeCircleArc)
            .style("fill", config.circleColor)
            .attr('transform', 'translate(' + radius + ',' + radius + ')');

        // Text where the wave does not overlap.
        var text1 = gaugeGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", config.textColor)
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

        // The clipping wave area.
        var clipArea = d3.svg.area()
            .x(function (d) {
                return waveScaleX(d.x);
            })
            .y0(function (d) {
                return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
            })
            .y1(function (d) {
                return (fillCircleRadius * 2 + waveHeight);
            });
        var waveGroup = gaugeGroup.append("defs")
            .append("clipPath")
            .attr("id", "clipWave" + elementId);
        var wave = waveGroup.append("path")
            .datum(data)
            .attr("d", clipArea)
            .attr("T", 0);

        // The inner circle with the clipping wave attached.
        var fillCircleGroup = gaugeGroup.append("g")
            .attr("clip-path", "url(#clipWave" + elementId + ")");
        fillCircleGroup.append("circle")
            .attr("cx", radius)
            .attr("cy", radius)
            .attr("r", fillCircleRadius)
            .style("fill", config.waveColor);

        // Text where the wave does overlap.
        var text2 = fillCircleGroup.append("text")
            .text(textRounder(textStartValue) + percentText)
            .attr("class", "liquidFillGaugeText")
            .attr("text-anchor", "middle")
            .attr("font-size", textPixels + "px")
            .style("fill", config.waveTextColor)
            .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(config.textVertPosition) + ')');

        // Make the value count up.
        if (config.valueCountUp) {
            var textTween = function () {
                var i = d3.interpolate(this.textContent, textFinalValue);
                return function (t) {
                    this.textContent = textRounder(i(t)) + percentText;
                }
            };
            text1.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
            text2.transition()
                .duration(config.waveRiseTime)
                .tween("text", textTween);
        }

        // Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
        var waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth;
        if (config.waveRise) {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(0) + ')')
                .transition()
                .duration(config.waveRiseTime)
                .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')
                .each("start", function () {
                    wave.attr('transform', 'translate(1,0)');
                }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
        } else {
            waveGroup.attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')');
        }

        if (config.waveAnimate) animateWave();

        function animateWave() {
            wave.attr('transform', 'translate(' + waveAnimateScale(wave.attr('T')) + ',0)');
            wave.transition()
                .duration(config.waveAnimateTime * (1 - wave.attr('T')))
                .ease('linear')
                .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
                .attr('T', 1)
                .each('end', function () {
                    wave.attr('T', 0);
                    animateWave(config.waveAnimateTime);
                });
        }

        function GaugeUpdater() {
            this.update = function (value) {
                var newFinalValue = parseFloat(value).toFixed(2);
                var textRounderUpdater = function (value) {
                    return Math.round(value);
                };
                if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
                    textRounderUpdater = function (value) {
                        return parseFloat(value).toFixed(1);
                    };
                }
                if (parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))) {
                    textRounderUpdater = function (value) {
                        return parseFloat(value).toFixed(2);
                    };
                }

                var textTween = function () {
                    var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
                    return function (t) {
                        this.textContent = textRounderUpdater(i(t)) + percentText;
                    }
                };

                text1.transition()
                    .duration(config.waveRiseTime)
                    .tween("text", textTween);
                text2.transition()
                    .duration(config.waveRiseTime)
                    .tween("text", textTween);

                var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value)) / config.maxValue;
                var waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100);
                var waveRiseScale = d3.scale.linear()
                    // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                    // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                    // circle at 100%.
                    .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
                    .domain([0, 1]);
                var newHeight = waveRiseScale(fillPercent);
                var waveScaleX = d3.scale.linear().range([0, waveClipWidth]).domain([0, 1]);
                var waveScaleY = d3.scale.linear().range([0, waveHeight]).domain([0, 1]);
                var newClipArea;
                if (config.waveHeightScaling) {
                    newClipArea = d3.svg.area()
                        .x(function (d) {
                            return waveScaleX(d.x);
                        })
                        .y0(function (d) {
                            return waveScaleY(Math.sin(Math.PI * 2 * config.waveOffset * -1 + Math.PI * 2 * (1 - config.waveCount) + d.y * 2 * Math.PI));
                        })
                        .y1(function (d) {
                            return (fillCircleRadius * 2 + waveHeight);
                        });
                } else {
                    newClipArea = clipArea;
                }

                var newWavePosition = config.waveAnimate ? waveAnimateScale(1) : 0;
                wave.transition()
                    .duration(0)
                    .transition()
                    .duration(config.waveAnimate ? (config.waveAnimateTime * (1 - wave.attr('T'))) : (config.waveRiseTime))
                    .ease('linear')
                    .attr('d', newClipArea)
                    .attr('transform', 'translate(' + newWavePosition + ',0)')
                    .attr('T', '1')
                    .each("end", function () {
                        if (config.waveAnimate) {
                            wave.attr('transform', 'translate(' + waveAnimateScale(0) + ',0)');
                            animateWave(config.waveAnimateTime);
                        }
                    });
                waveGroup.transition()
                    .duration(config.waveRiseTime)
                    .attr('transform', 'translate(' + waveGroupXPosition + ',' + newHeight + ')')
            }
        }

        return new GaugeUpdater();
    }

            });
//});
});

var mainDataModel = function (data) {
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

var resourceListModel = function(resourceList) {
    resourceListOptions = ko.observableArray();
    var resourceListArray = Object.keys(resourceList).map(function (key) {return resourceList[key]});
    for(var resourceIndex in resourceListArray) {
        resourceListOptions.push(resourceListArray[resourceIndex]);
    }
    resourceName = ko.observable();
};

var masterViewModel = function(data, resourceList) {
    mainDataModel = new mainDataModel(data);
};

//});




