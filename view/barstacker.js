var stacker4;

function barstacker(data) {
    var settings4 = barStackerDefaultSettings();
    settings4.barThickness = 1;
    settings4.barBoxPadding = 12;
    settings4.barPadding = 1;
    settings4.textPx = 30;
    settings4.maxValue = 110;
    settings4.color = "#0066FF";
    settings4.cornerRoundingX = 5;
    settings4.cornerRoundingY = 5;
    var cpu_value = Math.round(data.Instance);
    if(!stacker4) {
        stacker4 = loadBarStacker("stacker4", "Instances", cpu_value, settings4);
    } else {
        stacker4.update(cpu_value);
    }
    //var settings5 = barStackerDefaultSettings();
    //settings5.vertical = false;
    //settings5.valuePrefix = "";
    //settings5.maxValue = "1000"
    //settings5.valuePostfix = "mb"
    //settings5.color = "#FFFFFF";
    //var memory_value = Math.round(data.Memory);
    //var stacker5 = loadBarStacker("stacker5", "CPU_Time", memory_value, settings5);
}

    function barStackerDefaultSettings() {
        return {
            minValue: 0, // The gauge minimum value.
            maxValue: 100, // The gauge maximum value.
            cornerRoundingX: 20,
            cornerRoundingY: 20,
            barBoxPadding: 6,
            barPadding: 6,
            color: "#222222", // The color of the outer circle.
            vertical: true,
            textLeftTop: true,
            textPx: 20,
            barThickness: 3,
            valuePrefix: "",
            valuePostfix: "",
            valueAnimateTime: 1000
        };
    }
    function loadBarStacker(elementId, label, value, config) {
        if (config == null) config = barStackerDefaultSettings();

        //check if the value is greater than inital value if yes set the value to max configuration value
        if (value > config.maxValue)
            value = config.maxValue;
        //check if the value is less than initial value if yes set the value to max configuration value
        if (value < config.minValue)
            value = config.minValue;

        //selects the element and gets the height and width of element selected.
        var stacker = d3.select("#" + elementId);
        var stackerWidth = parseInt(stacker.style("width"));
        var stackerHeight = parseInt(stacker.style("height"));


        //calculating the height of the bar box
        var barBoxX = config.vertical ? (config.textLeftTop ? config.barBoxPadding + config.textPx : config.barBoxPadding) : config.barBoxPadding;
        var barBoxY = config.vertical ? config.barBoxPadding : (config.textLeftTop ? config.barBoxPadding + config.textPx : config.barBoxPadding);
        var barBoxHeight = config.vertical ? (stackerHeight - config.barBoxPadding * 2) : (stackerHeight - config.textPx - config.barBoxPadding * 2);
        var barBoxWidth = config.vertical ? (stackerWidth - config.textPx - config.barBoxPadding * 2) : (stackerWidth - config.barBoxPadding * 2);

        //calculating the X,Y, height and width to draw a rectangle of the clip box that is inside the main box
        var barClipPathBoxX = barBoxX + config.barPadding;
        var barClipPathBoxY = barBoxY + config.barPadding;
        var barClipPathBoxHeight = barBoxHeight - config.barPadding * 2;
        var barClipPathBoxWidth = barBoxWidth - config.barPadding * 2;

        //calculates the X and Y coordinates for marking the starting and ending of the text and also the text rotation position is done from here
        var textRightBottomPaddingMultiplier = 0.25;
        var textRotation = config.vertical ? -90 : 0;
        var labelTextX = config.vertical ? (config.textLeftTop ? config.textPx : stackerWidth - (config.textPx * textRightBottomPaddingMultiplier)) : config.cornerRoundingX;
        var labelTextY = config.vertical ? stackerHeight - config.cornerRoundingY : (config.textLeftTop ? config.textPx : stackerHeight - (config.textPx * textRightBottomPaddingMultiplier));
        var valueTextX = config.vertical ? (config.textLeftTop ? config.textPx : stackerWidth - (config.textPx * textRightBottomPaddingMultiplier)) : stackerWidth - config.cornerRoundingX;
        var valueTextY = config.vertical ? config.cornerRoundingY : (config.textLeftTop ? config.textPx : stackerHeight - (config.textPx * textRightBottomPaddingMultiplier));


        //now create a defs that holds the clipath and the marsk that holds the rectangle with the text
        var defs = stacker.append("defs");

        var mask = defs.append("mask")
            .attr("id", "barboxMask_" + elementId);

        mask.append("rect")
            .attr("height", stackerHeight)
            .attr("width", stackerWidth)
            .attr("rx", config.cornerRoundingX)
            .attr("ry", config.cornerRoundingY)
            .style("fill", "white");
        mask.append("rect")
            .attr("x", barBoxX)
            .attr("y", barBoxY)
            .attr("rx", config.cornerRoundingX)
            .attr("ry", config.cornerRoundingY)
            .attr("height", barBoxHeight)
            .attr("width", barBoxWidth)
            .style("fill", "black");
        //inserting the text that is to be printed on the meter the spot by appending it to the mask
        mask.append("text")
            .text(label)
            .attr("text-anchor", "start")
            .attr("font-size", config.textPx + "px")
            .attr("x", labelTextX)
            .attr("y", labelTextY)
            .style("fill", "black")
            .attr("transform", "rotate(" + textRotation + " " + labelTextX + " " + labelTextY + ")");
        //inserting  the value to be inserted  in the rectangle.The transformation to adjust the text.
        var valueText = mask.append("text")
            .text(config.valuePrefix + 0 + config.valuePostfix)
            .attr("V", 0)
            .attr("text-anchor", "end")
            .attr("font-size", config.textPx + "px")
            .attr("x", valueTextX)
            .attr("y", valueTextY)
            .style("fill", "black")
            .attr("transform", "rotate(" + textRotation + " " + valueTextX + " " + valueTextY + ")");
        //adding a clip path to the svg element
        defs.append("clipPath")
            .attr("id", "barClipPath_" + elementId)
            .append("rect")
            .attr("x", barClipPathBoxX)
            .attr("y", barClipPathBoxY)
            .attr("rx", config.cornerRoundingX)
            .attr("ry", config.cornerRoundingY)
            .attr("height", barClipPathBoxHeight)
            .attr("width", barClipPathBoxWidth);

        //this the main rectangle which is outside of the defs and the clippaths
        stacker.append("rect")
            .attr("height", stackerHeight)
            .attr("width", stackerWidth)
            .attr("rx", config.cornerRoundingX)
            .attr("ry", config.cornerRoundingY)
            .style("fill", config.color)
            .attr("mask", "url(#barboxMask_" + elementId + ")");

        //append a group  element to the svg and get the bard count to draw rectangles inside
        var barGroup = stacker.append("g")
            .attr("clip-path", "url(#barClipPath_" + elementId + ")")
            .attr("T", 0);
        var barCount = config.vertical ? barClipPathBoxHeight / (config.barThickness * 2) : barClipPathBoxWidth /
        (config.barThickness * 2);
        var bars = [];
        //Draw all the bars and add them to bars arrary
        for (var i = 0; i < barCount; i++) {
            if (config.vertical) {
                bars[i] = barGroup.append("rect")
                    .attr("x", barClipPathBoxX)
                    .attr("y", (barClipPathBoxY + barClipPathBoxHeight - config.barThickness) - (i * config.barThickness * 2))
                    .attr("height", config.barThickness)
                    .attr("width", barClipPathBoxWidth)
                    .style("fill", config.color)
                    .style("visibility", "hidden");
            } else {
                bars[i] = barGroup.append("rect")
                    .attr("x", barClipPathBoxX + i * config.barThickness * 2)
                    .attr("y", barClipPathBoxY)
                    .attr("height", barClipPathBoxHeight)
                    .attr("width", config.barThickness)
                    .style("fill", config.color)
                    .style("visibility", "hidden");
            }
        }
        valueText.transition()
            .duration(config.valueAnimateTime)
            .tween("text", valueTextAnimator(value));

        barGroup.transition()
            .duration(config.valueAnimateTime)
            .attrTween("T", new BarTweener(value, bars).tween);


        //hiding and showing of the black bars inside the rectangle
        //it finds the lowest or the highest bar and proceeds from there on


        function BarTweener(value, bars) {
            var _bars = bars;
            //The new maximum bar to display
            var endBar = calcBarValue(value) - 1;
            var newMaxBar;
            this.tween = function (d, i, a) {
                var startBar = parseInt(a);
                var ascend = endBar > startBar; //Are we animating up or down...
                var barId = d3.interpolateRound(startBar, endBar);
                return function (t) {
                    newMaxBar = barId(t); //The maximum bar to display at this point in the tween.
                    barGroup.attr("T", newMaxBar); //Keep track of the new max bar incase the animation gets interrupted.
                    if (ascend) {
                        //If we're going up, find the highest bar below newMaxBar that's currently visible...
                        while (newMaxBar > 0 && _bars[newMaxBar].style("visibility") == "hidden")
                            newMaxBar--;
                        //From there going up, make all bars visible until newMaxBar.
                        for (var i = newMaxBar; i <= barId(t); i++) {
                            _bars[i].style("visibility", "visible");
                        }
                    } else {
                        //If we're going down, find highest bar above newMaxBar that's currently visible...
                        while (newMaxBar < startBar && (newMaxBar < 0 || _bars[newMaxBar].style("visibility") == "visible"))
                            newMaxBar++;
                        //From there going down, make all bars hidden until newMaxBar.
                        for (var i = newMaxBar; i > barId(t) && i >= 0; i--) {
                            _bars[i].style("visibility", "hidden");
                        }
                    }

                    return endBar;
                };
            }

            this.interrupt = function () {
                //And our animation was going so well...
                barGroup.attr("T", newMaxBar);
                for (var i = newMaxBar; i < barCount; i++) {
                    _bars[i].style("visibility", "hidden");
                }
            }
        }

        function calcBarValue(value) {
            return Math.ceil(barCount * ((value - config.minValue) / (config.maxValue - config.minValue)));
        }

        function valueTextAnimator(value) {
            return function () {
                var i = d3.interpolate(d3.select(this).attr("V"), value);
                return function (t) {
                    var newValue = Math.round(i(t));
                    this.textContent = config.valuePrefix + newValue + config.valuePostfix;
                    //Store the current value in V as this is easier than parsing the current value of textContent which
                    //may contain a prefix or postfix. This is needed so that, if the text tween gets interrupted, the
                    //next animation will start from whatever the current text value is.
                    d3.select(this).attr("V", newValue);
                }
            }
        }

        function BarStackerUpdater(bars) {
            var _bars = bars;
            this.update = function (value) {
                if (value > config.maxValue)
                    value = config.maxValue;
                if (value < config.minValue)
                    value = config.minValue;

                var barTweener = new BarTweener(value, _bars);
                barGroup.transition()
                    .duration(config.valueAnimateTime)
                    .attrTween("T", barTweener.tween)
                    .each("interrupt", barTweener.interrupt);
                valueText.transition()
                    .duration(config.valueAnimateTime)
                    .tween("text", valueTextAnimator(value));
            }
        }

        return new BarStackerUpdater(bars);

    }



