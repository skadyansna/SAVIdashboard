var bardata = [20,30,20,15,40,200,20,30,20,15,40,200,20,30,20,15,40,200]

var height=400,
    width=600,
    barwidth=50,
    baroffset=5;


var  color=d3.scale.linear()
    .domain([0,bardata.length])
    .range(["#FFB832","#C61C6F"])

var yScale=d3.scale.linear()
    .domain([0,d3.max(bardata)])
    .range([0,height]);

var xScale=d3.scale.ordinal()
    .domain(d3.range(0,bardata.length))
    .rangeBands([0,width])

d3.select("#chart")
    .append("svg")
    .attr("height",height)
    .attr("width",width)
    .style("background",'#C9D7D6')
    .selectAll("rect")
    .data(bardata)
    .enter().append("rect")
    .style("fill",function(d,i){
        return color(i)
    })
    .attr("height",function(d){
        return yScale(d)
    })
    .attr("width",xScale.rangeBand())
    .attr("x",function(d,i){
        return xScale(i);
    })
    .attr("y",function(d){
        return height - yScale(d);
    })

